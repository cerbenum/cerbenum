import { capabilities } from '@/data/capabilities';
import { projects, repoUrl } from '@/data/projects';
import { site } from '@/data/site';
import { traits, veyna } from '@/data/veyna';

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;

export const organizationSchema = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: site.legalName,
  alternateName: site.name,
  url: `${site.url}/`,
  email: site.contact.email,
  slogan: site.tagline,
  description: site.description,
  logo: {
    '@type': 'ImageObject',
    url: site.abs('/brand/cerbenum-mark.png'),
    width: 512,
    height: 512,
  },
  image: site.abs('/og.png'),
  knowsAbout: capabilities.flatMap((capability) => capability.items),
  sameAs: [site.contact.github, site.contact.telegram],
};

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: `${site.url}/`,
  name: site.name,
  description: site.description,
  inLanguage: 'en',
  publisher: { '@id': ORG_ID },
};

export const veynaSchema = {
  '@type': 'SoftwareApplication',
  '@id': `${site.url}/veyna/#software`,
  name: veyna.name,
  applicationCategory: 'SecurityApplication',
  applicationSubCategory: 'VPN client',
  operatingSystem: 'Windows, Android, iOS, macOS, Linux',
  url: `${site.url}/veyna/`,
  softwareVersion: '1.0 (unreleased)',
  releaseNotes: veyna.releases,
  description:
    'VEYNA is a cross-platform secure-connectivity client built on a proprietary protocol: multiplexed transport over TCP, TLS, WebSocket and QUIC, device-bound access, kill switch and a zero-knowledge key model.',
  author: { '@id': ORG_ID },
  publisher: { '@id': ORG_ID },
  isAccessibleForFree: false,
  featureList: traits.map((trait) => `${trait.title} — ${trait.note}`),
};

export const registrySchema = {
  '@type': 'ItemList',
  '@id': `${site.url}/systems/#registry`,
  name: 'Cerbenum system registry',
  numberOfItems: projects.length,
  itemListElement: projects.map((project, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'SoftwareSourceCode',
      name: project.name,
      description: project.summary,
      codeRepository: project.repo ? repoUrl(project.repo) : undefined,
      programmingLanguage: project.stack,
      author: { '@id': ORG_ID },
    },
  })),
};

export const capabilitiesSchema = {
  '@type': 'ItemList',
  '@id': `${site.url}/capabilities/#list`,
  name: 'Cerbenum capabilities',
  numberOfItems: capabilities.length,
  itemListElement: capabilities.map((capability, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: capability.title,
    description: [capability.headline, ...capability.items].join(' · '),
  })),
};

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: `${site.url}${entry.path}`,
    })),
  };
}

export function webPageSchema(options: { path: string; name: string; description: string }) {
  return {
    '@type': 'WebPage',
    '@id': `${site.url}${options.path}#webpage`,
    url: `${site.url}${options.path}`,
    name: options.name,
    description: options.description,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'en',
  };
}

/** Wraps a set of nodes into a single `@graph` document. */
export function graph(nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
