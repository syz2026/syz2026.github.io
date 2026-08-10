import { getCollection, type CollectionEntry } from 'astro:content';
import { selectEntries } from './ordering';

/**
 * These collections are intentionally empty until entries are added, but Astro
 * warns "does not exist or is empty. Please check your content config file for
 * errors" on every query, which sends a reader looking for a fault that is not
 * there. Only that exact message is dropped, and only for the duration of the
 * call. Once a collection has entries the warning stops firing on its own.
 */
async function getCollectionQuietly<C extends 'research' | 'music' | 'software'>(name: C) {
  const warn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('does not exist or is empty')) return;
    warn(...args);
  };
  try {
    return await getCollection(name);
  } finally {
    console.warn = warn;
  }
}

/** Drafts stay visible in `npm run dev` and are dropped from production builds. */
const includeDrafts = !import.meta.env.PROD;

export async function getResearch(): Promise<CollectionEntry<'research'>[]> {
  return selectEntries(await getCollectionQuietly('research'), includeDrafts);
}

export async function getMusic(): Promise<CollectionEntry<'music'>[]> {
  return selectEntries(await getCollectionQuietly('music'), includeDrafts);
}

export async function getSoftware(): Promise<CollectionEntry<'software'>[]> {
  return selectEntries(await getCollectionQuietly('software'), includeDrafts);
}

export const RESEARCH_STATUS_LABEL: Record<CollectionEntry<'research'>['data']['status'], string> =
  {
    published: 'Published',
    'complete-unsubmitted': 'Complete, unsubmitted',
    draft: 'Draft',
    'in-progress': 'In progress',
  };
