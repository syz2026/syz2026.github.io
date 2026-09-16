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
      'Stephen Zhang studies mathematics and computer science at Stanford. He models gene-culture coevolution and composes for orchestra.',
    contactHeading: 'Contact and links',
  },
  research: {
    title: 'Research',
    description:
      'Publications by Stephen Zhang: a peer-reviewed paper on gene-culture coevolution, a magazine article on combinatorics, and a paper under review at ICLR 2027.',
    intro: 'Published and submitted work. Each entry names the venue and its review status.',
    publicationsHeading: 'Publications',
    kindLabels: {
      'peer-reviewed': 'Peer reviewed',
      magazine: 'Magazine article',
      'in-submission': 'In submission',
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
      'I compose for orchestra and smaller ensembles, and I play trumpet. Scores and recordings go up here as I finish pieces. Software renders the recordings from the notation. No live performers.',
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
    body: 'Nothing lives at this address. If you followed a link here, the link is out of date.',
    homeLabel: 'Return to the home page',
  },
} as const;
