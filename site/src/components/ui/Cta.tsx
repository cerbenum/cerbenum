import Link from 'next/link';
import type { ReactNode } from 'react';

import { Icon, type IconName } from './Icon';

type Variant = 'solid' | 'ghost';

const base =
  'group/cta inline-flex items-center gap-3 rounded-full pl-6 pr-1.5 py-1.5 text-sm font-medium tracking-tight ' +
  'transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]';

const skin: Record<Variant, string> = {
  solid:
    'bg-bright text-base hover:bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_10px_30px_-12px_rgba(245,247,250,0.35)]',
  ghost: 'bg-raised text-body ring-1 ring-line hover:bg-line hover:text-bright hover:ring-white/25',
};

const puck: Record<Variant, string> = {
  solid: 'bg-base/10 text-base',
  ghost: 'bg-white/10 text-bright',
};

type Props = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
  /** Glyph shown in the trailing puck. */
  icon?: IconName;
};

/** Pill CTA whose trailing glyph lives in its own nested circle. */
export function Cta({
  children,
  href,
  variant = 'solid',
  external = false,
  className = '',
  ariaLabel,
  icon = 'arrow',
}: Props) {
  const inner = (
    <>
      <span>{children}</span>
      <span
        aria-hidden
        className={[
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
          'transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
          'group-hover/cta:translate-x-1 group-hover/cta:-translate-y-px group-hover/cta:scale-105',
          puck[variant],
        ].join(' ')}
      >
        <Icon name={icon} className="h-3.5 w-3.5" strokeWidth={1.5} />
      </span>
    </>
  );

  const classes = [base, skin[variant], className].filter(Boolean).join(' ');

  if (!href) {
    return (
      <span aria-disabled className={`${classes} cursor-not-allowed opacity-50`}>
        {inner}
      </span>
    );
  }

  if (external) {
    return (
      <a href={href} aria-label={ariaLabel} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={ariaLabel} className={classes}>
      {inner}
    </Link>
  );
}
