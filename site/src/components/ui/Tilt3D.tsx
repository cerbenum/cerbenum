'use client';

import { useRef, type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';

type Props = {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees at the far edge of the card. */
  max?: number;
  /** Lift towards the viewer, in pixels. */
  lift?: number;
};

/**
 * Pointer-driven card tilt with a specular highlight that tracks the cursor.
 *
 * Writes CSS custom properties on the element instead of React state so the
 * work stays on the compositor and no re-render happens on pointer move.
 */
export function Tilt3D({ children, className = '', max = 7, lift = 10 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const reduced = useReducedMotion();

  const apply = (x: number, y: number, active: boolean) => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty('--rx', `${active ? (0.5 - y) * max * 2 : 0}deg`);
    node.style.setProperty('--ry', `${active ? (x - 0.5) * max * 2 : 0}deg`);
    node.style.setProperty('--tz', `${active ? lift : 0}px`);
    node.style.setProperty('--mx', `${x * 100}%`);
    node.style.setProperty('--my', `${y * 100}%`);
    node.style.setProperty('--sheen', active ? '1' : '0');
  };

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => apply(x, y, true));
  };

  const onLeave = () => {
    cancelAnimationFrame(frame.current);
    apply(0.5, 0.5, false);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`depth-3d h-full ${className}`}
      style={
        {
          '--rx': '0deg',
          '--ry': '0deg',
          '--tz': '0px',
          '--mx': '50%',
          '--my': '50%',
          '--sheen': '0',
        } as React.CSSProperties
      }
    >
      <div
        className="relative h-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform"
        style={{
          transform:
            'rotateX(var(--rx)) rotateY(var(--ry)) translate3d(0, 0, var(--tz))',
        }}
      >
        {children}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-[var(--sheen)] transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
          style={{
            background:
              'radial-gradient(420px circle at var(--mx) var(--my), rgba(255,255,255,0.11), transparent 62%)',
          }}
        />
      </div>
    </div>
  );
}
