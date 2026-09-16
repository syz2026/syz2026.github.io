/**
 * Everything here comes from Stephen's resume. Contact detail is deliberately
 * limited to email and city: no phone number and no street address.
 */

export const profile = {
  name: 'Stephen Zhang',
  tagline: 'Mathematics and computer science at Stanford.',
  email: 'syz@stanford.edu',
  location: 'Palo Alto, California',
  headshot: '/media/stephen-zhang.jpg',
  resume: '/media/stephen-zhang-resume.pdf',
  links: [
    { label: 'Email', href: 'mailto:syz@stanford.edu' },
    { label: 'GitHub', href: 'https://github.com/syz2026' },
    { label: 'Hugging Face', href: 'https://huggingface.co/SYZ-Alpha' },
  ],
  bio: [
    'I study mathematics and computer science at Stanford, with a minor in music (trumpet performance). I graduate in June 2028.',
    'I have worked in the Feldman Lab in Stanford’s biology department since 2023. I build stochastic, agent-based, and equation-based models of gene-culture coevolution in Python. I check the analytical results against simulation. The work produced a paper in Theoretical Population Biology in 2025. A second manuscript is under review.',
    'At Alpha AI Engineering, I fine-tuned a sub-billion-parameter language model with LoRA. I also ran transformer pretraining sweeps on a SLURM cluster.',
    'At EquityBound, I analyzed valuations of small and medium enterprises and audited the codebase behind them.',
    'I play trumpet and compose for orchestra. I am a Fellow of the Royal Schools of Music in trumpet performance. As Financial Officer of Stanford Orchestras, I manage a budget of more than $40,000.',
  ],
} as const;

export const education = {
  school: 'Stanford University',
  location: 'Stanford, CA',
  degree: 'Bachelor of Science in Mathematics and Computer Science',
  graduation: 'June 2028',
  minor: 'Music (Trumpet Performance)',
  coursework: [
    'Partial and Stochastic Differential Equations',
    'Artificial Intelligence',
    'Statistical and Machine Learning',
    'Algorithm Design',
    'Real Analysis',
    'Probability Theory',
    'Discrete Mathematics',
  ],
} as const;

export type Position = {
  organization: string;
  role: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
};

export const research: Position[] = [
  {
    organization: 'Feldman Lab, Department of Biology, Stanford University',
    role: 'Research Intern',
    location: 'Stanford, CA',
    start: 'June 2023',
    end: 'Present',
    bullets: [
      'Build stochastic, agent-based, and equation-based models of gene-culture coevolution in Python (NumPy, SciPy, Matplotlib)',
      'Derive analytical results and validate them against simulation',
      'Published one peer-reviewed paper, with a second manuscript under review',
    ],
  },
];

export const experience: Position[] = [
  {
    organization: 'Alpha AI Engineering',
    role: 'AI Engineering Intern',
    location: 'Austin, TX',
    start: 'June 2026',
    end: 'August 2026',
    bullets: [
      'Fine-tuned a sub-1B-parameter language model with LoRA',
      'Ran transformer pretraining sweeps on a SLURM cluster in PyTorch',
    ],
  },
  {
    organization: 'EquityBound',
    role: 'Intern',
    location: 'Remote',
    start: 'January 2026',
    end: 'June 2026',
    bullets: [
      'Analyzed valuations of small and medium enterprises using standard financial methods',
      'Proposed and implemented service improvements with the engineering team',
      'Audited the codebase and found accuracy and performance gains',
    ],
  },
];

export const activities: Position[] = [
  {
    organization: 'Stanford Orchestras',
    role: 'Financial Officer',
    location: 'Stanford, CA',
    start: 'September 2025',
    end: 'Present',
    bullets: [
      'Serve on the executive committee with the co-presidents and vice president',
      'Manage a budget of more than $40K, funding every event and limiting excess spending',
    ],
  },
];

export const awards = [
  { title: 'Stanford Math Tournament, Distinguished Honorable Mention (Top 10%)', year: '2024' },
  { title: 'USA Physics Olympiad Semifinalist (Top 400 in U.S.)', year: '2022' },
  { title: '5x AIME Qualifier', year: '2020–2025' },
  { title: 'Fellow of the Royal Schools of Music in Trumpet Performance', year: '2025' },
  { title: 'CLASS National Chinese Essay Contest Gold Prize', year: '2023' },
] as const;

export const skills = [
  { group: 'Programming', items: ['Python', 'C++', 'Java', 'TypeScript', 'R', 'SQL', 'LaTeX'] },
  {
    group: 'Frameworks and tools',
    items: ['PyTorch', 'Hugging Face', 'React', 'Firebase', 'AWS', 'SLURM', 'NumPy', 'SciPy'],
  },
  {
    group: 'Languages',
    items: ['English (native)', 'Mandarin Chinese (fluent reading and writing)'],
  },
] as const;
