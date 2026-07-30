import type { IconName } from '@/components/ui/Icon';
import { repoUrl } from './projects';

export const veyna = {
  name: 'VEYNA',
  lede: 'A private secure-connectivity ecosystem, built from the protocol layer upward.',
  repo: repoUrl('Veyna.App'),
  releases: `${repoUrl('Veyna.App')}/releases`,
  state: [
    ['Development', 'Active'],
    ['Public release', 'Locked'],
    ['Source model', 'Closed'],
    ['Release target', 'Complete v1'],
  ] as const,
};

export const stack: { layer: string; role: string; note: string; link: string | null; icon: IconName }[] = [
  {
    layer: 'Flutter UI',
    role: 'Interface',
    note: 'Unprivileged. Holds no secrets and no protocol logic.',
    link: 'HTTPS · TLS',
    icon: 'layers',
  },
  {
    layer: 'Go service',
    role: 'System',
    note: 'TUN adapter, routes, DNS, system proxy and IPC.',
    link: 'FFI · C ABI',
    icon: 'server',
  },
  {
    layer: 'Rust core',
    role: 'Protocol',
    note: 'Authentication, multiplexing, transport, encryption.',
    link: null,
    icon: 'cpu',
  },
];

export const traits: { title: string; note: string; icon: IconName }[] = [
  {
    title: 'End-to-end encryption',
    note: 'Modern primitives, standards-based integration.',
    icon: 'lock',
  },
  {
    title: 'Multiplexed transport',
    note: 'TCP, TLS, WebSocket and QUIC behind one session layer.',
    icon: 'network',
  },
  { title: 'Smart routing', note: 'Automatic server selection with failover.', icon: 'route' },
  { title: 'Kill switch', note: 'Traffic stops the moment the tunnel drops.', icon: 'bolt' },
  {
    title: 'Zero-knowledge keys',
    note: 'Generated on the device and never sent anywhere.',
    icon: 'key',
  },
  { title: 'Profile links', note: 'Connections provisioned via veyna:// profiles.', icon: 'plug' },
];

export const modes: { name: string; note: string; icon: IconName }[] = [
  { name: 'Smart', note: 'Automatic proxy with LAN bypass.', icon: 'radar' },
  { name: 'System proxy', note: 'Routes through the system proxy configuration.', icon: 'globe' },
  { name: 'TUN', note: 'Full-device tunnel via a virtual adapter.', icon: 'plug' },
];

export const platforms = [
  ['Windows', 'x64', 'Pending v1'],
  ['Android', 'arm64', 'Planned'],
  ['iOS', 'arm64', 'Planned'],
  ['macOS', 'universal', 'Planned'],
  ['Linux', 'x64', 'Planned'],
] as const;
