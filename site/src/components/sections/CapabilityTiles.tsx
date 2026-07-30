import Link from 'next/link';

import { capabilities } from '@/data/capabilities';
import { Bezel } from '@/components/ui/Bezel';
import { Cta } from '@/components/ui/Cta';
import { SectionHeading } from '@/components/ui/Eyebrow';
import { Icon, IconPuck } from '@/components/ui/Icon';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { Tilt3D } from '@/components/ui/Tilt3D';

/**
 * Home overview: one line per discipline, nothing more. The full item lists
 * live on the capabilities page.
 */
export function CapabilityTiles() {
  return (
    <section id="capabilities" className="relative z-10 px-6 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <SectionHeading
              eyebrow="Capabilities"
              eyebrowIcon="layers"
              title={
                <>
                  Four disciplines,
                  <span className="block text-muted">one boundary.</span>
                </>
              }
            />
          </Reveal>
          <Reveal delay={0.08}>
            <Cta href="/capabilities/" variant="ghost">
              See the detail
            </Cta>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((capability) => (
            <StaggerItem key={capability.id}>
              <Tilt3D>
                <Bezel interactive className="h-full">
                  <Link
                    href={`/capabilities/#${capability.id}`}
                    className="flex h-full flex-col p-7"
                    aria-label={`${capability.title} — ${capability.headline}`}
                  >
                    <div className="flex items-start justify-between">
                      <IconPuck name={capability.icon} />
                      <span className="font-mono text-[10px] tracking-[0.22em] text-muted">
                        {capability.index}
                      </span>
                    </div>

                    <h3 className="mt-7 text-xl font-normal tracking-[-0.02em] text-bright">
                      {capability.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                      {capability.headline}
                    </p>

                    <span className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-silver">
                      Detail
                      <Icon
                        name="arrow"
                        className="h-3 w-3 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.5}
                      />
                    </span>
                  </Link>
                </Bezel>
              </Tilt3D>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
