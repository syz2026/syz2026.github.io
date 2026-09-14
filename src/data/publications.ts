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
    detail: 'Volume 165, pages 62–71',
    // The DOI rather than the publisher's article URL, because a DOI is the
    // identifier the journal guarantees and survives a site reorganisation.
    href: 'https://doi.org/10.1016/j.tpb.2025.08.003',
    secondary: { label: 'PubMed', href: 'https://pubmed.ncbi.nlm.nih.gov/40854330/' },
    kind: 'peer-reviewed',
  },
  {
    authors:
      'Lukas Beyerlein, Dot Crumlish, Rezza Hadian, Albert Lu, Luca Nijim, Maximilian Niebur, Aiden Novick, A. Gwinn Royal, Amanda Serenevy, Samvar Harshil Shah, Shlomo Sloman, Jasmine Zhang, Stephen Zhang',
    year: 2024,
    title: 'Smarties® Sandwiches',
    venue: 'Pi in the Sky',
    detail: 'Pacific Institute for the Mathematical Sciences, issue 23, pages 24–27',
    href: 'https://pims.math.ca/resources/publications/pi-sky/pi-sky-23',
    // The issue landing page does not make the PDF easy to find, so the
    // direct file is worth carrying as well.
    secondary: {
      label: 'PDF',
      href: 'https://pims.math.ca/sites/default/files/assets/publication_issue/file/Pi_in_the_sky2024%20%281%29.pdf',
    },
    kind: 'magazine',
  },
];
