'use client';

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  /** Distance travelled on entry, in pixels. */
  distance?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article' | 'header' | 'footer';
} & Omit<HTMLMotionProps<'div'>, 'children' | 'className'>;

/**
 * Heavy fade-up used for every block that enters the viewport. Uses
 * IntersectionObserver via `whileInView` — never a scroll listener — and
 * collapses to a plain fade when the visitor prefers reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 56,
  className,
  as = 'div',
  ...rest
}: RevealProps) {
  const reduced = useReducedMotion();
  // The element type is chosen per call site; the motion props are identical
  // across them, so a single signature is enough.
  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: distance, filter: 'blur(10px)' }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{
        duration: reduced ? 0.25 : 0.9,
        delay: reduced ? 0 : delay,
        ease: [0.32, 0.72, 0, 1],
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  step?: number;
};

/** Parent that drives a staggered child reveal without per-child delay math. */
export function Stagger({ children, className, step = 0.09 }: StaggerProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduced ? 0 : step } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 44, filter: 'blur(8px)' },
        visible: reduced
          ? { opacity: 1 }
          : {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 0.85, ease: [0.32, 0.72, 0, 1] },
            },
      }}
    >
      {children}
    </motion.div>
  );
}
