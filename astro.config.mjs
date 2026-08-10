// @ts-check
import { defineConfig } from 'astro/config';
import { validateOutput } from './src/integrations/validate-output.mjs';

// syz2026.github.io is a GitHub user page, so the site is served from the
// domain root and needs no `base` path.
export default defineConfig({
  site: 'https://syz2026.github.io',
  trailingSlash: 'ignore',

  build: {
    // Astro inlines small stylesheets into a <style> tag by default, which
    // would force `style-src 'unsafe-inline'` in the Content Security Policy.
    // Emitting every stylesheet as a file buys a strict `style-src 'self'` for
    // the cost of one extra request.
    inlineStylesheets: 'never',
  },

  // Fails the build on a broken internal link, a missing audio or score file,
  // a page missing its metadata, or any script reaching the output.
  integrations: [validateOutput()],
});
