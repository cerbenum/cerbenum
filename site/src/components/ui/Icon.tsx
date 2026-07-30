import type { SVGProps } from 'react';

/**
 * Hairline icon set drawn on a 24-unit grid at stroke 1.25 so it sits at the
 * same optical weight as the type. Single source, no icon dependency.
 */
const paths = {
  shield: 'M12 3 4.5 6v6c0 4.4 3.1 7.6 7.5 9 4.4-1.4 7.5-4.6 7.5-9V6L12 3Z',
  lock: 'M6.5 10.5h11v9h-11v-9Zm2.25 0V7.75a3.25 3.25 0 0 1 6.5 0v2.75M12 14v2.5',
  key: 'M14.5 9.5a3.5 3.5 0 1 1-3.4-3.5M14.5 9.5 20 4M18 6l1.6 1.6M16.2 7.8l1.6 1.6M10.9 12.9 4 19.8V21h3v-2h2v-2h1.5v-1.6',
  network:
    'M12 4.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM5.5 15.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm13 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM11 8.2 6.6 14m10.8 0L13 8.2m-5.6 9.3h9.2',
  route: 'M6.5 20V9.5a3 3 0 0 1 3-3h5a3 3 0 0 0 3-3M6.5 20a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5Zm11-15.5a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5Z',
  cpu: 'M8 8h8v8H8V8Zm-2.5-2.5h13v13h-13v-13ZM9.5 3v2.5m5-2.5v2.5m-5 13V21m5-2.5V21M3 9.5h2.5m-2.5 5h2.5m13-5H21m-2.5 5H21',
  layers: 'M12 3.5 3.5 8 12 12.5 20.5 8 12 3.5ZM3.5 12 12 16.5 20.5 12M3.5 16 12 20.5 20.5 16',
  cube: 'M12 3 4 7.2v9.6L12 21l8-4.2V7.2L12 3Zm0 0v18m8-13.8L12 12 4 7.2',
  server:
    'M4 5.5h16v5H4v-5Zm0 8h16v5H4v-5ZM7 8h.01M7 16h.01M10.5 8h4m-4 8h4',
  terminal: 'M3.5 5.5h17v13h-17v-13ZM7 10l2.5 2L7 14m5 .5h5',
  globe:
    'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm0 0c-2.4 2-3.6 4.8-3.6 8.5s1.2 6.5 3.6 8.5c2.4-2 3.6-4.8 3.6-8.5S14.4 5.5 12 3.5ZM3.8 9.5h16.4M3.8 14.5h16.4',
  bolt: 'M13.5 3 6 13.5h5L10.5 21 18 10.5h-5L13.5 3Z',
  radar:
    'M12 12 18 6m-6 6a8.5 8.5 0 1 0 0-8.5M12 12a4.5 4.5 0 1 0 4.5-4.5M12 12v8.5',
  fingerprint:
    'M5 11a7 7 0 0 1 13.2-3.2M4.8 15.5c.5-1.2.7-2.6.7-4M8.5 11a3.5 3.5 0 0 1 7 0c0 3-.5 5.6-1.4 7.8M12 11v3c0 2-.3 3.9-.9 5.6M19 11c0 3-.5 5.7-1.4 8',
  gauge: 'M4 17a8 8 0 1 1 16 0M12 17l4-5',
  plug: 'M9 3.5v5m6-5v5M6.5 8.5h11v3a5.5 5.5 0 0 1-11 0v-3ZM12 17v3.5',
  package:
    'M12 3.5 4.5 7.3v9.4L12 20.5l7.5-3.8V7.3L12 3.5Zm0 8.6 7.5-4.8m-7.5 4.8L4.5 7.3m7.5 4.8v8.4M8.2 5.4l7.6 3.9',
  mail: 'M3.5 6.5h17v11h-17v-11Zm0 .8 8.5 6 8.5-6',
  telegram: 'M20.5 4.5 2.8 11.3l4.9 1.7 1.9 5.6 2.7-3.2 4.6 3.4 3.6-14.3ZM7.7 13l10-6.6-7.4 8.2',
  github:
    'M9.2 20.4c-4 1.2-4-2.1-5.6-2.5m11.2 5v-3.3c0-.9.1-1.3-.5-1.8 2.6-.3 5-1.3 5-5.6a4.3 4.3 0 0 0-1.2-3 4 4 0 0 0-.1-3s-1-.3-3.3 1.2a11.3 11.3 0 0 0-6 0C6.4 5.9 5.4 6.2 5.4 6.2a4 4 0 0 0-.1 3 4.3 4.3 0 0 0-1.2 3c0 4.3 2.4 5.3 5 5.6-.6.5-.6 1-.5 1.8v3.3',
  arrow: 'M6 18 18 6M8.5 6H18v9.5',
  check: 'M4.5 12.5 9.5 17.5 19.5 6.5',
  plus: 'M12 5v14M5 12h14',
  chevron: 'M6 9.5 12 15.5 18 9.5',
  spark: 'M12 3v4.5M12 16.5V21M3 12h4.5M16.5 12H21M6.2 6.2l3.2 3.2m5.2 5.2 3.2 3.2m0-11.6-3.2 3.2M9.4 14.6l-3.2 3.2',
} as const;

export type IconName = keyof typeof paths;

type Props = SVGProps<SVGSVGElement> & {
  name: IconName;
  /** Accessible name. Omit for purely decorative icons. */
  title?: string;
  strokeWidth?: number;
};

export function Icon({ name, title, strokeWidth = 1.25, className = 'h-5 w-5', ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      <path d={paths[name]} />
    </svg>
  );
}

/**
 * Icon inside its own recessed puck — the standard leading element for tiles,
 * list rows and channel cards.
 */
export function IconPuck({
  name,
  className = '',
  size = 'md',
}: {
  name: IconName;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const box = { sm: 'h-9 w-9', md: 'h-11 w-11', lg: 'h-14 w-14' }[size];
  const glyph = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6' }[size];

  return (
    <span
      className={[
        box,
        'edge relative flex shrink-0 items-center justify-center rounded-2xl',
        'bg-raised/80 text-silver',
        'transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
        'group-hover:text-bright group-hover:bg-raised',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Icon name={name} className={glyph} />
    </span>
  );
}
