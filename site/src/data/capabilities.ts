import type { IconName } from '@/components/ui/Icon';

export type Capability = {
  id: string;
  index: string;
  icon: IconName;
  title: string;
  /** One line. This is all the home page shows. */
  headline: string;
  /** Full detail, shown only on the capabilities page. */
  items: string[];
};

export const capabilities: Capability[] = [
  {
    id: 'systems',
    index: '01',
    icon: 'cpu',
    title: 'Systems',
    headline: 'Rust components written for correctness under load.',
    items: [
      'Rust-based system components',
      'Concurrent and asynchronous software',
      'Protocol and session design',
      'Client and server architecture',
      'Failure recovery and lifecycle control',
      'Performance-oriented implementation',
    ],
  },
  {
    id: 'networks',
    index: '02',
    icon: 'network',
    title: 'Networks',
    headline: 'Transport and infrastructure that survive hostile paths.',
    items: [
      'Secure network architecture',
      'VPN and transport systems',
      'Linux servers and private infrastructure',
      'Routing, DNS, tunnels, proxies and relays',
      'Multi-node deployments',
      'Automation, monitoring and recovery',
    ],
  },
  {
    id: 'security',
    index: '03',
    icon: 'shield',
    title: 'Security',
    headline: 'Boundaries, secrets and attack surface as architecture.',
    items: [
      'Authentication and authorization boundaries',
      'Standards-based cryptographic integration',
      'Device-bound access models',
      'Secret minimization and secure storage',
      'Threat modeling and attack-surface reduction',
      'Security-focused review and hardening',
    ],
  },
  {
    id: 'product',
    index: '04',
    icon: 'package',
    title: 'Product',
    headline: 'Production systems built for a decade of operation.',
    items: [
      'Closed-source production systems',
      'Cross-platform core design',
      'Control-plane and data-plane separation',
      'Versioned APIs and compatibility policies',
      'Signed updates and release gates',
      'Systems built for long-term operation',
    ],
  },
];
