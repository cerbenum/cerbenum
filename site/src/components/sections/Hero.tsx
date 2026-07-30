'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { Cta } from '@/components/ui/Cta';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Wordmark } from '@/components/ui/Mark';

const EASE = [0.32, 0.72, 0, 1] as const;

const facts: { label: string; value: string; icon: IconName }[] = [
  { label: 'Source model', value: 'Closed', icon: 'lock' },
  { label: 'Release gate', value: 'v1 or silence', icon: 'shield' },
  { label: 'Public surface', value: 'Minimal', icon: 'radar' },
];

const ticker = [
  'PROTOCOL ENGINEERING',
  'SECURE TRANSPORT',
  'PRIVATE INFRASTRUCTURE',
  'DEVICE-BOUND ACCESS',
  'THREAT MODELING',
  'CONTROL PLANE',
];

export function Hero() {
  const reduced = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 34, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: reduced ? 0.3 : 0.95, delay: reduced ? 0 : delay, ease: EASE },
  });

  return (
    <section id="hero" className="relative flex min-h-[100dvh] items-center px-6 pb-28 pt-32 sm:pt-36">
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          {/* The lockup is live text, so the wordmark can never disappear into
              the background the way the black-on-white artwork would. */}
          <motion.div {...rise(0.02)}>
            <Wordmark size="lg" />
          </motion.div>

          <motion.div {...rise(0.12)} className="mt-10">
            <Eyebrow icon="spark">Independent systems engineering</Eyebrow>
          </motion.div>

          <motion.h1
            {...rise(0.2)}
            className="mt-6 text-[clamp(2.7rem,7.6vw,5.6rem)] font-light leading-[0.94] tracking-[-0.042em]"
          >
            <span className="block text-chrome">Built below</span>
            <span className="block text-chrome">the surface.</span>
          </motion.h1>

          <motion.p {...rise(0.28)} className="mt-7 max-w-lg text-base leading-relaxed text-body sm:text-lg">
            Secure networks, private infrastructure and protocol-level software.
          </motion.p>

          <motion.div {...rise(0.36)} className="mt-9 flex flex-wrap items-center gap-3">
            <Cta href="/veyna/">Veyna ecosystem</Cta>
            <Cta href="/capabilities/" variant="ghost" icon="layers">
              What we build
            </Cta>
          </motion.div>

          <motion.dl {...rise(0.46)} className="mt-14 flex flex-wrap gap-3">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="edge flex items-center gap-3 rounded-2xl bg-surface/80 px-4 py-3 backdrop-blur-sm"
              >
                <Icon name={fact.icon} className="h-4 w-4 shrink-0 text-muted" strokeWidth={1.3} />
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-sm tracking-tight text-bright">{fact.value}</dd>
                </div>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: EASE }}
        className="pointer-events-none absolute inset-x-0 bottom-7 overflow-hidden border-y border-line/50 py-2.5"
      >
        <div
          className={`flex w-max gap-8 font-mono text-[10px] uppercase tracking-[0.3em] text-muted ${
            reduced ? '' : 'animate-marquee'
          }`}
        >
          {[...ticker, ...ticker, ...ticker].map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center gap-8 whitespace-nowrap">
              {item}
              <span className="h-1 w-1 rounded-full bg-line" />
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
