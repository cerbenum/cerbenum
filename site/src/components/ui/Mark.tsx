/**
 * Flat rendering of the Cerbenum chevron, traced from the same centre-line and
 * layer offsets as the WebGL mark in `src/lib/chevron.ts`.
 */
const RIBBON =
  'M0.4728 -0.637 L-0.2368 -0.2407 L-0.2368 0.2407 L0.4728 0.637 ' +
  'L0.3577 0.843 L-0.4728 0.3793 L-0.4728 -0.3793 L0.3577 -0.843 Z';

const LAYERS = [
  { scale: 1, x: -0.11, from: '#9aa1ab', via: '#f0f3f7', to: '#6b717a' },
  { scale: 0.855, x: 0.03, from: '#c3c9d2', via: '#ffffff', to: '#868c95' },
  { scale: 0.71, x: 0.16, from: '#e2e6ec', via: '#ffffff', to: '#a1a7b0' },
];

type Props = { className?: string; title?: string };

// Every mark on the page uses the identical gradient set, so one shared id
// space is correct: the first definition in the document resolves them all.
const scope = 'ceb-mark';

export function Mark({ className = 'h-8 w-8', title }: Props) {
  return (
    <svg
      viewBox="-0.63 -0.9 1.18 1.8"
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <defs>
        {LAYERS.map((layer, index) => (
          <linearGradient
            key={index}
            id={`${scope}-${index}`}
            x1="0"
            y1="-0.9"
            x2="0.6"
            y2="0.9"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={layer.from} />
            <stop offset="42%" stopColor={layer.via} />
            <stop offset="72%" stopColor={layer.from} />
            <stop offset="100%" stopColor={layer.to} />
          </linearGradient>
        ))}
      </defs>

      {LAYERS.map((layer, index) => (
        <g key={index} transform={`translate(${layer.x} 0) scale(${layer.scale})`}>
          {/* The dark outline recreates the shadow gap between stacked plates. */}
          <path
            d={RIBBON}
            fill={`url(#${scope}-${index})`}
            stroke="#0e0f13"
            strokeWidth={0.032 / layer.scale}
            strokeLinejoin="round"
          />
        </g>
      ))}
    </svg>
  );
}

/**
 * Mark plus wordmark.
 *
 * The wordmark is live text, never the black-on-white logo artwork, so it stays
 * legible on the dark surface at every size.
 */
export function Wordmark({
  className = '',
  size = 'sm',
}: {
  className?: string;
  size?: 'sm' | 'lg';
}) {
  const scale =
    size === 'lg'
      ? {
          mark: 'h-14 w-14 sm:h-16 sm:w-16',
          name: 'text-2xl sm:text-3xl tracking-[0.24em]',
          sub: 'mt-2 text-[0.6rem] sm:text-[0.68rem] tracking-[0.5em]',
          gap: 'gap-4 sm:gap-5',
        }
      : {
          mark: 'h-8 w-8',
          name: 'text-[0.98rem] tracking-[0.25em]',
          sub: 'mt-1 text-[0.5rem] tracking-[0.42em]',
          gap: 'gap-3',
        };

  return (
    <span className={`flex items-center ${scale.gap} ${className}`}>
      <Mark className={`${scale.mark} shrink-0`} />
      <span className="flex flex-col leading-none">
        <span className={`font-medium text-bright ${scale.name}`}>CERBENUM</span>
        <span className={`font-mono text-silver ${scale.sub}`}>COLLECTIVE</span>
      </span>
    </span>
  );
}
