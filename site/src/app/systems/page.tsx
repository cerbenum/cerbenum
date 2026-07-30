import type { Metadata } from 'next';

import { JsonLd } from '@/components/JsonLd';
import { RegistryGrid } from '@/components/sections/Registry';
import { Cta } from '@/components/ui/Cta';
import { SectionHeading } from '@/components/ui/Eyebrow';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { ecosystems, projects } from '@/data/projects';
import { site } from '@/data/site';
import { breadcrumbSchema, graph, registrySchema, webPageSchema } from '@/lib/jsonld';

const title = 'System registry';
const description =
  'Public registry of Cerbenum systems and repositories — the VEYNA protocol core, control plane, clients and access automation, with their current release state and source model.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${site.url}/systems/` },
  keywords: [
    'Cerbenum repositories',
    'Cerbenum projects',
    'Veyna.App',
    'Veyna.Core',
    'Veyna.Panel',
    'Veyna.TelegramBot',
  ],
  openGraph: {
    type: 'website',
    title,
    description,
    url: `${site.url}/systems/`,
    images: [site.abs('/og.png')],
  },
  twitter: { card: 'summary_large_image', title, description, images: [site.abs('/og.png')] },
};

const counts: { label: string; value: string; icon: IconName }[] = [
  { label: 'Components', value: String(projects.length), icon: 'cube' },
  { label: 'Ecosystems', value: String(ecosystems.length), icon: 'layers' },
  { label: 'Public source', value: '0', icon: 'lock' },
  { label: 'Release gate', value: 'v1', icon: 'shield' },
];

export default function SystemsPage() {
  return (
    <>
      <JsonLd
        data={graph([
          webPageSchema({ path: '/systems/', name: title, description }),
          registrySchema,
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Systems', path: '/systems/' },
          ]),
        ])}
      />

      <section className="relative z-10 px-6 pb-14 pt-36 sm:pt-44">
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <SectionHeading
              as="h1"
              eyebrow="Registry"
              eyebrowIcon="cube"
              title={<span className="text-chrome">System registry</span>}
              lede="Every component Cerbenum operates, with its role and current release state. The list grows as systems reach the public surface."
            />
          </Reveal>

          <Reveal delay={0.08} className="mt-10">
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {counts.map((count) => (
                <div key={count.label} className="edge rounded-2xl bg-surface/80 px-5 py-4">
                  <dt className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    <Icon name={count.icon} className="h-3.5 w-3.5" strokeWidth={1.3} />
                    {count.label}
                  </dt>
                  <dd className="mt-2.5 text-2xl font-light tracking-tight text-bright">
                    {count.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-24">
        <div className="mx-auto w-full max-w-6xl">
          <RegistryGrid />

          <Reveal delay={0.06} className="mt-10 flex flex-wrap gap-3">
            <Cta href={site.contact.github} external icon="github">
              All repositories
            </Cta>
            <Cta href="/doctrine/#release-policy" variant="ghost" icon="package">
              Release policy
            </Cta>
          </Reveal>
        </div>
      </section>
    </>
  );
}
