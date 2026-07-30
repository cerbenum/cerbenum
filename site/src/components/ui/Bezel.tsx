import type { ReactNode } from 'react';

type BezelProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  as?: 'div' | 'article' | 'section' | 'li' | 'aside';
  interactive?: boolean;
};

/**
 * Double-bezel enclosure: an outer machined tray holding an inner core with its
 * own top highlight and a concentric radius.
 */
export function Bezel({
  children,
  className = '',
  innerClassName = '',
  as: Tag = 'div',
  interactive = false,
}: BezelProps) {
  return (
    <Tag
      className={[
        'group relative rounded-[2rem] p-1.5',
        'bg-line-soft/70 ring-1 ring-line/80',
        'transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]',
        interactive
          ? 'hover:bg-line/70 hover:ring-white/20 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]'
          : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        className={[
          'panel edge relative h-full overflow-hidden rounded-[calc(2rem-0.375rem)]',
          innerClassName,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </div>
    </Tag>
  );
}

/** Small label chip used for status, tags and metadata. */
export function Chip({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1',
        'bg-raised/90 ring-1 ring-line',
        'font-mono text-[10px] uppercase tracking-[0.16em] text-muted',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  );
}

/** Full-width rule with a centred mono label. */
export function Divider({ label }: { label?: string }) {
  return (
    <div aria-hidden className="flex items-center gap-5">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-line" />
      {label ? (
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          {label}
        </span>
      ) : null}
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-line" />
    </div>
  );
}
