# Samarth Rachcha — portfolio

A single-page portfolio built from Samarth's public repositories and résumé.
The through-line is machine-learning systems taken all the way to an interface:
crowd forecasting, a financial-advisor agent, a recommender, a from-scratch
classifier, and the dashboards and APIs around them.

## Stack

- Next.js 16 (App Router, Turbopack, Cache Components)
- TypeScript
- Tailwind CSS 4
- shadcn/ui (`radix-nova` preset, Radix primitives)
- Motion (`motion/react`)
- Lenis (`lenis/react`)
- Lucide icons

No Three.js, no WebGL. The hero figure is hand-authored SVG.

## Run

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build
pnpm lint
```

## Structure

```text
app/
  layout.tsx              fonts, metadata, no-JS reveal fallback
  page.tsx                section composition
  globals.css             tokens, base styles, motion keyframes
components/
  decision-boundary.tsx   SVG hero figure
  smooth-scroll.tsx       Lenis root provider
  reveal.tsx              Motion scroll reveal
  site-header.tsx         sticky header + scroll progress
  hero.tsx
  work-index.tsx          expandable featured-project rows
  archive-index.tsx       compact repository list
  approach.tsx            pipeline strip + principles
  toolbox.tsx
  about.tsx               bio + education/experience/recognition
  contact.tsx
  site-footer.tsx
  section.tsx             shared section shell
  ui/                     shadcn components
lib/
  projects.ts             all portfolio copy and links
  utils.ts                cn re-export
```

All copy lives in `lib/projects.ts` and the section components; there is no CMS.

## Content sources

- Repositories: <https://github.com/SamarthRachcha>
- Résumé supplied by Samarth (education, experience, project metrics,
  recognition), November 2026

The résumé's phone number is intentionally **not** published. Email, LinkedIn,
and GitHub are the public contact points.

## Design notes

Editorial "lab index" direction: sage paper, near-black ink, ultramarine accent,
vermilion signals, Instrument Serif display type, Instrument Sans body, Geist
Mono metadata. Hairline rules and a 12-column asymmetric grid instead of cards.

Motion is limited to one page-load sequence, scroll reveals, the header progress
line, and the expandable work rows. `prefers-reduced-motion` is honoured by both
CSS and Lenis, and a `<noscript>` fallback keeps revealed content visible.
