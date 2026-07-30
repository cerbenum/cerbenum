import type { MetadataRoute } from 'next';

import { site } from '@/data/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.legalName,
    short_name: site.name,
    description: site.shortDescription,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#050505',
    theme_color: '#050505',
    categories: ['technology', 'security', 'utilities'],
    icons: [
      {
        src: '/brand/cerbenum-mark.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/brand/cerbenum-mark-180.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}

export const dynamic = 'force-static';
