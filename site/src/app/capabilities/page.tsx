import type { Metadata } from 'next';

import { JsonLd } from '@/components/JsonLd';
import { Bezel } from '@/components/ui/Bezel';
import { Cta } from '@/components/ui/Cta';
import { SectionHeading } from '@/components/ui/Eyebrow';
import { Icon, IconPuck } from '@/components/ui/Icon';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { capabilities } from '@/data/capabilities';
import { site } from '@/data/site';
import { breadcrumbSchema, capabilitiesSchema, graph, webPageSchema } from '@/lib/jsonld';

const title = 'Capabilities';
const description =
  'The four disciplines Cerbenum operates in: systems engineering, networks and infrastructure, security engineering, and product architecture.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${site.url}/capabilities/` },
  keywords: [
    'Rust systems engineering',
    'secure network architecture',
    'threat modeling',
    'control plane data plane',
    'device-bound access',
    'Linux infrastructure',
  ],
  openGraph: {
    type: 'website',
    title,
    description,
    url: `${site.url}/capabilities/`,
    images: [site.abs('/og.png')],
  },
  twitter: { card: 'summary_large_image', title, description, images: [site.abs('/og.png')] },
};

export default function CapabilitiesPage() {
  return (
    <>
      <JsonLd
        data={graph([
          webPageSchema({ path: '/capabilities/', name: title, description }),
          capabilitiesSchema,
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Capabilities', path: '/capabilities/' },
          ]),
        ])}
      />

      <section className="relative z-10 px-6 pb-16 pt-36 sm:pt-44">
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <SectionHeading
              as="h1"
              eyebrow="Capabilities"
              eyebrowIcon="layers"
              title={<span className="text-chrome">What gets built</span>}
              lede="Systems, networks, security and product architecture are not separate engagements here. They are the same problem viewed from four sides."
            />
          </Reveal>

          <Reveal delay={0.08} className="mt-10">
            <nav aria-label="Disciplines" className="flex flex-wrap gap-2">
              {capabilities.map((capability) => (
                <a
                  key={capability.id}
                  href={`#${capability.id}`}
                  className="edge inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm text-body transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-bright"
                >
                  <Icon name={capability.icon} className="h-3.5 w-3.5 text-muted" strokeWidth={1.3} />
                  {capability.title}
                </a>
              ))}
            </nav>
          </Reveal>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-16">
        <div className="mx-auto w-full max-w-6xl">
          <Stagger className="grid gap-4 lg:grid-cols-2">
            {capabilities.map((capability) => (
              <StaggerItem key={capability.id}>
                <Bezel interactive className="h-full">
                  <article id={capability.id} className="flex h-full flex-col p-8 sm:p-10">
                    <header className="flex items-start justify-between gap-4">
                      <IconPuck name={capability.icon} size="lg" />
                      <span className="font-mono text-[10px] tracking-[0.22em] text-muted">
                        {capability.index}
                      </span>
                    </header>

                    <h2 className="mt-7 text-2xl font-normal tracking-[-0.025em] text-bright sm:text-3xl">
                      {capability.title}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-body">
                      {capability.headline}
                    </p>

                    <ul className="mt-8 grid gap-y-3 border-t border-line/70 pt-7">
                      {capability.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Icon
                            name="check"
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-silver"
                            strokeWidth={1.5}
                          />
                          <span className="text-sm leading-snug text-muted">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Bezel>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.06} className="mt-10 flex flex-wrap gap-3">
            <Cta href="/veyna/">See it applied — Veyna</Cta>
            <Cta href="/systems/" variant="ghost" icon="cube">
              System registry
            </Cta>
          </Reveal>
        </div>
      </section>
    </>
  );
}
