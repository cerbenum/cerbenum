import Link from 'next/link';

import { site } from '@/data/site';
import { Icon, type IconName } from './Icon';
import { Wordmark } from './Mark';

const columns: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: 'Work',
    links: [
      { href: '/capabilities/', label: 'Capabilities' },
      { href: '/veyna/', label: 'Veyna' },
      { href: '/systems/', label: 'System registry' },
    ],
  },
  {
    title: 'Position',
    links: [
      { href: '/doctrine/', label: 'Engineering doctrine' },
      { href: '/doctrine/#release-policy', label: 'Release policy' },
      { href: '/#contact', label: 'Contact' },
    ],
  },
];

const channels: { href: string; label: string; icon: IconName }[] = [
  { href: `mailto:${site.contact.email}`, label: site.contact.email, icon: 'mail' },
  { href: site.contact.telegram, label: site.contact.telegramHandle, icon: 'telegram' },
  { href: site.contact.github, label: site.contact.githubHandle, icon: 'github' },
];

export function Footer() {
  return (
    <footer className="relative z-10 mt-8 border-t border-line/70 bg-base/60 px-6 pb-12 pt-16 backdrop-blur-sm">
      <div className="mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          <Wordmark />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
            {site.shortDescription}
          </p>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
            Built below the surface
          </p>
        </div>

        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.26em] text-silver">
              {column.title}
            </h2>
            <ul className="mt-5 space-y-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="-mx-2 inline-block rounded-lg px-2 py-1.5 text-sm text-muted transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-bright"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="font-mono text-[10px] uppercase tracking-[0.26em] text-silver">
            Channels
          </h2>
          <ul className="mt-5 space-y-3">
            {channels.map((channel) => (
              <li key={channel.href}>
                <a
                  href={channel.href}
                  {...(channel.href.startsWith('http')
                    ? { target: '_blank', rel: 'me noopener noreferrer' }
                    : {})}
                  className="group -mx-2 inline-flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-muted transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-bright"
                >
                  <Icon
                    name={channel.icon}
                    className="h-4 w-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-px"
                  />
                  <span className="break-all">{channel.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 flex w-full max-w-6xl flex-col gap-3 border-t border-line/60 pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
          © {new Date().getFullYear()} {site.legalName}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
          {site.tagline}
        </p>
      </div>
    </footer>
  );
}
