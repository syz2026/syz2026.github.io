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
    description: 'Peer-reviewed publications and independent research projects by Stephen Zhang.',
    intro:
      'Peer-reviewed publications come first, and independent projects follow. Every independent entry carries its real status, because most of that work is complete but unsubmitted and listing it beside a journal paper without that label would probably overstate it.',
    publicationsHeading: 'Publications',
    independentHeading: 'Independent projects',
    independentEmpty:
      'No independent projects are listed yet. I am still deciding which of them are ready to show.',
    softwareHeading: 'Software',
    softwareEmpty: 'No software projects are listed yet.',
    linkLabels: {
      paper: 'Paper',
      preprint: 'Preprint',
      code: 'Code',
      slides: 'Slides',
    },
    backLabel: 'All research',
  },
  music: {
    title: 'Music',
    description: 'Original compositions by Stephen Zhang, with scores and recordings.',
    intro:
      'I compose for orchestra and for smaller ensembles, and I play trumpet. Scores and recordings go here as pieces are finished, and the recordings are synthesized from the notation rather than performed.',
    empty: 'No works are listed yet. I am choosing which pieces are ready to publish.',
    worksHeading: 'Works',
    inProgressLabel: 'In progress',
    recordingLabel: 'Recording',
    scoreLabel: 'Score (PDF)',
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
    body: 'There is nothing at this address. If you followed a link to get here, it is probably out of date.',
    homeLabel: 'Return to the home page',
  },
} as const;
