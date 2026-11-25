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
- Signal: `#CE3F1D` (vermilion, used for errors and index numbers)
- Rule: `#C6CABB`
- Display type: Instrument Serif
- Body type: Instrument Sans
- Data/year type: Geist Mono, used sparingly
- Layout: 12-column, asymmetric, hairline rules, generous whitespace
- Hero visual: hand-authored SVG decision boundary with scattered points and
  three deliberately misclassified ones.

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
| Habit Tracker | `Habit-Tracker` | React + TypeScript + Vite + date-fns, typed component boundaries |

### Archive

Text generation with LSTMs (`Text_Generation_AI`), Twitter bot detection
(`NLP-Project`), MobileNetV2 inference (`Deep-Learning-Project`), to-do list
(`To-Do-List`), PC parts storefront (`Website`).

Years come from the résumé where it gives one, otherwise from the repository's
creation date. `Machine-Learning-Project` duplicates the digit-recognition work
and is not listed; `Calculator`, `DEC`, and `config` are coursework or scratch
repos and are not listed.

### Remaining gaps (need your input)

- Live demos or screenshots for the featured projects (no repo has a homepage
  URL or committed image)
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
  decision-boundary.tsx   SVG hero figure
  smooth-scroll.tsx       client Lenis provider
  reveal.tsx              client Motion reveal wrapper
  site-header.tsx         sticky header + scroll progress
  hero.tsx
  work-index.tsx          expandable project rows
  archive-index.tsx       compact repository table
  approach.tsx            pipeline strip + principles
  toolbox.tsx
  about.tsx               bio + education/experience/recognition
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
