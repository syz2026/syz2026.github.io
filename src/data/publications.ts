export type Publication = {
  authors: string;
  year: number;
  title: string;
  venue: string;
  detail?: string;
  href?: string;
  secondary?: { label: string; href: string };
  /**
   * Only the journal article was peer reviewed. Listing the magazine piece
   * beside it without saying so would let a reader assume both were, which is
   * the same overstatement the research page's own intro warns against.
   */
  kind: 'peer-reviewed' | 'magazine';
  /** Shown when the byline does not make Stephen's part obvious. */
  authorshipNote?: string;
};

export const publications: Publication[] = [
  {
    authors: 'Laurel Fogarty, Stephen Zhang, Marcus W. Feldman',
    year: 2025,
    title: 'Gene-culture association and coevolution',
    venue: 'Theoretical Population Biology',
    detail: 'Volume 165, pages 62-71',
    href: 'https://www.sciencedirect.com/science/article/pii/S0040580925000516',
    secondary: { label: 'PubMed', href: 'https://pubmed.ncbi.nlm.nih.gov/40854330/' },
    kind: 'peer-reviewed',
  },
  {
    authors: 'Smarties Sandwiches',
    year: 2024,
    title: 'Pi in the Sky',
    venue: 'Pacific Institute for the Mathematical Sciences',
    detail: 'Issue 23, pages 24-27',
    href: 'https://pims.math.ca/resources/publications/pi-sky/pi-sky-23',
    kind: 'magazine',
    authorshipNote: 'Published under a team byline',
  },
];
