import type { APIRoute } from 'astro';
import { getResearch, getMusic } from '../lib/collections';

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://syz2026.github.io');
  const staticPaths = ['/', '/research', '/music', '/cv'];

  const research = await getResearch();
  const music = await getMusic();
  const paths = [
    ...staticPaths,
    ...research.map((entry) => `/research/${entry.id}/`),
    ...music.map((entry) => `/music/${entry.id}/`),
  ];

  const urls = paths
    .map((path) => `  <url><loc>${new URL(path, base).href}</loc></url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
