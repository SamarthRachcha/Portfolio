import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { alsoInTheKit, toolbox } from "@/lib/projects";

export function Toolbox() {
  return (
    <Section id="toolbox" title="Tech Stack">
      <div className="grid gap-10 md:grid-cols-3 md:gap-8">
        {toolbox.map((group, index) => (
          <Reveal key={group.label} delay={index * 0.06}>
            <div className="border-t border-ink pb-2">
              <div className="flex items-baseline justify-between gap-4 pt-4">
                <h3 className="label text-ink">{group.label}</h3>
                <span className="font-mono text-[0.65rem] text-ink-muted">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </div>
              <ul className="mt-4">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="group flex items-center justify-between gap-4 border-b border-rule py-2.5 text-sm text-ink-muted transition-colors hover:text-ink"
                  >
                    <span>{item}</span>
                    <span
                      aria-hidden="true"
                      className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-4"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.18} className="mt-10">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-rule pt-4">
          <span className="label text-ink">Also in the kit</span>
          <span className="font-mono text-[0.7rem] tracking-[0.08em] uppercase text-ink-muted">
            {alsoInTheKit}
          </span>
        </div>
      </Reveal>
    </Section>
  );
}
