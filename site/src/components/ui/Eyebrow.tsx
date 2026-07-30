import type { ReactNode } from 'react';

import { Icon, type IconName } from './Icon';

export function Eyebrow({
  children,
  icon,
  className = '',
}: {
  children: ReactNode;
  icon?: IconName;
  className?: string;
}) {
  return (
    <span
      className={[
        'inline-flex items-center gap-2 rounded-full py-1.5 pl-2.5 pr-3.5',
        'bg-raised ring-1 ring-line',
        'font-mono text-[10px] uppercase tracking-[0.22em] text-silver',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {icon ? (
        <Icon name={icon} className="h-3.5 w-3.5 text-muted" strokeWidth={1.4} />
      ) : (
        <span aria-hidden className="animate-pulse-slow h-1.5 w-1.5 rounded-full bg-bright" />
      )}
      {children}
    </span>
  );
}

type HeadingProps = {
  eyebrow: string;
  eyebrowIcon?: IconName;
  title: ReactNode;
  lede?: string;
  align?: 'left' | 'center';
  className?: string;
  as?: 'h1' | 'h2';
};

/** Standard section header so every page opens with the same rhythm. */
export function SectionHeading({
  eyebrow,
  eyebrowIcon,
  title,
  lede,
  align = 'left',
  className = '',
  as: Tag = 'h2',
}: HeadingProps) {
  const size =
    Tag === 'h1'
      ? 'text-[clamp(2.6rem,7vw,5rem)] leading-[0.95]'
      : 'text-[clamp(2rem,4.4vw,3.3rem)] leading-[1.03]';

  return (
    <div className={[align === 'center' ? 'text-center' : '', className].filter(Boolean).join(' ')}>
      <Eyebrow icon={eyebrowIcon}>{eyebrow}</Eyebrow>
      <Tag className={`mt-6 font-light tracking-[-0.038em] text-bright ${size}`}>{title}</Tag>
      {lede ? (
        <p
          className={`mt-5 text-base leading-relaxed text-body sm:text-[1.05rem] ${
            align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-xl'
          }`}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
