import type { CSSProperties } from "react";

type Point = [number, number];

const anchors: Point[] = [
  [0, 168],
  [140, 160],
  [260, 148],
  [360, 132],
  [470, 126],
  [560, 100],
  [660, 92],
  [760, 66],
  [880, 56],
  [1000, 38],
  [1200, 28],
];

function yAt(x: number) {
  for (let i = 0; i < anchors.length - 1; i += 1) {
    const [x0, y0] = anchors[i];
    const [x1, y1] = anchors[i + 1];
    if (x >= x0 && x <= x1) {
      const t = (x - x0) / (x1 - x0 || 1);
      return y0 + (y1 - y0) * t;
    }
  }
  return anchors[anchors.length - 1][1];
}

function smoothPath(points: Point[]) {
  let d = `M ${points[0][0]},${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`;
  }
  return d;
}

function makeRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

const random = makeRandom(19);

// Deliberately straddling the boundary so the errors are visible.
const errors: Point[] = [
  [412, 128],
  [604, 106],
  [806, 108],
];

const points = Array.from({ length: 44 }, (_, index) => {
  const x = 60 + random() * 1080;
  const boundary = yAt(x);
  const spread = (random() - 0.5) * 150;
  const y = Math.min(212, Math.max(14, boundary + spread));
  return {
    x,
    y,
    upper: y < boundary,
    delay: `${0.45 + random() * 1.2}s`,
    emphasis: index % 11 === 0,
  };
});

const boundaryPath = smoothPath(anchors);
const upperFill = `${boundaryPath} L 1200,0 L 0,0 Z`;
const lowerFill = `${boundaryPath} L 1200,240 L 0,240 Z`;

const legend = [
  { label: "Class A", className: "bg-ink" },
  { label: "Class B", className: "bg-accent" },
  { label: "Misclassified", className: "bg-signal" },
];

export function DecisionBoundary() {
  return (
    <figure className="border-t border-rule bg-paper-raised/50">
      <div className="mx-auto max-w-[88rem] px-6 md:px-10">
        <div className="flex items-center justify-between gap-4 border-b border-rule/70 py-3">
          <span className="label text-ink">Fig. 01 — Decision boundary</span>
          <span className="label hidden sm:block">
            n = 47 · 3 misclassified
          </span>
        </div>

        <svg
          viewBox="0 0 1200 240"
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-labelledby="boundary-title boundary-desc"
          className="h-[150px] w-full md:h-[260px]"
        >
          <title id="boundary-title">
            A two-class decision boundary with scattered points
          </title>
          <desc id="boundary-desc">
            A sloped curve separates dark class A points above from blue class B
            points below. Three red points sit on the wrong side of the line.
          </desc>
          <defs>
            <pattern
              id="dot-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="0.9" fill="var(--rule)" />
            </pattern>
          </defs>
          <rect width="1200" height="240" fill="url(#dot-grid)" />
          <path d={upperFill} fill="var(--ink)" opacity="0.04" />
          <path d={lowerFill} fill="var(--accent)" opacity="0.05" />

          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={point.emphasis ? 3.2 : 2.3}
              className={`${point.upper ? "fill-ink" : "fill-accent"} animate-dot`}
              style={{ animationDelay: point.delay }}
            />
          ))}

          {errors.map(([x, y], index) => (
            <g key={`error-${index}`}>
              <circle
                cx={x}
                cy={y}
                r="10"
                className="fill-none stroke-signal/30"
                strokeWidth="1"
              />
              <circle
                cx={x}
                cy={y}
                r="3.4"
                className="fill-signal animate-dot"
                style={{ animationDelay: `${0.9 + index * 0.12}s` }}
              />
            </g>
          ))}

          <path
            d={boundaryPath}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.7"
            className="animate-draw"
            style={{ "--dash": "1600" } as CSSProperties}
          />
        </svg>

        <figcaption className="flex flex-col gap-3 border-t border-rule/70 py-4 text-xs leading-5 text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <span className="max-w-md">
            Two classes, one boundary, and the three points it gets wrong.
          </span>
          <span className="flex flex-wrap items-center gap-4">
            {legend.map((item) => (
              <span key={item.label} className="flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className={`size-1.5 rounded-full ${item.className}`}
                />
                {item.label}
              </span>
            ))}
          </span>
        </figcaption>
      </div>
    </figure>
  );
}
