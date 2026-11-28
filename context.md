# Portfolio — project context

Living context file for this repository. Update it when the stack, content, or
design decisions change.

## What this is

A single-page portfolio for **Samarth Rachcha**, built from his public work at
<https://github.com/SamarthRachcha> plus the résumé he supplied on 2026-11-24.
The site leads with machine-learning projects, then shows the pipelines and
interfaces around them.

- Working directory: `/home/sam/sam/webdev/Portfolio`
- Scaffolded: 2026-11-24
- Package manager: pnpm
- Deployment: not configured yet

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16.4.6 (App Router, Turbopack, `cacheComponents`) |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS 4.3 (`@tailwindcss/turbopack`) |
| Components | shadcn/ui 4.x — `radix-nova` preset, Radix primitives, `cn` package |
| Icons | lucide-react (brand icons are custom SVG) |
| Motion | Motion 14 (`motion/react`) |
| Smooth scroll | Lenis 1.3 (`lenis/react`, root instance + `anchors: true`) |

## Design notes

Working concept: **an engineer's lab index** — not a SaaS card grid and not the
default cream/terracotta editorial look.

- Background: `#E9EBE4` (sage paper)
- Ink: `#14170F`
- Accent: `#2A35E8` (ultramarine)
- Signal: `#B33617` (vermilion, used for errors and index numbers)
- Rule: `#C6CABB`
- Display type: Instrument Serif
- Body type: Instrument Sans
- Data/year type: Geist Mono, used sparingly
- Dark theme: same world, not a grey inversion. Paper `#12140D`, raised
  `#191C12`, ink `#E7E9E0`, muted `#9BA192`, rule `#343A2B`, accent lifted to
  `#7B84FF`, signal to `#E4694A`. The contact block inverts with it (`bg-ink
  text-paper`), so it stays a contrasting "printed insert" rather than merging
  into the page.
- Theme switch: `.dark` on `<html>`, a pre-paint inline script in
  `app/layout.tsx` (no flash), OS preference by default, explicit choice stored
  in `localStorage`. `components/theme-toggle.tsx` reads the class through
  `useSyncExternalStore` and swaps sun/moon in CSS, so hydration stays clean.
  `@custom-variant dark` maps Tailwind's `dark:` utilities to the class. Print
  forces the light palette.
- Layout: 12-column, asymmetric, hairline rules, generous whitespace
- Hero band: education, experience, and recognition sit directly under the hero
  as a three-column ruled strip (`components/credentials.tsx`), not in About.
- Project visuals: one hand-authored SVG schematic per featured project, inside
  its expanded row (`components/project-figure.tsx`). Numbered `Fig. 01`–`Fig.
  05` in work order. Each plate states "Diagram, not a screenshot" and is
  labelled as a schematic, so nothing implies a real capture.
  On narrow screens the plate keeps a 520px minimum width and scrolls
  horizontally (with a `Scroll →` hint and a styled thin scrollbar).

Motion is limited to one page-load sequence, quiet scroll reveals, the header
scroll-progress line, and the expandable work rows. `prefers-reduced-motion`
disables animation (CSS and Lenis), and a `<noscript>` rule keeps revealed
content visible without JavaScript.

## Content

### Profile (from résumé)

- Email: `samarth.rachcha@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/samarth-r-38782b196/`
- Location: Pune, Maharashtra, India (UTC+5:30)
- Education: B.Tech CSE, Artificial Intelligence & Data Science, MIT World
  Peace University, Pune, 2021 – present
- Experience: Game Developer Trainee, Firebird VR, Feb – May 2026 (Unity, C#)
- Recognition: First Runner-Up, iQOO Hackathon Pune 2026 (working professionals
  category); grand-finale participant

The résumé's phone number is deliberately **not** published on the site. Ask
before adding it or the résumé PDF itself to `public/`.

### Featured work

| Project | Repository | What it actually is |
| --- | --- | --- |
| Crowd Density Advisor | `Capstone-project` | 1080p CCTV pipeline, CSRNet + VGG-16, LSTM forecast, MAE 2.361 / RMSE 3.432, ~40% over baseline, 15.8 FPS on T4, FastAPI + Streamlit |
| Financial Advisor Agent | `AgenticAI` | Flask + LangChain + Gemini, deterministic finance calculators, NewsAPI context; part of a broader agentic platform |
| Beverage Recommender | `Big-Data-Project` | PySpark ALS on 1.5M reviews, 80/20 split, RMSE 0.55 |
| Digit Recognition from Scratch | `HandwrittenDigitRecognition` | NumPy two-layer network, manual backprop, SMOTE, scikit-learn evaluation |
| Text Generation with LSTMs | `Text_Generation_AI` | TensorFlow/Keras, two 128-unit LSTM layers, 10-word windows, 1M-character news corpus, top-k sampling |
| Twitter Bot Detection | `NLP-Project` | TF-IDF over tweet text and profile fields, hstacked with account metadata, random forest, 80/20 split |
| MobileNetV2 Inference | `Deep-Learning-Project` | Pre-trained Keras MobileNetV2, 224 × 224 input, single forward pass, top-5 ImageNet decode |

### Archive

Habit tracker (`Habit-Tracker`), to-do list (`To-Do-List`), PC parts storefront
(`Website`).

Years come from the résumé where it gives one, otherwise from the repository's
creation date. `Machine-Learning-Project` duplicates the digit-recognition work
and is not listed; `Calculator`, `DEC`, and `config` are coursework or scratch
repos and are not listed.

### Remaining gaps (need your input)

- Live demos: no featured repo has a deployed URL. `Project.demo` is already
  wired in `lib/projects.ts`; set it and a "Live demo" link appears in the row.
- Deployment target/domain for `metadataBase` and OG images
- Whether the Firebird VR role should have a longer write-up

### Résumé PDF

`public/samarth-rachcha-resume.pdf` is built from the LaTeX source in
`~/Downloads/Samarth_Rachcha_Resume.tex` with the phone number removed. The
`mailto:` link in the header is fixed up in that copy; everything else is
unchanged. Rebuild after editing the source:

```bash
cp ~/Downloads/Samarth_Rachcha_Resume.tex /tmp/resume-build/
# delete the "7755929201 $|$" line, compile twice with pdflatex
cp /tmp/resume-build/Samarth_Rachcha_Resume.pdf public/samarth-rachcha-resume.pdf
```

## Architecture

```text
app/
  layout.tsx              fonts, metadata, no-JS fallback
  page.tsx                section composition
  globals.css             design tokens, base styles, motion keyframes
components/
  credentials.tsx         education / experience / recognition band
  smooth-scroll.tsx       client Lenis provider
  reveal.tsx              client Motion reveal wrapper
  site-header.tsx         sticky header + scroll progress
  theme-toggle.tsx        light/dark switch, reads the .dark class
  hero.tsx
  work-index.tsx          expandable project rows
  project-figure.tsx      one SVG schematic per featured project
  archive-index.tsx       compact repository table
  approach.tsx            pipeline strip + principles
  toolbox.tsx
  about.tsx               bio note + email
  contact.tsx             email, GitHub, LinkedIn, résumé
  site-footer.tsx
  section.tsx             shared section shell
  ui/                     shadcn components
lib/
  projects.ts             project + archive + toolbox data, links
  utils.ts                cn re-export
```

## Commands

```bash
pnpm dev      # local dev server
pnpm build    # production build
pnpm lint     # ESLint
```

## Tooling notes

- Next.js 16 changed conventions. Version-matched docs live in
  `node_modules/next/dist/docs/`; read the relevant guide before changing
  framework behaviour. Turbopack is the default for dev and build.
- The shadcn `radix-nova` preset imports `cn` from the `cn` package (a compiled
  clsx + tailwind-merge replacement), not `@/lib/utils`. `lib/utils.ts`
  re-exports it so new components can follow either convention.
- Context7 MCP is configured. Motion and Lenis API details in this build were
  checked against Context7 (`/motiondivision/motion`,
  `/darkroomengineering/lenis`).
- Superpowers skills were used for the process. UI/UX Pro Max and
  frontend-design informed the visual system; their default purple/Inter
  recommendation was deliberately not followed.
- Playwright MCP was used for responsive checks at 390 / 768 / 1440 px.
