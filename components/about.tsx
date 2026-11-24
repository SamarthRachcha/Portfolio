import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { EMAIL } from "@/lib/projects";

const background = [
  {
    label: "Education",
    title: "B.Tech, Computer Science",
    lines: [
      "Artificial Intelligence & Data Science",
      "MIT World Peace University, Pune",
      "2021 — present",
    ],
  },
  {
    label: "Experience",
    title: "Game Developer Trainee",
    lines: ["Firebird VR", "February — May 2026", "Unity, C#"],
  },
  {
    label: "Recognition",
    title: "First Runner-Up",
    lines: [
      "iQOO Hackathon Pune 2026",
      "Working professionals category",
      "Grand finale participant",
    ],
  },
];

export function About() {
  return (
    <Section
      id="about"
      index="04"
      label="About"
      title="A short note on how I work."
    >
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-5">
          <p className="font-serif text-[clamp(1.7rem,2.9vw,2.4rem)] leading-[1.12] tracking-[-0.015em] text-balance">
            I learn a stack by shipping something with it.
          </p>
          <p className="label mt-8 text-ink-muted">Samarth Rachcha</p>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-4 inline-flex items-center gap-1.5 border-b border-ink/25 pb-1 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
          >
            {EMAIL}
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </a>
        </Reveal>

        <Reveal delay={0.08} className="md:col-span-6 md:col-start-7">
          <div className="space-y-5 text-[0.95rem] leading-7 text-ink-muted">
            <p>
              I&apos;m a computer science student in Pune, working where machine
              learning meets the browser. My projects usually start with a
              question I cannot answer from a tutorial — how do you count a
              crowd from a fixed camera, how do you build a digit classifier
              without a framework — and end with an API or a dashboard in front
              of them.
            </p>
            <p>
              I like the unglamorous middle: cleaning a 1.5-million-row reviews
              table, checking whether the LSTM actually beats a day-of-week
              average, keeping the dashboard alive when the model is slow to
              load. That work is most of the job, and it is the part I find
              interesting.
            </p>
            <p>
              Most recently I was a game developer trainee at Firebird VR,
              building in Unity and C#. The through-line across all of it is
              finishing: a baseline to compare against, a file someone else can
              re-run, and an interface that does not need a README to operate.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.12} className="mt-14 md:mt-16">
        <div className="grid gap-8 border-t border-ink pt-6 md:grid-cols-3 md:gap-10">
          {background.map((item) => (
            <div key={item.label}>
              <p className="label text-signal">{item.label}</p>
              <p className="mt-3 font-serif text-xl leading-tight tracking-[-0.01em]">
                {item.title}
              </p>
              <div className="mt-2 space-y-0.5 text-sm leading-6 text-ink-muted">
                {item.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
