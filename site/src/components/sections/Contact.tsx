import { site } from '@/data/site';
import { Bezel } from '@/components/ui/Bezel';
import { SectionHeading } from '@/components/ui/Eyebrow';
import { Icon, IconPuck, type IconName } from '@/components/ui/Icon';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { Tilt3D } from '@/components/ui/Tilt3D';

const channels: {
  label: string;
  value: string;
  href: string;
  icon: IconName;
  external: boolean;
}[] = [
  {
    label: 'Email',
    value: site.contact.email,
    href: `mailto:${site.contact.email}`,
    icon: 'mail',
    external: false,
  },
  {
    label: 'Telegram',
    value: site.contact.telegramHandle,
    href: site.contact.telegram,
    icon: 'telegram',
    external: true,
  },
  {
    label: 'GitHub',
    value: site.contact.githubHandle,
    href: site.contact.github,
    icon: 'github',
    external: true,
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative z-10 px-6 py-24 sm:py-36">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            eyebrowIcon="mail"
            align="center"
            title={<span className="text-chrome">Open a channel.</span>}
            lede="For technical or project-related communication."
          />
        </Reveal>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-3">
          {channels.map((channel) => (
            <StaggerItem key={channel.label}>
              <Tilt3D max={6}>
                <Bezel interactive className="h-full">
                  <a
                    href={channel.href}
                    {...(channel.external
                      ? { target: '_blank', rel: 'me noopener noreferrer' }
                      : {})}
                    className="flex h-full flex-col items-center gap-4 p-8 text-center"
                  >
                    <IconPuck name={channel.icon} size="lg" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                      {channel.label}
                    </span>
                    <span className="break-all text-[0.95rem] tracking-tight text-bright">
                      {channel.value}
                    </span>
                    <span
                      aria-hidden
                      className="mt-auto flex h-8 w-8 items-center justify-center rounded-full bg-raised text-bright ring-1 ring-line transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      <Icon name="arrow" className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </span>
                  </a>
                </Bezel>
              </Tilt3D>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
