export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Research', href: '/research' },
  { label: 'Music', href: '/music' },
  { label: 'CV', href: '/cv' },
] as const;

export const pages = {
  home: {
    title: 'Stephen Zhang',
    description:
      'Stephen Zhang, undergraduate in mathematics and computer science at Stanford. Research on gene-culture coevolution and language model measurement, and original composition.',
  },
  research: {
    title: 'Research',
    description:
      'Peer-reviewed publications and independent research projects by Stephen Zhang.',
    intro:
      'Peer-reviewed publications come first, and independent projects follow. Every independent entry carries its real status, because most of that work is complete but unsubmitted and listing it beside a journal paper without that label would probably overstate it.',
    publicationsHeading: 'Publications',
    independentHeading: 'Independent projects',
    independentEmpty:
      'No independent projects are listed yet. I am still deciding which of them are ready to show.',
    softwareHeading: 'Software',
    softwareEmpty: 'No software projects are listed yet.',
  },
  music: {
    title: 'Music',
    description:
      'Original compositions by Stephen Zhang, with scores and recordings.',
    intro:
      'I compose for orchestra and for smaller ensembles, and I play trumpet. Scores and recordings go here as pieces are finished, and the recordings are synthesized from the notation rather than performed.',
    empty:
      'No works are listed yet. I am choosing which pieces are ready to publish.',
  },
  cv: {
    title: 'Curriculum Vitae',
    description:
      'Education, experience, publications, awards, and skills for Stephen Zhang.',
  },
} as const;
