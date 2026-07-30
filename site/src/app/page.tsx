import type { Metadata } from 'next';

import { JsonLd } from '@/components/JsonLd';
import { CapabilityTiles } from '@/components/sections/CapabilityTiles';
import { Contact } from '@/components/sections/Contact';
import { Hero } from '@/components/sections/Hero';
import { RegistryStrip } from '@/components/sections/Registry';
import { VeynaSpotlight } from '@/components/sections/VeynaSpotlight';
import { site } from '@/data/site';
import { graph, webPageSchema } from '@/lib/jsonld';

const title = `${site.name} — Secure systems, private infrastructure, protocol engineering`;

export const metadata: Metadata = {
  title: { absolute: title },
  description: site.description,
  alternates: { canonical: `${site.url}/` },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={graph([webPageSchema({ path: '/', name: title, description: site.description })])}
      />
      <Hero />
      <CapabilityTiles />
      <VeynaSpotlight />
      <RegistryStrip />
      <Contact />
    </>
  );
}
