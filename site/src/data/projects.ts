import type { IconName } from '@/components/ui/Icon';

export type ProjectStatus = 'development' | 'reserved' | 'released' | 'archived';

export type Project = {
  id: string;
  name: string;
  /** Repository slug under github.com/cerbenum, when a public repo exists. */
  repo?: string;
  ecosystem: string;
  /** Role of this component inside its ecosystem. */
  role: string;
  icon: IconName;
  /** One short paragraph. Nothing longer belongs in the registry. */
  summary: string;
  status: ProjectStatus;
  source: 'closed' | 'open';
  stack: string[];
  featured?: boolean;
};

export const statusLabel: Record<ProjectStatus, string> = {
  development: 'In development',
  reserved: 'Reserved',
  released: 'Released',
  archived: 'Archived',
};

/**
 * Public project registry.
 *
 * One entry here feeds the registry page, the home strip and the structured
 * data. Adding a future project needs no other change.
 */
export const projects: Project[] = [
  {
    id: 'veyna-app',
    name: 'Veyna.App',
    repo: 'Veyna.App',
    ecosystem: 'VEYNA',
    role: 'Clients & releases',
    icon: 'package',
    summary:
      'Cross-platform client — Flutter interface over a Go system service over a Rust protocol core. Carries the official installers and checksums.',
    status: 'development',
    source: 'closed',
    stack: ['Rust', 'Go', 'Flutter'],
    featured: true,
  },
  {
    id: 'veyna-core',
    name: 'Veyna.Core',
    repo: 'Veyna.Core',
    ecosystem: 'VEYNA',
    role: 'Protocol engine',
    icon: 'cpu',
    summary:
      'Authentication, multiplexing, transport and cryptographic integration — the data plane every client speaks through.',
    status: 'reserved',
    source: 'closed',
    stack: ['Rust', 'QUIC', 'TLS'],
  },
  {
    id: 'veyna-panel',
    name: 'Veyna.Panel',
    repo: 'Veyna.Panel',
    ecosystem: 'VEYNA',
    role: 'Control plane',
    icon: 'server',
    summary:
      'Enrollment, device-bound access and node orchestration, strictly separated from the data plane.',
    status: 'reserved',
    source: 'closed',
    stack: ['Control plane', 'Orchestration'],
  },
  {
    id: 'veyna-telegrambot',
    name: 'Veyna.TelegramBot',
    repo: 'Veyna.TelegramBot',
    ecosystem: 'VEYNA',
    role: 'Access automation',
    icon: 'telegram',
    summary:
      'Provisioning, profile delivery and operational notifications over a hardened bot boundary.',
    status: 'reserved',
    source: 'closed',
    stack: ['Automation', 'Provisioning'],
  },
];

export const ecosystems = [...new Set(projects.map((project) => project.ecosystem))];

export const repoUrl = (repo: string) => `https://github.com/cerbenum/${repo}`;
