import { getCollection, type CollectionEntry } from 'astro:content';

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
  return (await getCollection('research')).filter(isVisible).sort(byOrderThenYear);
}

export async function getMusic(): Promise<CollectionEntry<'music'>[]> {
  return (await getCollection('music')).filter(isVisible).sort(byOrderThenYear);
}

export async function getSoftware(): Promise<CollectionEntry<'software'>[]> {
  return (await getCollection('software')).filter(isVisible).sort(byOrderThenYear);
}

export const RESEARCH_STATUS_LABEL: Record<CollectionEntry<'research'>['data']['status'], string> = {
  published: 'Published',
  'complete-unsubmitted': 'Complete, unsubmitted',
  draft: 'Draft',
  'in-progress': 'In progress',
};
