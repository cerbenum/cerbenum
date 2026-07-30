import type { Metadata } from 'next';

import { JsonLd } from '@/components/JsonLd';
import { ReleasePolicy } from '@/components/sections/ReleasePolicy';
import { Bezel, Divider } from '@/components/ui/Bezel';
import { Cta } from '@/components/ui/Cta';
import { SectionHeading } from '@/components/ui/Eyebrow';
import { IconPuck } from '@/components/ui/Icon';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { Tilt3D } from '@/components/ui/Tilt3D';
import { doctrine, principles, site } from '@/data/site';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/jsonld';

const title = 'Engineering doctrine';
const description =
  'How Cerbenum decides: security over appearance, verification over assumption, privacy by architecture, and a definition of ready that requires failure to have been tested and contained.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${site.url}/doctrine/` },
  keywords: [
    'engineering doctrine',
    'security by architecture',
    'release policy',
    'threat modeling',
    'production readiness',
  ],
  openGraph: {
    type: 'article',
    title,
    description,
    url: `${site.url}/doctrine/`,
    images: [site.abs('/og.png')],
  },
  twitter: { card: 'summary_large_image', title, description, images: [site.abs('/og.png')] },
};

export default function DoctrinePage() {
  return (
    <>
      <JsonLd
        data={graph([
          webPageSchema({ path: '/doctrine/', name: title, description }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Doctrine', path: '/doctrine/' },
          ]),
        ])}
      />

      <section className="relative z-10 px-6 pb-14 pt-36 sm:pt-44">
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <SectionHeading
              as="h1"
              eyebrow="Doctrine"
              eyebrowIcon="terminal"
              title={<span className="text-chrome">How decisions get made</span>}
              lede="Four rules, decided before a line of production code is written."
            />
          </Reveal>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-16">
        <div className="mx-auto w-full max-w-6xl">
          <Stagger className="grid gap-4 sm:grid-cols-2">
            {doctrine.map((rule, index) => (
              <StaggerItem key={rule.title}>
                <Tilt3D max={6}>
                  <Bezel interactive className="h-full">
                    <article className="flex h-full flex-col p-8 sm:p-10">
                      <div className="flex items-start justify-between gap-4">
                        <IconPuck name={rule.icon} size="lg" />
                        <span className="font-mono text-[10px] tracking-[0.22em] text-muted">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h2 className="mt-7 text-xl font-normal tracking-[-0.025em] text-bright sm:text-2xl">
                        {rule.title}
                      </h2>
                      <p className="mt-3 text-base leading-relaxed text-muted">{rule.body}</p>
                    </article>
                  </Bezel>
                </Tilt3D>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="trade-offs" className="relative z-10 px-6 py-16 sm:py-24">
        <div className="mx-auto w-full max-w-3xl">
          <Reveal>
            <Divider label="Trade-offs" />
          </Reveal>

          <Reveal delay={0.06} className="mt-10">
            <Bezel>
              <dl className="divide-y divide-line/70 font-mono text-sm">
                {principles.map(([preferred, rejected]) => (
                  <div key={preferred} className="flex items-center gap-4 px-6 py-4">
                    <dt className="flex-1 text-bright">{preferred}</dt>
                    <span aria-hidden className="text-muted">
                      &gt;
                    </span>
                    <dd className="flex-1 text-right text-muted line-through decoration-line">
                      {rejected}
                    </dd>
                  </div>
                ))}
              </dl>
            </Bezel>
          </Reveal>
        </div>
      </section>

      <ReleasePolicy />

      <section className="relative z-10 px-6 pb-24">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap gap-3">
          <Reveal>
            <Cta href="/veyna/">Doctrine applied — Veyna</Cta>
          </Reveal>
          <Reveal delay={0.06}>
            <Cta href="/#contact" variant="ghost" icon="mail">
              Contact
            </Cta>
          </Reveal>
        </div>
      </section>
    </>
  );
}
