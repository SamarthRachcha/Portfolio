"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Plus } from "lucide-react";
import { projects } from "@/lib/projects";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function WorkIndex() {
  const [open, setOpen] = useState<string | null>(null);
  const reduce = useReducedMotion();

  return (
    <Reveal>
      <ol className="border-t border-rule">
        {projects.map((project, index) => {
          const isOpen = open === project.slug;
          const triggerId = `work-trigger-${project.slug}`;
          const panelId = `work-panel-${project.slug}`;
          const repoName = project.repo.replace("https://github.com/", "");

          return (
            <li key={project.slug} className="border-b border-rule">
              <h3>
                <button
                  id={triggerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : project.slug)}
                  className="group grid w-full grid-cols-[2rem_1fr_auto] items-baseline gap-x-3 gap-y-2 py-6 text-left md:grid-cols-12 md:gap-x-6 md:py-8"
                >
                  <span
                    aria-hidden="true"
                    className="col-start-1 row-start-1 font-mono text-[0.6875rem] tracking-[0.14em] text-signal"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="col-start-2 row-start-1 font-serif text-[1.65rem] leading-[1.05] tracking-[-0.02em] transition-colors duration-300 group-hover:text-accent sm:text-3xl md:col-span-6 md:col-start-2 md:text-[2.5rem]">
                    {project.title}
                  </span>

                  <span className="col-start-2 row-start-2 max-w-sm text-sm leading-6 text-ink-muted md:col-span-3 md:col-start-8 md:row-start-1">
                    {project.summary}
                  </span>

                  <span className="col-start-3 row-start-1 flex items-center gap-4 md:col-span-2 md:col-start-11">
                    <span className="label hidden sm:block">{project.year}</span>
                    <span
                      aria-hidden="true"
                      className="flex size-6 items-center justify-center border border-rule text-ink-muted transition-colors duration-300 group-hover:border-ink group-hover:text-ink md:size-7"
                    >
                      <Plus
                        className={cn(
                          "size-3 transition-transform duration-300",
                          isOpen && "rotate-45",
                        )}
                      />
                    </span>
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key="panel"
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduce ? undefined : { height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.3 },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-8 pb-9 md:grid-cols-12 md:gap-6 md:pb-11">
                      <ul className="space-y-3 md:col-span-6 md:col-start-2">
                        {project.details.map((detail) => (
                          <li
                            key={detail}
                            className="flex gap-3 text-sm leading-6 text-ink-muted"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2.5 h-px w-3 shrink-0 bg-signal"
                            />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="md:col-span-4 md:col-start-9">
                        <p className="label">Built with</p>
                        <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1.5 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-ink-muted">
                          {project.stack.map((item, itemIndex) => (
                            <li key={item} className="flex items-center gap-2">
                              <span>{item}</span>
                              {itemIndex < project.stack.length - 1 ? (
                                <span aria-hidden="true" className="text-rule">
                                  /
                                </span>
                              ) : null}
                            </li>
                          ))}
                        </ul>

                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="group/repo label mt-6 inline-flex items-center gap-2 border-b border-ink/25 pb-1.5 text-ink transition-colors hover:border-accent hover:text-accent"
                        >
                          <span className="normal-case tracking-[0.04em]">
                            {repoName}
                          </span>
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-3 transition-transform duration-300 group-hover/repo:-translate-y-0.5 group-hover/repo:translate-x-0.5"
                          />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
    </Reveal>
  );
}
