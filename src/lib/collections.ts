import { getCollection, type CollectionEntry } from 'astro:content';

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
const isVisible = (entry: { data: { draft: boolean } }) =>
  import.meta.env.PROD ? !entry.data.draft : true;

/** Explicit `order` wins; entries without one fall back to most recent first. */
function byOrderThenYear<T extends { data: { order?: number; year?: number } }>(a: T, b: T) {
  const ao = a.data.order;
  const bo = b.data.order;
  if (ao !== undefined && bo !== undefined) return ao - bo;
  if (ao !== undefined) return -1;
  if (bo !== undefined) return 1;
  return (b.data.year ?? 0) - (a.data.year ?? 0);
}

export async function getResearch(): Promise<CollectionEntry<'research'>[]> {
  return (await getCollectionQuietly('research')).filter(isVisible).sort(byOrderThenYear);
}

export async function getMusic(): Promise<CollectionEntry<'music'>[]> {
  return (await getCollectionQuietly('music')).filter(isVisible).sort(byOrderThenYear);
}

export async function getSoftware(): Promise<CollectionEntry<'software'>[]> {
  return (await getCollectionQuietly('software')).filter(isVisible).sort(byOrderThenYear);
}

export const RESEARCH_STATUS_LABEL: Record<CollectionEntry<'research'>['data']['status'], string> = {
  published: 'Published',
  'complete-unsubmitted': 'Complete, unsubmitted',
  draft: 'Draft',
  'in-progress': 'In progress',
};
