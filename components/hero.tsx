import { ArrowDownRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GitHubMark } from "@/components/icons";
import { GITHUB_URL, RESUME_URL } from "@/lib/projects";

const facts = [
  { label: "Public repositories", value: "14" },
  { label: "Featured systems", value: "05" },
  { label: "Primary stack", value: "Python / TS / C#" },
  { label: "Based in", value: "Pune, India" },
];

export function Hero() {
  return (
    <div className="mx-auto max-w-[88rem] px-6 md:px-10">
      <div className="flex items-center justify-between gap-6 border-b border-rule py-3.5">
        <p className="label flex items-center gap-2 text-ink">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-signal animate-dot"
          />
          Portfolio — 2026
        </p>
        <p className="label hidden sm:block">
          Machine learning · Interfaces · Data
        </p>
      </div>

      <div className="grid gap-10 pt-14 pb-16 md:grid-cols-12 md:gap-8 md:pt-24 md:pb-24">
        <div className="md:col-span-12 xl:col-span-8">
          <h1 className="animate-rise font-serif text-[clamp(2.6rem,7.4vw,6.1rem)] leading-[0.94] tracking-[-0.035em]">
            <span className="block">When the model works,</span>
            <span className="block">
              the work has <em className="text-accent">just begun</em>.
            </span>
          </h1>

          <p
            className="animate-rise mt-8 max-w-xl text-[1.0625rem] leading-7 text-ink-muted"
            style={{ animationDelay: "120ms" }}
          >
            I build learning systems end to end — the data path, the model, and
            the interface that puts it in someone&apos;s hands. Five of them are
            indexed below.
          </p>

          <div
            className="animate-rise mt-9 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "220ms" }}
          >
            <Button
              asChild
              className="h-11 rounded-none px-5 font-mono text-[0.6875rem] tracking-[0.14em] uppercase"
            >
              <a href="#work">
                See the work
                <ArrowDownRight data-icon="inline-end" className="size-3.5" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-none border-ink/25 bg-transparent px-5 font-mono text-[0.6875rem] tracking-[0.14em] uppercase transition-colors hover:bg-ink hover:text-paper"
            >
              <a href={GITHUB_URL} target="_blank" rel="noreferrer noopener">
                <GitHubMark data-icon="inline-start" className="size-3.5" />
                GitHub
              </a>
            </Button>
            <a
              href={RESUME_URL}
              download="Samarth-Rachcha-Resume.pdf"
              className="label ml-1 inline-flex items-center gap-2 text-ink-muted underline decoration-rule decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              <FileText aria-hidden="true" className="size-3" />
              Résumé — PDF
            </a>
          </div>
        </div>

        <aside
          className="animate-rise md:col-span-12 xl:col-span-3 xl:col-start-10"
          style={{ animationDelay: "320ms" }}
        >
          <p className="label mb-3">At a glance</p>
          <dl className="grid grid-cols-2 gap-px border-y border-rule bg-rule sm:grid-cols-4 xl:block xl:bg-transparent">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-col gap-1 bg-paper px-4 py-3 first:pl-0 last:pr-0 xl:flex-row xl:items-baseline xl:justify-between xl:gap-4 xl:border-b xl:border-rule xl:px-0 xl:py-3 xl:last:border-b-0"
              >
                <dt className="label text-ink-muted">{fact.label}</dt>
                <dd className="font-mono text-[0.72rem] tracking-tight text-ink xl:text-right">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
          <a
            href={`${GITHUB_URL}?tab=repositories`}
            target="_blank"
            rel="noreferrer noopener"
            className="label mt-4 inline-block text-ink-muted underline decoration-rule decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            Source of truth — GitHub
          </a>
        </aside>
      </div>
    </div>
  );
}
