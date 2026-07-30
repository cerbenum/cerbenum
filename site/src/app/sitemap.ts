import type { MetadataRoute } from 'next';

import { site } from '@/data/site';

const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: [string, number][] = [
    ['/', 1],
    ['/veyna/', 0.9],
    ['/capabilities/', 0.85],
    ['/systems/', 0.8],
    ['/doctrine/', 0.7],
  ];

  return routes.map(([path, priority]) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: 'weekly',
    priority,
  }));
}

export const dynamic = 'force-static';
