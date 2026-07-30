const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '/cerbenum';

export const site = {
  name: 'Cerbenum',
  legalName: 'Cerbenum Collective',
  /** Public origin, no trailing slash. */
  url: `https://cerbenum.github.io${basePath}`,
  basePath,
  locale: 'en_US',
  tagline: 'Secure · Connect · Create',
  shortDescription:
    'Secure networks, private infrastructure and protocol-level software.',
  description:
    'Cerbenum Collective builds secure network systems, private infrastructure and protocol-level software — including VEYNA, a cross-platform secure-connectivity ecosystem.',
  keywords: [
    'Cerbenum',
    'Cerbenum Collective',
    'VEYNA',
    'VEYNA VPN',
    'secure connectivity',
    'protocol engineering',
    'network security',
    'private infrastructure',
    'systems engineering',
    'Rust systems',
    'VPN client',
    'zero-knowledge architecture',
    'secure transport',
    'threat modeling',
    'Linux infrastructure',
  ],
  contact: {
    email: 'cerbenum@gmail.com',
    telegram: 'https://t.me/cerbenum',
    telegramHandle: '@cerbenum',
    github: 'https://github.com/cerbenum',
    githubHandle: '@cerbenum',
  },
  /** Absolute URL helper — basePath aware, safe for metadata and JSON-LD. */
  abs: (path: string) => `https://cerbenum.github.io${basePath}${path}`,
} as const;

export const doctrine = [
  {
    icon: 'shield' as const,
    title: 'Security over appearance',
    body: 'A feature that cannot be defended does not ship.',
  },
  {
    icon: 'check' as const,
    title: 'Verification over assumption',
    body: 'Behaviour is proven under test, not inferred from the design.',
  },
  {
    icon: 'lock' as const,
    title: 'Privacy by architecture',
    body: 'The system is built so that trust is never required.',
  },
  {
    icon: 'gauge' as const,
    title: 'Failure is designed for',
    body: 'Ready means failure was expected, tested and contained.',
  },
];

export const principles = [
  ['signal', 'noise'],
  ['verification', 'assumption'],
  ['architecture', 'appearance'],
  ['standards', 'invented cryptography'],
  ['reliability', 'impressive demos'],
] as const;
