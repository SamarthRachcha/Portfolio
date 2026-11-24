import { ArrowRight } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { principles } from "@/lib/projects";

const pipeline = [
  "extract_frames.py",
  "csrnet_model.py",
  "build_timeseries.py",
  "train_lstm.py",
  "FastAPI + Streamlit",
];

export function Approach() {
  return (
    <Section
      id="approach"
      index="02"
      label="Approach"
      title="Measured against something simple."
      note="The habit behind every project here: make the baseline visible before trusting the model, and leave the data path open."
    >
      <Reveal>
        <div className="border-y border-rule py-5">
          <p className="label mb-4">The crowd-density pipeline</p>
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
            {pipeline.map((step, index) => (
              <li key={step} className="flex items-center gap-2">
                <span className="border border-rule bg-paper-raised px-2.5 py-1.5 font-mono text-[0.65rem] tracking-[0.02em] text-ink">
                  {step}
                </span>
                {index < pipeline.length - 1 ? (
                  <ArrowRight
                    aria-hidden="true"
                    className="size-3 text-ink-muted/60"
                  />
                ) : null}
              </li>
            ))}
          </ol>
          <p className="mt-4 max-w-lg text-xs leading-5 text-ink-muted">
            Five stages, each a script you can run on its own. The forecast is
            only as good as the counts that feed it.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.08} className="mt-10">
        <div className="grid gap-px border border-rule bg-rule md:grid-cols-3">
          {principles.map((principle, index) => (
            <div key={principle.title} className="bg-paper p-6 md:p-8">
              <span className="label text-signal">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-serif text-[1.55rem] leading-tight tracking-[-0.01em]">
                {principle.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-ink-muted">
                {principle.body}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
