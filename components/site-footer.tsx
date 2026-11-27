import { ArrowUp } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-[88rem] flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="label text-ink-muted">© 2026 Samarth Rachcha</p>
        <a
          href="#top"
          className="group label inline-flex items-center gap-2 text-ink transition-colors hover:text-accent"
        >
          Back to top
          <ArrowUp
            aria-hidden="true"
            className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </footer>
  );
}
