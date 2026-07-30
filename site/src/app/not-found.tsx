import type { Metadata } from 'next';

import { Cta } from '@/components/ui/Cta';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Wordmark } from '@/components/ui/Mark';

export const metadata: Metadata = {
  title: 'Not found',
  description: 'This surface does not exist.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative z-10 flex min-h-[100dvh] items-center px-6 py-32">
      <div className="mx-auto w-full max-w-2xl text-center">
        <div className="flex justify-center">
          <Wordmark size="lg" />
        </div>

        <div className="mt-10 flex justify-center">
          <Eyebrow icon="radar">404</Eyebrow>
        </div>

        <h1 className="mt-6 text-[clamp(2rem,5.5vw,3.6rem)] font-light leading-[1.02] tracking-[-0.04em] text-chrome">
          This surface does not exist.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-body">
          The public footprint is intentionally small. What you were looking for is either
          private, or not published yet.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Cta href="/">Return to surface</Cta>
          <Cta href="/systems/" variant="ghost" icon="cube">
            System registry
          </Cta>
        </div>
      </div>
    </section>
  );
}
