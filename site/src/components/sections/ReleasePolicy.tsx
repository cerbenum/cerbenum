import { Bezel } from '@/components/ui/Bezel';
import { SectionHeading } from '@/components/ui/Eyebrow';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';

const included = [
  'Official installers',
  'Application packages',
  'Release notes',
  'Checksums',
  'Public documentation',
  'Privacy policy',
  'Terms of use',
  'Known issues',
];

const excluded = [
  'Private source code',
  'Protocol internals',
  'Production infrastructure',
  'Private build systems',
  'Signing material',
  'Security-sensitive documentation',
  'Operational secrets',
];

function PolicyList({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: 'include' | 'exclude';
}) {
  return (
    <Bezel className="h-full">
      <div className="flex h-full flex-col p-8 sm:p-10">
        <h3 className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-silver">
          <Icon
            name={tone === 'include' ? 'check' : 'lock'}
            className="h-4 w-4 text-muted"
            strokeWidth={1.4}
          />
          {title}
        </h3>

        <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <Icon
                name={tone === 'include' ? 'check' : 'plus'}
                className={
                  tone === 'include'
                    ? 'mt-0.5 h-3.5 w-3.5 shrink-0 text-silver'
                    : 'mt-0.5 h-3.5 w-3.5 shrink-0 rotate-45 text-muted'
                }
                strokeWidth={1.5}
              />
              <span
                className={
                  tone === 'include'
                    ? 'text-sm leading-snug text-body'
                    : 'text-sm leading-snug text-muted'
                }
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Bezel>
  );
}

export function ReleasePolicy() {
  return (
    <section id="release-policy" className="relative z-10 px-6 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Release policy"
            eyebrowIcon="package"
            title="v1 or silence."
            lede="No fragmented preview release. The public surface appears when the ecosystem reaches version 1.0 — and even then, what ships publicly is bounded."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <PolicyList title="Public repositories may contain" items={included} tone="include" />
          </Reveal>
          <Reveal delay={0.08}>
            <PolicyList title="They will not contain" items={excluded} tone="exclude" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
