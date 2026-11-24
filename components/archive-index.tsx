import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { GITHUB_URL, archive } from "@/lib/projects";

export function ArchiveIndex() {
  return (
    <Reveal delay={0.06} className="mt-14 md:mt-16">
      <div className="flex items-baseline justify-between gap-4 border-b border-ink pb-3">
        <h3 className="label text-ink">Also in the archive</h3>
        <span className="label">
          {String(archive.length).padStart(2, "0")} repos
        </span>
      </div>

      <ul>
        {archive.map((item) => (
          <li key={item.repo} className="border-b border-rule">
            <a
              href={item.repo}
              target="_blank"
              rel="noreferrer noopener"
              className="group grid gap-1 py-4 md:grid-cols-12 md:items-baseline md:gap-6"
            >
              <span className="font-serif text-[1.1rem] leading-snug tracking-[-0.01em] transition-colors group-hover:text-accent md:col-span-4">
                {item.title}
              </span>
              <span className="text-sm leading-6 text-ink-muted md:col-span-6">
                {item.note}
              </span>
              <span className="flex items-center justify-between gap-3 md:col-span-2 md:justify-end">
                <span className="label text-ink-muted">{item.year}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-3.5 text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <a
          href={`${GITHUB_URL}?tab=repositories`}
          target="_blank"
          rel="noreferrer noopener"
          className="label inline-flex items-center gap-1.5 border-b border-ink/25 pb-1 text-ink transition-colors hover:border-accent hover:text-accent"
        >
          All fourteen repositories
          <ArrowUpRight aria-hidden="true" className="size-3" />
        </a>
        <span className="label text-ink-muted">Updated November 2026</span>
      </div>
    </Reveal>
  );
}
