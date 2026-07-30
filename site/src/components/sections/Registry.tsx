import { projects, repoUrl, statusLabel, type Project } from '@/data/projects';
import { Bezel, Chip } from '@/components/ui/Bezel';
import { Cta } from '@/components/ui/Cta';
import { SectionHeading } from '@/components/ui/Eyebrow';
import { Icon, IconPuck } from '@/components/ui/Icon';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { Tilt3D } from '@/components/ui/Tilt3D';

const dot: Record<Project['status'], string> = {
  development: 'bg-bright animate-pulse-slow',
  reserved: 'bg-muted',
  released: 'bg-bright',
  archived: 'bg-line',
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Tilt3D max={5}>
      <Bezel interactive className="h-full">
        <article className="flex h-full flex-col p-7 sm:p-8">
          <header className="flex items-start justify-between gap-4">
            <IconPuck name={project.icon} />
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${dot[project.status]}`} />
              {statusLabel[project.status]}
            </span>
          </header>

          <h3 className="mt-6 text-lg tracking-[-0.02em] text-bright sm:text-xl">{project.name}</h3>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-silver">
            {project.role}
          </p>

          <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>

          <ul className="mt-6 flex flex-wrap gap-1.5">
            {project.stack.map((item) => (
              <li key={item}>
                <Chip>{item}</Chip>
              </li>
            ))}
          </ul>

          {project.repo ? (
            <a
              href={repoUrl(project.repo)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 border-t border-line/70 pt-5 font-mono text-[11px] text-silver transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-bright"
            >
              <Icon name="github" className="h-3.5 w-3.5" strokeWidth={1.3} />
              cerbenum/{project.repo}
              <Icon name="arrow" className="h-3 w-3" strokeWidth={1.5} />
            </a>
          ) : null}
        </article>
      </Bezel>
    </Tilt3D>
  );
}

/** Full registry, used on the systems page. */
export function RegistryGrid() {
  return (
    <Stagger className="grid gap-4 sm:grid-cols-2">
      {projects.map((project) => (
        <StaggerItem key={project.id}>
          <ProjectCard project={project} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Compact home strip: name, role and state only. */
export function RegistryStrip() {
  return (
    <section id="systems" className="relative z-10 px-6 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <SectionHeading
              eyebrow="Registry"
              eyebrowIcon="cube"
              title={
                <>
                  Every component,
                  <span className="block text-muted">accounted for.</span>
                </>
              }
            />
          </Reveal>
          <Reveal delay={0.08}>
            <Cta href="/systems/" variant="ghost" icon="cube">
              Open the registry
            </Cta>
          </Reveal>
        </div>

        <Reveal delay={0.05} className="mt-12">
          <Bezel>
            <ul className="divide-y divide-line/70">
              {projects.map((project) => (
                <li key={project.id}>
                  <a
                    href={project.repo ? repoUrl(project.repo) : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/row flex items-center gap-4 px-5 py-4 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/[0.03] sm:gap-6 sm:px-7 sm:py-5"
                  >
                    <Icon name={project.icon} className="h-4 w-4 shrink-0 text-muted" strokeWidth={1.3} />
                    <span className="w-40 shrink-0 truncate text-sm tracking-tight text-bright sm:w-48">
                      {project.name}
                    </span>
                    <span className="hidden flex-1 truncate font-mono text-[11px] uppercase tracking-[0.16em] text-muted sm:block">
                      {project.role}
                    </span>
                    <span className="ml-auto inline-flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${dot[project.status]}`} />
                      <span className="hidden sm:inline">{statusLabel[project.status]}</span>
                    </span>
                    <Icon
                      name="arrow"
                      className="h-3.5 w-3.5 shrink-0 text-muted transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 group-hover/row:text-bright"
                      strokeWidth={1.4}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Bezel>
        </Reveal>
      </div>
    </section>
  );
}
