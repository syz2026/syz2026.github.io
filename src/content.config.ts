import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * These three collections ship empty. Each entry is one Markdown file whose
 * body carries the prose and whose frontmatter matches the schema below.
 * See CONTENT_GUIDE.md for a worked example of each.
 *
 * `draft: true` hides an entry from production builds but keeps it visible in
 * `npm run dev`, which is how a work in progress can be previewed safely.
 */

const links = z
  .object({
    paper: z.url().optional(),
    preprint: z.url().optional(),
    code: z.url().optional(),
    slides: z.url().optional(),
  })
  .optional();

const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    // Kept deliberately explicit so unsubmitted work is never displayed as
    // though it were peer reviewed.
    status: z.enum(['published', 'complete-unsubmitted', 'draft', 'in-progress']),
    year: z.number().int(),
    question: z.string(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    links,
    order: z.number().optional(),
    draft: z.boolean().default(false),
  }),
});

const music = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/music' }),
  schema: z.object({
    title: z.string(),
    year: z.number().int(),
    instrumentation: z.string(),
    duration: z.string().optional(),
    blurb: z.string(),
    movements: z.array(z.object({ title: z.string(), duration: z.string().optional() })).optional(),
    // Paths relative to `public/`, e.g. '/media/audio/piece.mp3'.
    audio: z.string().optional(),
    score: z.string().optional(),
    status: z.enum(['complete', 'in-progress']).default('complete'),
    order: z.number().optional(),
    draft: z.boolean().default(false),
  }),
});

const software = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/software' }),
  schema: z.object({
    name: z.string(),
    blurb: z.string(),
    stack: z.array(z.string()).default([]),
    repo: z.url().optional(),
    year: z.number().int().optional(),
    order: z.number().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { research, music, software };
