import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { EMAIL } from "@/lib/projects";

export function About() {
  return (
    <Section id="about" title="About me">
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
    </Section>
  );
}
