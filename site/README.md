<div align="center">

<img src="assets/brand/cerbenum-banner.png" width="100%" alt="Cerbenum Collective">

# Cerbenum — site

`SECURE SYSTEMS • PRIVATE INFRASTRUCTURE • PROTOCOL ENGINEERING`

</div>

---

Source for the public Cerbenum site.

A statically exported Next.js application with a WebGL backdrop: the chevron mark is
extruded from the brand geometry at runtime, lit by an in-scene studio rig, and docked
along a scroll-linked track over an animated particle field and node network.

**Live:** <https://cerbenum.github.io/cerbenum/>

---

## `STACK`

```text
framework     Next.js (App Router, static export)
language      TypeScript
styling       Tailwind CSS
3D            three.js · React Three Fiber · drei
motion        Framer Motion
hosting       GitHub Pages (gh-pages branch of this repository)
```

No runtime, no database, no third-party analytics, no external asset host. Everything the
page loads is served from this repository.

---

## `LAYOUT`

```text
assets/brand/          brand sources the generator reads
public/                static output (icons, social card, manifest inputs)
scripts/
  build-assets.mjs     rasterises icons and the social card from brand geometry
  deploy.mjs           builds and publishes the export to the gh-pages branch
src/
  app/                 routes, metadata, sitemap, robots, manifest
  components/
    sections/          page sections
    three/             WebGL scene
    ui/                design-system primitives (Icon, Bezel, Tilt3D, Cta …)
  data/                copy, capability matrix, project registry, Veyna facts
  lib/                 chevron geometry, scroll sampling, structured data
```

Routes: `/` · `/capabilities/` · `/veyna/` · `/systems/` · `/doctrine/`

---

## `DEVELOP`

```bash
cd site
npm install
npm run assets     # regenerate icons and the social card
npm run dev        # http://localhost:3000/cerbenum/
```

Checks:

```bash
npm run typecheck
npm run build      # static export into out/
```

---

## `CONTRAST BUDGET`

Text tokens are fixed by contrast, not by taste. Measured on `--color-base` (`#0e0f13`):

```text
--color-muted   #99a1ad    6.1:1    smallest text allowed
--color-body    #c6cdd7   11.0:1    body copy
--color-bright  #f5f7fa   17.0:1    headings
--color-line    #2e323b     ---     borders only, never text
```

Anything dimmer than `--color-muted` is decoration and must not carry text.

---

## `ADDING A PROJECT`

The registry, the home strip and the structured data all read from one list. Append an
entry to `src/data/projects.ts`:

```ts
{
  id: 'example',
  name: 'Example',
  repo: 'Example',
  ecosystem: 'VEYNA',
  role: 'Transport relay',
  icon: 'network',
  summary: 'One or two sentences.',
  status: 'development',
  source: 'closed',
  stack: ['Rust', 'Linux'],
}
```

Nothing else needs to change.

---

## `DEPLOY`

```bash
npm run deploy
```

Builds the export and force-pushes it to the `gh-pages` branch, which GitHub Pages
serves. `main` holds the source and the profile README; the branches never mix.

### Attaching a domain

Set `NEXT_PUBLIC_BASE_PATH=""` at build time, add a `CNAME` file to `public/`, then point
the domain at GitHub Pages. Every canonical URL, the sitemap and the structured data
derive from that one variable.

---

## `LICENSE`

Source is published under the MIT License. The Cerbenum name, chevron mark, wordmark and
the brand assets under `assets/brand/` and `public/brand/` are **not** covered by it and
remain the property of Cerbenum Collective.

---

<div align="center">
<sub>Built below the surface.</sub>
</div>
