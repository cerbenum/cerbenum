'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

import { site } from '@/data/site';
import { Icon, type IconName } from './Icon';
import { Wordmark } from './Mark';

const links: { href: string; label: string; icon: IconName }[] = [
  { href: '/capabilities/', label: 'Capabilities', icon: 'layers' },
  { href: '/veyna/', label: 'Veyna', icon: 'shield' },
  { href: '/systems/', label: 'Systems', icon: 'cube' },
  { href: '/doctrine/', label: 'Doctrine', icon: 'terminal' },
];

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: width }}
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-muted via-bright to-muted"
    />
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);
  const pathname = usePathname();
  const reduced = useReducedMotion();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <ScrollProgress />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-bright focus:px-5 focus:py-2 focus:text-sm focus:font-medium focus:text-base"
      >
        Skip to content
      </a>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4 sm:pt-5">
        <nav
          aria-label="Primary"
          className={[
            'pointer-events-auto flex w-full max-w-5xl items-center justify-between gap-4 rounded-full',
            'border px-3 py-2 pl-4 backdrop-blur-2xl',
            'transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] lg:w-max lg:px-4',
            lifted
              ? 'border-line bg-surface/85 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.95)]'
              : 'border-line/60 bg-surface/55',
          ].join(' ')}
        >
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="rounded-full transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:opacity-80"
          >
            <Wordmark />
          </Link>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={[
                    'flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.82rem] tracking-tight',
                    'transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
                    isActive(link.href)
                      ? 'bg-raised text-bright ring-1 ring-line'
                      : 'text-body hover:bg-raised/70 hover:text-bright',
                  ].join(' ')}
                >
                  <Icon name={link.icon} className="h-3.5 w-3.5" strokeWidth={1.3} />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/#contact"
              className="hidden items-center gap-2 rounded-full bg-bright px-4 py-2 text-[0.82rem] font-medium text-base transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white sm:flex"
            >
              Contact
              <Icon name="arrow" className="h-3 w-3" strokeWidth={1.6} />
            </Link>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-raised ring-1 ring-line transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-line lg:hidden"
            >
              <span
                aria-hidden
                className={`absolute h-px w-4 bg-bright transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  open ? 'translate-y-0 rotate-45' : '-translate-y-1'
                }`}
              />
              <span
                aria-hidden
                className={`absolute h-px w-4 bg-bright transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  open ? 'translate-y-0 -rotate-45' : 'translate-y-1'
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="site-menu"
            className="fixed inset-0 z-30 flex flex-col justify-center bg-base/92 px-6 backdrop-blur-3xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          >
            <ul className="space-y-1.5">
              {[...links, { href: '/#contact', label: 'Contact', icon: 'mail' as IconName }].map(
                (link, index) => (
                  <motion.li
                    key={link.href}
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 38 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.55,
                      delay: reduced ? 0 : 0.04 + index * 0.05,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-4 rounded-2xl px-2 py-3 text-3xl font-light tracking-tight text-bright"
                    >
                      <Icon name={link.icon} className="h-6 w-6 text-muted" />
                      {link.label}
                    </Link>
                  </motion.li>
                ),
              )}
            </ul>

            <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              {site.tagline}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
