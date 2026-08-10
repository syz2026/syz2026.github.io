import { describe, expect, it } from 'vitest';
import { byOrderThenYear, isVisible, selectEntries } from './ordering';

type Entry = { id: string; data: { order?: number; year?: number; draft: boolean } };

const entry = (id: string, data: Partial<Entry['data']> = {}): Entry => ({
  id,
  data: { draft: false, ...data },
});

const ids = (entries: Entry[]) => entries.map((e) => e.id);

describe('byOrderThenYear', () => {
  it('puts the most recent year first when nothing is pinned', () => {
    const sorted = [entry('old', { year: 2019 }), entry('new', { year: 2026 })].sort(
      byOrderThenYear,
    );
    expect(ids(sorted)).toEqual(['new', 'old']);
  });

  it('sorts pinned entries ascending, so order 1 comes first', () => {
    const sorted = [entry('third', { order: 3 }), entry('first', { order: 1 })].sort(
      byOrderThenYear,
    );
    expect(ids(sorted)).toEqual(['first', 'third']);
  });

  it('places any pinned entry ahead of unpinned ones, regardless of year', () => {
    const sorted = [
      entry('recent', { year: 2026 }),
      entry('pinned', { order: 9, year: 1999 }),
    ].sort(byOrderThenYear);
    expect(ids(sorted)).toEqual(['pinned', 'recent']);
  });

  it('treats a missing year as oldest rather than throwing', () => {
    const sorted = [entry('undated'), entry('dated', { year: 2020 })].sort(byOrderThenYear);
    expect(ids(sorted)).toEqual(['dated', 'undated']);
  });
});

describe('isVisible', () => {
  it('hides drafts when they are excluded', () => {
    expect(isVisible(entry('d', { draft: true }), false)).toBe(false);
    expect(isVisible(entry('p'), false)).toBe(true);
  });

  it('shows drafts when they are included, as the dev server does', () => {
    expect(isVisible(entry('d', { draft: true }), true)).toBe(true);
  });
});

describe('selectEntries', () => {
  const entries = [
    entry('draft-pinned', { draft: true, order: 1 }),
    entry('published-2020', { year: 2020 }),
    entry('published-2026', { year: 2026 }),
    entry('pinned', { order: 2, year: 2001 }),
  ];

  it('drops drafts and sorts the rest, which is what a production build ships', () => {
    expect(ids(selectEntries(entries, false))).toEqual([
      'pinned',
      'published-2026',
      'published-2020',
    ]);
  });

  it('keeps drafts in their sorted position when they are included', () => {
    expect(ids(selectEntries(entries, true))).toEqual([
      'draft-pinned',
      'pinned',
      'published-2026',
      'published-2020',
    ]);
  });

  it('does not mutate the array it is given', () => {
    const original = ids(entries);
    selectEntries(entries, false);
    expect(ids(entries)).toEqual(original);
  });

  it('returns an empty array for an empty collection, which is the current state', () => {
    expect(selectEntries([], false)).toEqual([]);
  });
});
