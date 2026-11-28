import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { CopyDiscord } from "@/components/copy-discord";
import { GitHubMark, LinkedInMark } from "@/components/icons";
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
            "radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--paper) 18%, transparent) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-[88rem] px-6 md:px-10">
        <div className="border-b border-paper/15 py-3">
          <span className="label text-paper/60">Contact</span>
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

            <div className="mt-10 flex flex-wrap items-center gap-2.5">
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
                <LinkedInMark aria-hidden="true" className="size-3.5 shrink-0" />
                LinkedIn
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </a>

              <CopyDiscord />

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
        </div>
      </div>
    </section>
  );
}
