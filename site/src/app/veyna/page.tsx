import type { Metadata } from 'next';

import { JsonLd } from '@/components/JsonLd';
import { Bezel, Chip, Divider } from '@/components/ui/Bezel';
import { Cta } from '@/components/ui/Cta';
import { SectionHeading } from '@/components/ui/Eyebrow';
import { Icon, IconPuck } from '@/components/ui/Icon';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { Tilt3D } from '@/components/ui/Tilt3D';
import { modes, platforms, stack, traits, veyna } from '@/data/veyna';
import { site } from '@/data/site';
import { breadcrumbSchema, graph, veynaSchema, webPageSchema } from '@/lib/jsonld';

const title = 'Veyna — secure-connectivity ecosystem';
const description =
  'VEYNA is a cross-platform secure-connectivity ecosystem by Cerbenum: a Rust protocol core, multiplexed transport over TCP, TLS, WebSocket and QUIC, device-bound access, kill switch and a zero-knowledge key model.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${site.url}/veyna/` },
  keywords: [
    'VEYNA',
    'VEYNA VPN',
    'Cerbenum VEYNA',
    'secure VPN client',
    'QUIC transport',
    'kill switch VPN',
    'zero-knowledge VPN',
    'device-bound access',
  ],
  openGraph: {
    type: 'article',
    title,
    description,
    url: `${site.url}/veyna/`,
    images: [site.abs('/og.png')],
  },
  twitter: { card: 'summary_large_image', title, description, images: [site.abs('/og.png')] },
};

export default function VeynaPage() {
  return (
    <>
      <JsonLd
        data={graph([
          webPageSchema({ path: '/veyna/', name: title, description }),
          veynaSchema,
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Veyna', path: '/veyna/' },
          ]),
        ])}
      />

      {/* ---- Overview ---- */}
      <section className="relative z-10 px-6 pb-16 pt-36 sm:pt-44">
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <SectionHeading
              as="h1"
              eyebrow="Ecosystem brief"
              eyebrowIcon="shield"
              title={<span className="text-chrome">VEYNA</span>}
              lede={veyna.lede}
            />
          </Reveal>

          <Reveal delay={0.08} className="mt-8 flex flex-wrap gap-2">
            {veyna.state.map(([label, value]) => (
              <Chip key={label}>
                <span className="text-muted">{label}</span>
                <span className="text-bright">{value}</span>
              </Chip>
            ))}
          </Reveal>

          <Reveal delay={0.14} className="mt-9 flex flex-wrap gap-3">
            <Cta href={veyna.releases} external icon="package">
              Track releases
            </Cta>
            <Cta href={veyna.repo} variant="ghost" external icon="github">
              Veyna.App
            </Cta>
          </Reveal>
        </div>
      </section>

      {/* ---- Architecture ---- */}
      <section id="architecture" className="relative z-10 px-6 py-16 sm:py-24">
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <Divider label="Client architecture" />
          </Reveal>

          <Reveal delay={0.05} className="mt-12">
            <SectionHeading
              eyebrow="Three layers"
              eyebrowIcon="layers"
              title={
                <>
                  One trust boundary
                  <span className="block text-muted">per layer.</span>
                </>
              }
              lede="The interface holds no secrets. The system service holds no protocol logic. The core is the only layer that touches key material."
            />
          </Reveal>

          <Stagger className="depth-3d mt-12 space-y-3">
            {stack.map((layer, index) => (
              <StaggerItem key={layer.layer}>
                <Bezel
                  interactive
                  className="transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                >
                  <div className="flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
                    <div className="flex items-center gap-4">
                      <IconPuck name={layer.icon} />
                      <span className="font-mono text-[10px] tracking-[0.22em] text-muted">
                        L{index + 1}
                      </span>
                    </div>

                    <h3 className="w-36 shrink-0 text-lg tracking-[-0.02em] text-bright">
                      {layer.layer}
                    </h3>
                    <p className="w-28 shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-silver">
                      {layer.role}
                    </p>
                    <p className="flex-1 text-sm leading-relaxed text-muted">{layer.note}</p>

                    {layer.link ? <Chip className="shrink-0">{layer.link}</Chip> : null}
                  </div>
                </Bezel>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Capabilities ---- */}
      <section id="features" className="relative z-10 px-6 py-16 sm:py-24">
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <Divider label="What it does" />
          </Reveal>

          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {traits.map((trait) => (
              <StaggerItem key={trait.title}>
                <Tilt3D max={6}>
                  <Bezel interactive className="h-full">
                    <div className="flex h-full flex-col p-7">
                      <IconPuck name={trait.icon} />
                      <h3 className="mt-6 text-base tracking-tight text-bright">{trait.title}</h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-muted">{trait.note}</p>
                    </div>
                  </Bezel>
                </Tilt3D>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Modes and targets ---- */}
      <section id="targets" className="relative z-10 px-6 py-16 sm:py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-4 lg:grid-cols-2">
          <Reveal>
            <Bezel className="h-full">
              <div className="p-8 sm:p-10">
                <h2 className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-silver">
                  <Icon name="route" className="h-4 w-4 text-muted" strokeWidth={1.4} />
                  Connection modes
                </h2>

                <ul className="mt-8 space-y-3">
                  {modes.map((mode) => (
                    <li
                      key={mode.name}
                      className="edge flex items-center gap-4 rounded-2xl bg-raised/70 p-4"
                    >
                      <IconPuck name={mode.icon} size="sm" />
                      <div>
                        <p className="text-sm tracking-tight text-bright">{mode.name}</p>
                        <p className="mt-0.5 text-sm text-muted">{mode.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Bezel>
          </Reveal>

          <Reveal delay={0.08}>
            <Bezel className="h-full">
              <div className="p-8 sm:p-10">
                <h2 className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-silver">
                  <Icon name="cube" className="h-4 w-4 text-muted" strokeWidth={1.4} />
                  Client targets
                </h2>

                <table className="mt-8 w-full text-left">
                  <caption className="sr-only">
                    VEYNA client platforms and their current release state
                  </caption>
                  <thead>
                    <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                      <th scope="col" className="pb-3 font-normal">
                        Platform
                      </th>
                      <th scope="col" className="pb-3 font-normal">
                        Arch
                      </th>
                      <th scope="col" className="pb-3 text-right font-normal">
                        State
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line/70">
                    {platforms.map(([platform, arch, state]) => (
                      <tr key={platform} className="text-sm">
                        <th scope="row" className="py-3.5 font-normal text-bright">
                          {platform}
                        </th>
                        <td className="py-3.5 font-mono text-xs text-muted">{arch}</td>
                        <td className="py-3.5 text-right font-mono text-xs text-silver">{state}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Bezel>
          </Reveal>
        </div>
      </section>

      {/* ---- Availability ---- */}
      <section id="availability" className="relative z-10 px-6 py-16 sm:py-28">
        <div className="mx-auto w-full max-w-3xl">
          <Reveal>
            <Bezel>
              <div className="p-9 text-center sm:p-14">
                <div className="mx-auto flex justify-center">
                  <IconPuck name="package" size="lg" />
                </div>

                <h2 className="mt-7 text-[clamp(1.7rem,3.6vw,2.6rem)] font-light leading-[1.08] tracking-[-0.03em] text-bright">
                  There is no public build yet.
                </h2>
                <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-body">
                  Installers, checksums and release notes appear on the releases page when the
                  ecosystem reaches version 1.0 — and not before.
                </p>

                <div className="mt-9 flex flex-wrap justify-center gap-3">
                  <Cta href={veyna.releases} external icon="package">
                    Watch releases
                  </Cta>
                  <Cta href="/#contact" variant="ghost" icon="mail">
                    Get in touch
                  </Cta>
                </div>
              </div>
            </Bezel>
          </Reveal>
        </div>
      </section>
    </>
  );
}
