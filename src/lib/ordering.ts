/**
 * Selection and ordering rules for content entries, kept free of any Astro
 * import so they can be unit tested directly.
 */

export type Sortable = { data: { order?: number; year?: number } };
export type Draftable = { data: { draft: boolean } };

/**
 * Explicit `order` wins and sorts ascending, so `order: 1` pins to the top.
 * Entries without one fall back to most recent year first, and pinned entries
 * always precede unpinned ones.
 */
export function byOrderThenYear<T extends Sortable>(a: T, b: T): number {
  const ao = a.data.order;
  const bo = b.data.order;
  const byYear = (b.data.year ?? 0) - (a.data.year ?? 0);
  // Two entries pinned to the same position fall back to year rather than to
  // whatever order the loader happened to return, which is not stable.
  if (ao !== undefined && bo !== undefined) return ao - bo || byYear;
  if (ao !== undefined) return -1;
  if (bo !== undefined) return 1;
  return byYear;
}

export function isVisible<T extends Draftable>(entry: T, includeDrafts: boolean): boolean {
  return includeDrafts || !entry.data.draft;
}

/** Filter drafts then sort. Does not mutate the input. */
export function selectEntries<T extends Sortable & Draftable>(
  entries: readonly T[],
  includeDrafts: boolean,
): T[] {
  return entries.filter((e) => isVisible(e, includeDrafts)).sort(byOrderThenYear);
}
