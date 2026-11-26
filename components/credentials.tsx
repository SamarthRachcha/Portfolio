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

export function Credentials() {
  return (
    <div className="border-t border-rule bg-paper-raised/40">
      <div className="mx-auto max-w-[88rem] px-6 py-8 md:px-10 md:py-10">
        <dl className="grid gap-8 md:grid-cols-3 md:gap-10">
          {background.map((item) => (
            <div key={item.label}>
              <dt className="label text-signal">{item.label}</dt>
              <dd className="mt-2.5 font-serif text-xl leading-tight tracking-[-0.01em]">
                {item.title}
              </dd>
              <dd className="mt-1.5 space-y-0.5 text-sm leading-6 text-ink-muted">
                {item.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
