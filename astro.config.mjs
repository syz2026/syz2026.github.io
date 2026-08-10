// @ts-check
import { defineConfig } from 'astro/config';

// syz2026.github.io is a GitHub user page, so the site is served from the
// domain root and needs no `base` path.
export default defineConfig({
  site: 'https://syz2026.github.io',
  trailingSlash: 'ignore',
});
