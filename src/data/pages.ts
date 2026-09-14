export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Research', href: '/research' },
  { label: 'Music', href: '/music' },
  { label: 'CV', href: '/cv' },
] as const;

/** Strings the interface needs that belong to no single page. */
export const ui = {
  skipToContent: 'Skip to main content',
  primaryNavLabel: 'Primary',
  homeLinkLabel: 'Stephen Zhang, home',
  minorLabel: 'Minor',
  headshotAlt:
    'Studio headshot of Stephen Zhang in a dark blazer and white shirt, against a plain grey background',
} as const;

export const pages = {
  home: {
    title: 'Stephen Zhang',
    description:
      'Stephen Zhang, undergraduate in mathematics and computer science at Stanford. Research on gene-culture coevolution and composition for orchestra.',
    contactHeading: 'Contact and links',
  },
  research: {
    title: 'Research',
    description:
      'Published work by Stephen Zhang: a peer-reviewed paper on gene-culture coevolution, and a magazine article on a combinatorics problem.',
    intro: 'Published work, labelled by the kind of venue it appeared in.',
    publicationsHeading: 'Publications',
    kindLabels: {
      'peer-reviewed': 'Peer reviewed',
      magazine: 'Magazine article',
    },
    independentHeading: 'Independent projects',
    softwareHeading: 'Software',
    linkLabels: {
      paper: 'Paper',
      preprint: 'Preprint',
      code: 'Code',
      slides: 'Slides',
    },
    /* Accessible names for the bare link labels, built with the entry title
       so a links list never shows two identical "Paper" items. */
    linkAria: {
      paper: (title: string) => `Paper for “${title}”`,
      preprint: (title: string) => `Preprint of “${title}”`,
      code: (title: string) => `Code for “${title}”`,
      slides: (title: string) => `Slides for “${title}”`,
    },
    backLabel: 'All research',
  },
  music: {
    title: 'Music',
    description: 'Original compositions by Stephen Zhang, with scores and recordings.',
    intro:
      'I compose for orchestra and for smaller ensembles, and I play trumpet. Scores and recordings go up here as pieces are finished. The recordings are synthesized from the notation rather than performed.',
    worksHeading: 'Works',
    inProgressLabel: 'In progress',
    recordingLabel: 'Recording',
    scoreLabel: 'Score (PDF)',
    scoreAria: (title: string) => `Score (PDF) for “${title}”`,
    audioAria: (title: string) => `Recording of “${title}”`,
    downloadAria: (title: string) => `Download the recording of “${title}” (MP3)`,
    downloadLabel: 'Download the recording (MP3)',
    movementsHeading: 'Movements',
    backLabel: 'All works',
  },
  cv: {
    title: 'Curriculum Vitae',
    description: 'Education, experience, publications, awards, and skills for Stephen Zhang.',
    resumeLabel: 'Resume (PDF)',
    courseworkLabel: 'Selected coursework',
    sections: {
      education: 'Education',
      experience: 'Experience',
      research: 'Research',
      publications: 'Publications',
      activities: 'Activities',
      awards: 'Awards',
      skills: 'Skills',
    },
  },
  notFound: {
    title: 'Page not found',
    description: 'The requested page does not exist on this site.',
    body: 'There’s nothing at this address. If you followed a link to get here, it’s probably out of date.',
    homeLabel: 'Return to the home page',
  },
} as const;
