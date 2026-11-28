import { ArrowRight } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { principles } from "@/lib/projects";

const pipelines = [
  {
    project: "Crowd Density Advisor",
    steps: [
      "extract_frames.py",
      "csrnet_model.py",
      "build_timeseries.py",
      "train_lstm.py",
      "FastAPI + Streamlit",
    ],
  },
  {
    project: "Beverage Recommender",
    steps: [
      "1.5M reviews",
      "clean + 80/20",
      "ALS factors",
      "RMSE 0.55",
      "ranked list",
    ],
  },
  {
    project: "Digit Recognition from Scratch",
    steps: [
      "MNIST arrays",
      "SMOTE balance",
      "forward pass",
      "backprop",
      "confusion matrix",
    ],
  },
  {
    project: "Text Generation with LSTMs",
    steps: [
      "news corpus",
      "tokenise",
      "10-word windows",
      "LSTM × 2",
      "top-k sample",
    ],
  },
  {
    project: "Twitter Bot Detection",
    steps: [
      "tweet text",
      "TF-IDF",
      "+ metadata",
      "random forest",
      "bot / human",
    ],
  },
  {
    project: "MobileNetV2 Inference",
    steps: ["image", "resize 224", "preprocess", "MobileNetV2", "top-5 decode"],
  },
];

export function Approach() {
  return (
    <Section id="approach" title="Approach">
      <Reveal>
        <div className="border-y border-rule">
          <div className="py-5">
            <p className="label">Project pipelines</p>
            <p className="mt-3 max-w-xl text-xs leading-5 text-ink-muted">
              Read left to right: raw input, the transforms, and the result.
              Every stage is something you can inspect and re-run.
            </p>
          </div>

          {pipelines.map((pipeline) => (
            <div
              key={pipeline.project}
              className="grid gap-3 border-t border-rule py-5 md:grid-cols-12 md:items-center md:gap-6"
            >
              <h3 className="font-serif text-[1.05rem] leading-snug tracking-[-0.01em] md:col-span-3">
                {pipeline.project}
              </h3>
              <ol
                aria-label={`${pipeline.project} pipeline`}
                className="flex flex-wrap items-center gap-x-2 gap-y-2 md:col-span-9"
              >
                {pipeline.steps.map((step, index) => (
                  <li key={step} className="flex items-center gap-2">
                    <span className="border border-rule bg-paper-raised px-2.5 py-1.5 font-mono text-[0.65rem] tracking-[0.02em] text-ink">
                      {step}
                    </span>
                    {index < pipeline.steps.length - 1 ? (
                      <ArrowRight
                        aria-hidden="true"
                        className="size-3 text-ink-muted/60"
                      />
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>
          ))}
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
