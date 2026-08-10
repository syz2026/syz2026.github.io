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
    'I am an undergraduate at Stanford studying mathematics and computer science, with a music minor in trumpet performance.',
    'In the Feldman Lab I build stochastic and agent-based models of gene-culture coevolution, and derive analytical results that get validated against simulation. That work produced a paper in Theoretical Population Biology in 2025 and a second manuscript is under review. Outside the lab I run small preregistered experiments on language models, where the question is usually whether an effect survives the controls that were fixed before the number was known.',
    'I play trumpet and compose for orchestra, and I serve as Financial Officer of Stanford Orchestras with a budget of more than $40,000.',
  ],
} as const;

export const education = {
  school: 'Stanford University',
  location: 'Stanford, CA',
  degree: 'Bachelor of Science in Mathematics and Computer Science',
  graduation: 'June 2029',
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
      'Develop and analyze stochastic, agent-based, and equation-based models of gene-culture coevolution using Python (NumPy, SciPy, Matplotlib)',
      'Derive and validate analytical results against simulations',
      'Published one peer-reviewed paper, with an additional manuscript under review',
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
      'Built full-stack web applications in TypeScript, React, and Firebase, using Firestore, Cloud Functions, object storage, and federated authentication',
      'Modified the Rust scheduling backend of an Anki fork, adding a SvelteKit interface, a self-hosted sync server, and an Android build',
      'Fine-tuned a sub-1B-parameter language model with LoRA, using staged supervised fine-tuning and direct preference optimization, and graded its output by execution rather than by model scoring',
      'Ran transformer pretraining sweeps on a SLURM cluster in PyTorch, covering corpus generation, checkpointing, and evaluation harnesses',
    ],
  },
  {
    organization: 'EquityBound',
    role: 'Intern',
    location: 'Remote',
    start: 'January 2026',
    end: 'Present',
    bullets: [
      'Analyze small and medium enterprise valuations using standard financial methods',
      'Propose and implement service enhancements with the engineering team',
      'Audit the codebase and identify accuracy and performance improvements',
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
      'Oversee orchestra activities as a member of the executive committee with the co-presidents and vice president',
      'Manage a budget of more than $40K, ensuring all events have funding and limiting excess spending',
    ],
  },
];

export const awards = [
  { title: 'Stanford Math Tournament, Distinguished Honorable Mention (Top 10%)', year: '2024' },
  { title: 'USA Physics Olympiad Semifinalist (Top 400 in U.S.)', year: '2022' },
  { title: '5x AIME Qualifier', year: '2020 - 2025' },
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
