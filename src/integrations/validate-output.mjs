import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import path from 'node:path';

const approved = JSON.parse(
  readFileSync(new URL('../approved-documents.json', import.meta.url), 'utf8'),
);

/**
 * Checks the built site and fails the build on anything that would reach a
 * visitor as a broken page.
 *
 * The one that matters most in daily use is asset resolution. A music entry
 * points at `/media/audio/piece.mp3` as a plain string, so a typo or a file
 * that was never copied in produces a player that 404s silently. Catching that
 * here means a bad path can never ship.
 */

const HTML_ONLY = new Set(['.html']);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const isFile = (p) => existsSync(p) && !statSync(p).isDirectory();

/**
 * Resolve a site-absolute URL against the output directory. A bare directory
 * does not count as resolving, because a static host serves a 404 for it unless
 * it holds an index.html. `dist/media/audio/` is exactly that case.
 */
function resolves(outDir, url) {
  const clean = decodeURI(url.split('#')[0].split('?')[0]);
  if (clean === '' || clean === '/') return isFile(path.join(outDir, 'index.html'));
  const base = path.join(outDir, clean);
  return isFile(base) || isFile(path.join(base, 'index.html')) || isFile(`${base}.html`);
}

function checkPage(outDir, html, rel, problems) {
  const add = (msg) => problems.push(`${rel}: ${msg}`);

  // Zero-JavaScript is a load-bearing property here, not an aesthetic one: the
  // CSP declares `script-src 'none'`, so anything that slipped in would be
  // blocked at runtime and the page would break rather than degrade.
  if (/<script[\s>]/i.test(html)) add('contains a <script> tag, but the CSP forbids script');

  // An inline handler is script too. The CSP would block it at runtime, so this
  // is depth rather than the only defence, but a page whose behaviour depends on
  // a blocked handler is broken rather than merely degraded.
  for (const handler of new Set(html.match(/\bon[a-z]+\s*=\s*["']/gi) ?? [])) {
    add(`has an inline ${handler.replace(/\s*=.*$/, '')} handler, which the CSP forbids`);
  }
  for (const scheme of new Set(
    html.match(/(?:href|src)\s*=\s*["']\s*(?:javascript|vbscript):/gi) ?? [],
  )) {
    add(`has a ${scheme.split(':')[0].replace(/.*["']\s*/, '')}: URL, which is a script channel`);
  }

  // Inline styles would require `style-src 'unsafe-inline'`, which the CSP
  // does not grant. `build.inlineStylesheets: 'never'` should prevent these.
  if (/<style[\s>]/i.test(html)) add('contains an inline <style>, which the CSP forbids');

  if (!/<meta http-equiv="Content-Security-Policy"/i.test(html)) add('missing the CSP meta tag');
  if (!/<title>[^<]+<\/title>/i.test(html)) add('missing a non-empty <title>');
  if (!/<meta name="description" content="[^"]+"/i.test(html)) add('missing a description');
  // A noindex page is reachable at any path, so it has no canonical URL to name.
  const noindex = /<meta name="robots" content="noindex"/i.test(html);
  if (!noindex && !/<link rel="canonical"/i.test(html)) add('missing a canonical link');
  if (noindex && /<link rel="canonical"/i.test(html)) {
    add('is noindex but still declares a canonical URL');
  }
  if (!/<html lang="/i.test(html)) add('missing a lang attribute');

  const h1s = html.match(/<h1[\s>]/gi) ?? [];
  if (h1s.length !== 1) add(`has ${h1s.length} <h1> elements, expected exactly 1`);

  // Attribute matching accepts either quote style throughout, because raw HTML
  // inside a Markdown body may use single quotes even though Astro emits double.
  for (const tag of html.matchAll(/<img\b[^>]*>/gi)) {
    const t = tag[0];
    if (!/\balt=(["'])[^"']+\1/i.test(t)) add('has an <img> with missing or empty alt text');
    if (!/\bwidth=["']/i.test(t) || !/\bheight=["']/i.test(t)) {
      add('has an <img> without explicit width and height');
    }
  }

  // A label and its value rendered with no space between them. The template
  // collapses whitespace across a line break between an element and the
  // expression after it, which has produced this three times now, in the
  // footer colophon and in two places on the CV. Restricting the pattern to
  // lowercase, colon, uppercase keeps clock times, interval ratios, and URLs
  // out of it, and SVG text is dropped first because the harmonic figure is
  // full of legitimate ratios.
  const text = html
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;/gi, ' ');
  for (const glued of new Set(text.match(/[a-z]:[A-Z]/g) ?? [])) {
    add(`renders "${glued}" with no space, so a label has run into its value`);
  }

  for (const m of html.matchAll(/(?:href|src)=(["'])([^"']+)\1/g)) {
    const url = m[2];
    // `data:text/html` is a script channel, so only image data URLs pass.
    if (/^data:/i.test(url)) {
      if (!/^data:image\//i.test(url)) add(`has a non-image data: URL, which can carry markup`);
      continue;
    }
    if (/^(https?:|mailto:|#)/i.test(url)) continue;
    if (!url.startsWith('/')) {
      add(`uses a relative URL "${url}"; use site-absolute paths`);
      continue;
    }
    if (!resolves(outDir, url)) add(`links to "${url}", which does not exist in the output`);
  }

  // Anything opening a new tab must not hand the opener to the target page.
  for (const tag of html.matchAll(/<a\b[^>]*target=["']_blank["'][^>]*>/gi)) {
    if (!/rel=["'][^"']*noopener/i.test(tag[0])) {
      add('has target="_blank" without rel="noopener"');
    }
  }
}

export function validateOutput() {
  return {
    name: 'validate-output',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const outDir = fileURLToPath(dir);
        const files = walk(outDir);
        const pages = files.filter((f) => HTML_ONLY.has(path.extname(f)));
        const problems = [];

        for (const file of pages) {
          const rel = path.relative(outDir, file);
          checkPage(outDir, readFileSync(file, 'utf8'), rel, problems);
        }

        // Media referenced from entry frontmatter reaches the HTML as an <audio
        // src> or a score link, so the link check above already covers it. This
        // reports the count so a silent drop to zero is visible.
        const media = files.filter((f) => /\/media\//.test(f) && !f.endsWith('.gitkeep'));

        // A PDF's text is invisible to every other check here. See
        // src/approved-documents.json for why this exists.
        for (const file of files.filter((f) => f.toLowerCase().endsWith('.pdf'))) {
          const rel = path.relative(outDir, file);
          const record = approved.documents[rel];
          if (!record) {
            problems.push(
              `${rel}: no entry in src/approved-documents.json, so nobody has confirmed what this document contains`,
            );
            continue;
          }
          const actual = createHash('sha256').update(readFileSync(file)).digest('hex');
          if (actual !== record.sha256) {
            problems.push(
              `${rel}: bytes differ from the reviewed version (expected ${record.sha256.slice(0, 12)}, got ${actual.slice(0, 12)}); re-read it and update the hash`,
            );
          }
        }

        if (problems.length > 0) {
          for (const p of problems) logger.error(p);
          throw new Error(
            `Output validation failed with ${problems.length} problem(s) across ${pages.length} page(s).`,
          );
        }

        logger.info(
          `Validated ${pages.length} page(s) and ${media.length} media file(s): links, metadata, images, and CSP all clean.`,
        );
      },
    },
  };
}
