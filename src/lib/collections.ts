import { getCollection, type CollectionEntry } from 'astro:content';
import { selectEntries } from './ordering';

/**
 * `research` and `software` are empty until entries are added, and Astro warns
 * "does not exist or is empty. Please check your content config file for
 * errors" once per query. The message reads like a misconfiguration and is not
 * one, so it used to be filtered here by wrapping `console.warn`. Astro 7.3
 * routes it through its own logger instead, which that wrapper cannot see, so
 * the filter was removed rather than left in place looking like it still
 * worked. The warnings are expected build noise and stop on their own once a
 * collection has its first entry.
 */

/** Drafts stay visible in `npm run dev` and are dropped from production builds. */
const includeDrafts = !import.meta.env.PROD;

export async function getResearch(): Promise<CollectionEntry<'research'>[]> {
  return selectEntries(await getCollection('research'), includeDrafts);
}

export async function getMusic(): Promise<CollectionEntry<'music'>[]> {
  return selectEntries(await getCollection('music'), includeDrafts);
}

export async function getSoftware(): Promise<CollectionEntry<'software'>[]> {
  return selectEntries(await getCollection('software'), includeDrafts);
}

export const RESEARCH_STATUS_LABEL: Record<CollectionEntry<'research'>['data']['status'], string> =
  {
    published: 'Published',
    'complete-unsubmitted': 'Complete, unsubmitted',
    draft: 'Draft',
    'in-progress': 'In progress',
  };
