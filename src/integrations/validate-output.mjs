import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

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

/** Resolve a site-absolute URL against the output directory. */
function resolves(outDir, url) {
  const clean = decodeURI(url.split('#')[0].split('?')[0]);
  if (clean === '' || clean === '/') return existsSync(path.join(outDir, 'index.html'));
  const base = path.join(outDir, clean);
  return (
    existsSync(base) || existsSync(path.join(base, 'index.html')) || existsSync(`${base}.html`)
  );
}

function checkPage(outDir, html, rel, problems) {
  const add = (msg) => problems.push(`${rel}: ${msg}`);

  // Zero-JavaScript is a load-bearing property here, not an aesthetic one: the
  // CSP declares `script-src 'none'`, so anything that slipped in would be
  // blocked at runtime and the page would break rather than degrade.
  if (/<script[\s>]/i.test(html)) add('contains a <script> tag, but the CSP forbids script');

  // Inline styles would require `style-src 'unsafe-inline'`, which the CSP
  // does not grant. `build.inlineStylesheets: 'never'` should prevent these.
  if (/<style[\s>]/i.test(html)) add('contains an inline <style>, which the CSP forbids');

  if (!/<meta http-equiv="Content-Security-Policy"/i.test(html)) add('missing the CSP meta tag');
  if (!/<title>[^<]+<\/title>/i.test(html)) add('missing a non-empty <title>');
  if (!/<meta name="description" content="[^"]+"/i.test(html)) add('missing a description');
  if (!/<link rel="canonical"/i.test(html)) add('missing a canonical link');
  if (!/<html lang="/i.test(html)) add('missing a lang attribute');

  const h1s = html.match(/<h1[\s>]/gi) ?? [];
  if (h1s.length !== 1) add(`has ${h1s.length} <h1> elements, expected exactly 1`);

  // Images need dimensions to avoid layout shift, and real alt text.
  for (const tag of html.matchAll(/<img\b[^>]*>/gi)) {
    const t = tag[0];
    if (!/\balt="[^"]+"/i.test(t)) add('has an <img> with missing or empty alt text');
    if (!/\bwidth="/i.test(t) || !/\bheight="/i.test(t)) {
      add('has an <img> without explicit width and height');
    }
  }

  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = m[1];
    if (/^(https?:|mailto:|#|data:)/i.test(url)) continue;
    if (!url.startsWith('/')) {
      add(`uses a relative URL "${url}"; use site-absolute paths`);
      continue;
    }
    if (!resolves(outDir, url)) add(`links to "${url}", which does not exist in the output`);
  }

  // Anything opening a new tab must not hand the opener to the target page.
  for (const tag of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/gi)) {
    if (!/rel="[^"]*noopener/i.test(tag[0])) add('has target="_blank" without rel="noopener"');
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
