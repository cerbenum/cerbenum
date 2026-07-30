import { Bezel, Chip } from '@/components/ui/Bezel';
import { Cta } from '@/components/ui/Cta';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Icon, IconPuck } from '@/components/ui/Icon';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { Tilt3D } from '@/components/ui/Tilt3D';
import { stack, traits, veyna } from '@/data/veyna';

/** Home spotlight — the headline facts only, with the brief a click away. */
export function VeynaSpotlight() {
  return (
    <section id="veyna" className="relative z-10 px-6 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <Bezel className="overflow-hidden">
            <div className="relative">
              {/* Scan line reads as an active system rather than a static card. */}
              <span
                aria-hidden
                className="animate-scan pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-white/[0.045] to-transparent"
              />

              <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
                <div>
                  <Eyebrow icon="shield">Current operation</Eyebrow>

                  <h2 className="mt-6 text-[clamp(2.6rem,6.5vw,4.6rem)] font-light leading-[0.94] tracking-[-0.04em] text-chrome">
                    {veyna.name}
                  </h2>

                  <p className="mt-5 max-w-md text-base leading-relaxed text-body">{veyna.lede}</p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {veyna.state.map(([label, value]) => (
                      <Chip key={label}>
                        <span className="text-muted">{label}</span>
                        <span className="text-bright">{value}</span>
                      </Chip>
                    ))}
                  </div>

                  <div className="mt-9 flex flex-wrap gap-3">
                    <Cta href="/veyna/">Read the brief</Cta>
                    <Cta href={veyna.releases} variant="ghost" external icon="package">
                      Releases
                    </Cta>
                  </div>
                </div>

                {/* Three stacked plates, offset in depth. */}
                <ul className="depth-3d flex flex-col justify-center gap-3">
                  {stack.map((layer, index) => (
                    <li
                      key={layer.layer}
                      className="edge flex items-center gap-4 rounded-2xl bg-raised/85 p-4 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:translate-x-1"
                      style={{ transform: `translateZ(${(2 - index) * 14}px)` }}
                    >
                      <IconPuck name={layer.icon} size="sm" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm tracking-tight text-bright">{layer.layer}</p>
                        <p className="mt-0.5 truncate text-xs text-muted">{layer.note}</p>
                      </div>
                      <span className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] text-muted sm:block">
                        {layer.role}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Bezel>
        </Reveal>

        <Stagger className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {traits.slice(0, 3).map((trait) => (
            <StaggerItem key={trait.title}>
              <Tilt3D max={5}>
                <Bezel interactive className="h-full">
                  <div className="flex h-full items-start gap-4 p-6">
                    <IconPuck name={trait.icon} size="sm" />
                    <div>
                      <h3 className="text-[0.95rem] tracking-tight text-bright">{trait.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{trait.note}</p>
                    </div>
                  </div>
                </Bezel>
              </Tilt3D>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.06} className="mt-6">
          <p className="flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
            <Icon name="plus" className="h-3 w-3" strokeWidth={1.5} />
            three more capabilities on the brief
          </p>
        </Reveal>
      </div>
    </section>
  );
}
