import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { GitHubMark } from "@/components/icons";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, RESUME_URL } from "@/lib/projects";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-ink text-paper"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(233,235,228,0.18) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-[88rem] px-6 md:px-10">
        <div className="flex items-center justify-between gap-4 border-b border-paper/15 py-3">
          <span className="label text-paper/60">05 — Contact</span>
          <span className="label hidden text-paper/60 sm:block">
            Pune, India · UTC +5:30
          </span>
        </div>

        <div className="grid gap-12 py-16 md:grid-cols-12 md:gap-8 md:py-24">
          <div className="md:col-span-8">
            <h2 className="font-serif text-[clamp(2.4rem,6vw,5.1rem)] leading-[0.97] tracking-[-0.03em]">
              Let&apos;s build the part{" "}
              <em className="text-paper/55">after</em> the notebook.
            </h2>
            <p className="mt-7 max-w-lg text-[0.95rem] leading-7 text-paper/65">
              If you want to talk about a model that needs a front door, or a
              pipeline that needs a dashboard, email is the fastest way to
              reach me. The code for everything on this page is public.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="group inline-flex items-center gap-2.5 bg-paper px-4 py-3.5 font-mono text-[0.65rem] tracking-[0.08em] text-ink uppercase transition-colors duration-300 hover:bg-accent hover:text-paper sm:px-5 sm:text-[0.7rem]"
              >
                <Mail aria-hidden="true" className="size-3.5 shrink-0" />
                {EMAIL}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-3.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>

              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2.5 border border-paper/25 px-4 py-3.5 font-mono text-[0.65rem] tracking-[0.1em] uppercase transition-colors duration-300 hover:border-paper hover:bg-paper hover:text-ink sm:text-[0.7rem]"
              >
                <GitHubMark aria-hidden="true" className="size-3.5" />
                GitHub
              </a>

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2.5 border border-paper/25 px-4 py-3.5 font-mono text-[0.65rem] tracking-[0.1em] uppercase transition-colors duration-300 hover:border-paper hover:bg-paper hover:text-ink sm:text-[0.7rem]"
              >
                LinkedIn
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </a>

              <a
                href={RESUME_URL}
                download="Samarth-Rachcha-Resume.pdf"
                className="inline-flex items-center gap-2.5 border border-paper/25 px-4 py-3.5 font-mono text-[0.65rem] tracking-[0.1em] uppercase transition-colors duration-300 hover:border-paper hover:bg-paper hover:text-ink sm:text-[0.7rem]"
              >
                <FileText aria-hidden="true" className="size-3.5" />
                Résumé (PDF)
              </a>
            </div>
          </div>

          <div className="flex items-end md:col-span-3 md:col-start-10">
            <div className="w-full border-t border-paper/15 pt-4">
              <p className="label text-paper/60">Elsewhere</p>
              <dl className="mt-3 space-y-2 text-sm leading-6 text-paper/60">
                <div>
                  <dt className="sr-only">Location</dt>
                  <dd>Pune, Maharashtra, India</dd>
                </div>
                <div>
                  <dt className="sr-only">Study</dt>
                  <dd>B.Tech CSE, AI &amp; Data Science</dd>
                </div>
                <div>
                  <dt className="sr-only">University</dt>
                  <dd>MIT World Peace University</dd>
                </div>
              </dl>
              <p className="mt-5 text-xs leading-5 text-paper/60">
                No live demos yet. The repositories are the record.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
