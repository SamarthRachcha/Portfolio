import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  index: string;
  label: string;
  title: string;
  note?: string;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  index,
  label,
  title,
  note,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("border-t border-rule", className)}
    >
      <div className="mx-auto max-w-[88rem] px-6 md:px-10">
        <div className="grid gap-4 py-10 md:grid-cols-12 md:gap-8 md:py-14">
          <div className="flex items-baseline gap-3 md:col-span-3">
            <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-signal">
              {index}
            </span>
            <h2 className="label text-ink-muted">{label}</h2>
          </div>
          <div className="md:col-span-9">
            <p className="max-w-3xl font-serif text-[clamp(1.9rem,3.6vw,3.15rem)] leading-[1.04] tracking-[-0.02em] text-balance">
              {title}
            </p>
            {note ? (
              <p className="mt-4 max-w-md text-sm leading-6 text-ink-muted">
                {note}
              </p>
            ) : null}
          </div>
        </div>
        <div className="pb-20 md:pb-28">{children}</div>
      </div>
    </section>
  );
}
