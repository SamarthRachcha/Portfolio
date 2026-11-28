# Samarth Rachcha — portfolio

A single-page portfolio built from my public repositories and résumé.
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
  credentials.tsx         education / experience / recognition band
  smooth-scroll.tsx       Lenis root provider
  reveal.tsx              Motion scroll reveal
  site-header.tsx         sticky header + scroll progress
  hero.tsx
  work-index.tsx          expandable featured-project rows
  archive-index.tsx       compact repository list
  approach.tsx            pipeline strips + principles
  toolbox.tsx
  about.tsx               bio note + email
  contact.tsx
  site-footer.tsx
  section.tsx             shared section shell
  ui/                     shadcn components
lib/
  projects.ts             all portfolio copy and links
  utils.ts                cn re-export
```

All copy lives in `lib/projects.ts` and the section components; there is no CMS.
