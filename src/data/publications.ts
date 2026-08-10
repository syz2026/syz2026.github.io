export type Publication = {
  authors: string;
  year: number;
  title: string;
  venue: string;
  detail?: string;
  href?: string;
  secondary?: { label: string; href: string };
};

/** Peer-reviewed and formally published work only. */
export const publications: Publication[] = [
  {
    authors: 'Laurel Fogarty, Stephen Zhang, Marcus W. Feldman',
    year: 2025,
    title: 'Gene-culture association and coevolution',
    venue: 'Theoretical Population Biology',
    detail: 'Volume 165, pages 62-71',
    href: 'https://www.sciencedirect.com/science/article/pii/S0040580925000516',
    secondary: { label: 'PubMed', href: 'https://pubmed.ncbi.nlm.nih.gov/40854330/' },
  },
  {
    authors: 'Smarties Sandwiches',
    year: 2024,
    title: 'Pi in the Sky',
    venue: 'Pacific Institute for the Mathematical Sciences',
    detail: 'Issue 23, pages 24-27',
    href: 'https://pims.math.ca/resources/publications/pi-sky/pi-sky-23',
  },
];
