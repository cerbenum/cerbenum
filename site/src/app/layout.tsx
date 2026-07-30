import type { Metadata, Viewport } from 'next';
import { Geist, JetBrains_Mono } from 'next/font/google';

import { JsonLd } from '@/components/JsonLd';
import { Backdrop } from '@/components/three/Backdrop';
import { Footer } from '@/components/ui/Footer';
import { Grain } from '@/components/ui/Grain';
import { Nav } from '@/components/ui/Nav';
import { site } from '@/data/site';
import { graph, organizationSchema, websiteSchema } from '@/lib/jsonld';

import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.shortDescription}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  applicationName: site.name,
  authors: [{ name: site.legalName, url: site.contact.github }],
  creator: site.legalName,
  publisher: site.legalName,
  category: 'technology',
  alternates: { canonical: `${site.url}/` },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: site.legalName,
    title: `${site.name} — ${site.shortDescription}`,
    description: site.description,
    url: `${site.url}/`,
    locale: site.locale,
    images: [
      {
        url: site.abs('/og.png'),
        width: 1200,
        height: 630,
        alt: `${site.legalName} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.shortDescription}`,
    description: site.description,
    images: [site.abs('/og.png')],
  },
  manifest: `${site.basePath}/manifest.webmanifest`,
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: '#0e0f13',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${jetbrains.variable}`}>
      <body className="min-h-[100dvh] antialiased">
        <JsonLd data={graph([organizationSchema, websiteSchema])} />
        <Backdrop />
        <Grain />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
