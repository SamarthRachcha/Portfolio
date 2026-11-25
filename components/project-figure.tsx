"use client";

import { useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

const mono = "var(--font-geist-mono), ui-monospace, monospace";
const sans = "var(--font-instrument-sans), ui-sans-serif, sans-serif";

const labelStyle: CSSProperties = {
  fontFamily: mono,
  fontSize: 12,
  letterSpacing: "0.1em",
};

const smallStyle: CSSProperties = {
  fontFamily: mono,
  fontSize: 10,
  letterSpacing: "0.08em",
};

function Arrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g stroke="var(--ink)" strokeWidth="1">
      <line x1={x1} y1={y} x2={x2 - 6} y2={y} />
      <path
        d={`M ${x2 - 6},${y - 4} L ${x2},${y} L ${x2 - 6},${y + 4}`}
        fill="none"
      />
    </g>
  );
}

/* ---------------------------------------------------------------- crowd -- */

const frames: number[][][] = [
  [
    [12, 9],
    [26, 15],
    [41, 8],
    [17, 22],
    [35, 24],
  ],
  [
    [10, 12],
    [22, 8],
    [34, 16],
    [46, 10],
    [16, 23],
    [29, 25],
    [42, 22],
  ],
  [
    [8, 16],
    [19, 10],
    [30, 18],
    [41, 12],
    [48, 22],
    [14, 25],
    [25, 23],
    [37, 26],
  ],
];

const density = Array.from({ length: 36 }, (_, index) => {
  const col = index % 9;
  const row = Math.floor(index / 9);
  const dist = (cx: number, cy: number) =>
    Math.hypot(col - cx, row - cy);
  const value =
    Math.exp(-(dist(3, 1.3) ** 2) / 2.4) +
    0.8 * Math.exp(-(dist(6.4, 2.4) ** 2) / 1.5) +
    0.55 * Math.exp(-(dist(1.1, 2.9) ** 2) / 1.1);
  return Math.min(1, value / 1.4);
});

const observed: [number, number][] = [
  [306, 92],
  [326, 86],
  [346, 90],
  [366, 78],
  [386, 82],
  [406, 66],
  [426, 70],
  [446, 54],
  [466, 50],
];

const forecast: [number, number][] = [
  [466, 50],
  [486, 44],
  [506, 36],
  [526, 40],
  [546, 30],
  [566, 34],
  [586, 26],
  [606, 30],
  [626, 22],
  [646, 26],
  [666, 20],
  [686, 24],
  [706, 18],
];

const bandPath = [
  ...forecast.map(([x, y]) => `${x},${y - 7}`),
  ...[...forecast].reverse().map(([x, y]) => `${x},${y + 7}`),
].reduce((path, point, index) => `${path}${index === 0 ? "M" : "L"} ${point} `, "");

function CrowdArt() {
  return (
    <svg
      viewBox="0 0 720 180"
      role="img"
      aria-labelledby="fig-crowd-title fig-crowd-desc"
      className="block h-auto w-full"
    >
      <title id="fig-crowd-title">
        Crowd pipeline: CCTV frames, density map, forecast
      </title>
      <desc id="fig-crowd-desc">
        Three CCTV frames feed a density map, which becomes a count series and
        an LSTM forecast with a flagged alert.
      </desc>

      {frames.map((dots, frameIndex) => {
        const y = 8 + frameIndex * 36;
        return (
          <g key={frameIndex}>
            <rect
              x="0"
              y={y}
              width="56"
              height="30"
              fill="var(--paper)"
              stroke="var(--rule)"
            />
            {frameIndex === 2 ? (
              <ellipse
                cx="30"
                cy="17"
                rx="22"
                ry="9"
                fill="var(--accent)"
                opacity="0.16"
              />
            ) : null}
            {dots.map(([cx, cy], dotIndex) => (
              <circle
                key={dotIndex}
                cx={cx}
                cy={y + cy - 4}
                r="1.6"
                fill="var(--ink)"
                opacity="0.72"
              />
            ))}
          </g>
        );
      })}

      <Arrow x1={64} x2={86} y={61} />

      <g>
        {density.map((value, index) => {
          const col = index % 9;
          const row = Math.floor(index / 9);
          return (
            <rect
              key={index}
              x={92 + col * 20}
              y={8 + row * 25}
              width="20"
              height="25"
              fill="var(--accent)"
              fillOpacity={0.06 + value * 0.82}
              stroke="var(--rule)"
              strokeWidth="0.5"
            />
          );
        })}
      </g>

      <Arrow x1={278} x2={300} y={58} />

      <line
        x1="306"
        y1="104"
        x2="716"
        y2="104"
        stroke="var(--rule)"
        strokeWidth="1"
      />
      <path d={bandPath} fill="var(--accent)" opacity="0.12" />
      <polyline
        points={observed.map(([x, y]) => `${x},${y}`).join(" ")}
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1.6"
      />
      <polyline
        points={forecast.map(([x, y]) => `${x},${y}`).join(" ")}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.6"
        strokeDasharray="5 4"
      />
      <line
        x1="686"
        y1="27"
        x2="686"
        y2="104"
        stroke="var(--signal)"
        strokeWidth="1"
        strokeDasharray="2 4"
      />
      <circle
        cx="686"
        cy="18"
        r="9"
        fill="none"
        stroke="var(--signal)"
        opacity="0.35"
      />
      <circle cx="686" cy="18" r="3" fill="var(--signal)" />

      <text x="0" y="146" style={labelStyle} fill="var(--ink-muted)">
        FRAMES
      </text>
      <text x="92" y="146" style={labelStyle} fill="var(--ink-muted)">
        DENSITY
      </text>
      <text x="306" y="146" style={labelStyle} fill="var(--ink-muted)">
        FORECAST
      </text>
      <text
        x="716"
        y="168"
        style={smallStyle}
        fill="var(--ink-muted)"
        textAnchor="end"
      >
        1080P → CSRNet → LSTM
      </text>
    </svg>
  );
}

/* ---------------------------------------------------------------- agent -- */

const tools = [
  { y: 8, label: "compound interest" },
  { y: 48, label: "portfolio allocation" },
  { y: 88, label: "retirement projection" },
];

function AgentArt() {
  return (
    <svg
      viewBox="0 0 720 180"
      role="img"
      aria-labelledby="fig-agent-title fig-agent-desc"
      className="block h-auto w-full"
    >
      <title id="fig-agent-title">
        Financial advisor: orchestrator and calculator tools
      </title>
      <desc id="fig-agent-desc">
        A chat request enters an orchestrator, which routes to three Python
        calculators; their results become the answer.
      </desc>

      <g>
        <rect
          x="0"
          y="42"
          width="92"
          height="52"
          fill="var(--paper)"
          stroke="var(--rule)"
        />
        {[0, 1, 2].map((line) => (
          <line
            key={line}
            x1="12"
            y1={58 + line * 12}
            x2={line === 2 ? 56 : 80}
            y2={58 + line * 12}
            stroke="var(--ink)"
            strokeOpacity="0.3"
            strokeWidth="1.5"
          />
        ))}
      </g>

      <Arrow x1={100} x2={122} y={68} />

      <g>
        <rect
          x="130"
          y="30"
          width="120"
          height="76"
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth="1.3"
        />
        <text
          x="190"
          y="64"
          style={labelStyle}
          fill="var(--ink)"
          textAnchor="middle"
        >
          ORCHESTRATOR
        </text>
        <text
          x="190"
          y="82"
          style={smallStyle}
          fill="var(--ink-muted)"
          textAnchor="middle"
        >
          LANGCHAIN
        </text>
      </g>

      {tools.map((tool) => {
        const center = tool.y + 16;
        return (
          <g key={tool.label}>
            <path
              d={`M 250 68 H 276 V ${center} H 294`}
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1"
            />
            <path
              d={`M 294,${center - 4} L 300,${center} L 294,${center + 4}`}
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1"
            />
            <rect
              x="300"
              y={tool.y}
              width="170"
              height="32"
              fill="var(--paper)"
              stroke="var(--rule)"
            />
            <text
              x="312"
              y={center + 4}
              style={{ fontFamily: sans, fontSize: 13 }}
              fill="var(--ink)"
            >
              {tool.label}
            </text>
          </g>
        );
      })}

      {tools.map((tool) => {
        const center = tool.y + 16;
        return (
          <g key={`out-${tool.label}`}>
            <line
              x1="470"
              y1={center}
              x2="510"
              y2={center}
              stroke="var(--ink)"
              strokeWidth="1"
            />
            <path
              d={`M 510,${center - 4} L 516,${center} L 510,${center + 4}`}
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1"
            />
          </g>
        );
      })}

      <g>
        <rect
          x="520"
          y="28"
          width="196"
          height="80"
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth="1.3"
        />
        {[24, 38, 18].map((height, index) => (
          <rect
            key={index}
            x={544 + index * 44}
            y={92 - height}
            width="26"
            height={height}
            fill={index === 0 ? "var(--accent)" : "var(--ink)"}
            fillOpacity={index === 0 ? 1 : 0.18}
          />
        ))}
        <line
          x1="536"
          y1="92"
          x2="700"
          y2="92"
          stroke="var(--rule)"
          strokeWidth="1"
        />
      </g>

      <text
        x="0"
        y="146"
        style={smallStyle}
        fill="var(--ink-muted)"
      >
        THE MODEL EXPLAINS; PYTHON CALCULATES
      </text>
      <text
        x="716"
        y="146"
        style={smallStyle}
        fill="var(--ink-muted)"
        textAnchor="end"
      >
        ONE /ASK ENDPOINT
      </text>
    </svg>
  );
}

/* ---------------------------------------------------------- recommender -- */

const reviewCells = Array.from({ length: 84 }, (_, index) => {
  const col = index % 12;
  const row = Math.floor(index / 12);
  const filled = (col * 7 + row * 5) % 11 < 4;
  const weight = ((col * 3 + row * 7) % 5) / 4;
  return { filled, weight };
});

const factorCells = (count: number) =>
  Array.from({ length: count }, (_, index) => {
    const weight = ((index * 5 + 3) % 7) / 6;
    return 0.25 + weight * 0.7;
  });

const userFactors = factorCells(28);
const itemFactors = factorCells(28);

const ranked = [
  { score: "0.91", width: 196 },
  { score: "0.84", width: 172 },
  { score: "0.77", width: 148 },
  { score: "0.69", width: 124 },
  { score: "0.58", width: 96 },
];

function RecommenderArt() {
  return (
    <svg
      viewBox="0 0 720 180"
      role="img"
      aria-labelledby="fig-rec-title fig-rec-desc"
      className="block h-auto w-full"
    >
      <title id="fig-rec-title">
        Recommender: sparse review matrix, ALS factors, ranked list
      </title>
      <desc id="fig-rec-desc">
        A sparse review matrix is factored into user and item matrices, which
        produce a ranked recommendation list.
      </desc>

      <g>
        {reviewCells.map((cell, index) => {
          const col = index % 12;
          const row = Math.floor(index / 12);
          return (
            <rect
              key={index}
              x={col * 12}
              y={14 + row * 12}
              width="11"
              height="11"
              fill={cell.filled ? "var(--accent)" : "transparent"}
              fillOpacity={cell.filled ? 0.25 + cell.weight * 0.65 : 0}
              stroke="var(--rule)"
              strokeWidth="0.6"
            />
          );
        })}
      </g>

      <Arrow x1={152} x2={170} y={56} />

      <g>
        {userFactors.map((weight, index) => {
          const col = index % 4;
          const row = Math.floor(index / 4);
          return (
            <rect
              key={index}
              x={180 + col * 12}
              y={14 + row * 12}
              width="11"
              height="11"
              fill="var(--ink)"
              fillOpacity={weight}
            />
          );
        })}
      </g>

      <text
        x="240"
        y="66"
        style={{ fontFamily: mono, fontSize: 20 }}
        fill="var(--ink-muted)"
        textAnchor="middle"
      >
        ×
      </text>

      <g>
        {itemFactors.map((weight, index) => {
          const col = index % 7;
          const row = Math.floor(index / 7);
          return (
            <rect
              key={index}
              x={252 + col * 12}
              y={38 + row * 12}
              width="11"
              height="11"
              fill="var(--ink)"
              fillOpacity={weight}
            />
          );
        })}
      </g>

      <Arrow x1={344} x2={362} y={56} />

      <g>
        {ranked.map((row, index) => {
          const y = 24 + index * 20;
          return (
            <g key={row.score}>
              <text
                x="372"
                y={y + 8}
                style={smallStyle}
                fill="var(--ink-muted)"
              >
                {index + 1}
              </text>
              <rect
                x="390"
                y={y}
                width={row.width}
                height="10"
                fill={index === 0 ? "var(--accent)" : "var(--ink)"}
                fillOpacity={index === 0 ? 1 : 0.2}
              />
              <text
                x="716"
                y={y + 9}
                style={smallStyle}
                fill={index === 0 ? "var(--accent)" : "var(--ink-muted)"}
                textAnchor="end"
              >
                {row.score}
              </text>
            </g>
          );
        })}
      </g>

      <text x="0" y="140" style={smallStyle} fill="var(--ink-muted)">
        1.5M REVIEWS · 80/20 SPLIT
      </text>
      <text
        x="716"
        y="140"
        style={smallStyle}
        fill="var(--ink-muted)"
        textAnchor="end"
      >
        ALS · RMSE 0.55
      </text>
    </svg>
  );
}

/* ---------------------------------------------------------------- digit -- */

const digit = [
  "..............",
  "...########...",
  "...########...",
  ".........#....",
  "........#.....",
  "........#.....",
  ".......#......",
  ".......#......",
  "......#.......",
  "......#.......",
  ".....#........",
  ".....#........",
  "....#.........",
  "....#.........",
];

const logits = [26, 14, 40, 22, 18, 34, 28, 72, 20, 30];

const inputDots = Array.from({ length: 10 }, (_, i) => 22 + i * 10);
const hiddenDots = Array.from({ length: 8 }, (_, i) => 27 + i * 11);
const outputDots = inputDots;

function DigitArt() {
  return (
    <svg
      viewBox="0 0 720 180"
      role="img"
      aria-labelledby="fig-digit-title fig-digit-desc"
      className="block h-auto w-full"
    >
      <title id="fig-digit-title">
        Digit classifier: pixel grid, two-layer network, logits
      </title>
      <desc id="fig-digit-desc">
        A 28 by 28 digit is flattened to 784 inputs, passed through a 40-neuron
        hidden layer and scored by ten output logits.
      </desc>

      <g>
        {digit.map((row, rowIndex) =>
          row.split("").map((cell, colIndex) => (
            <rect
              key={`${rowIndex}-${colIndex}`}
              x={colIndex * 6.5}
              y={16 + rowIndex * 6.5}
              width="6.5"
              height="6.5"
              fill={cell === "#" ? "var(--ink)" : "transparent"}
              stroke="var(--rule)"
              strokeWidth="0.4"
            />
          )),
        )}
      </g>

      <Arrow x1={100} x2={116} y={61} />

      <g stroke="var(--ink)" strokeWidth="0.7" strokeOpacity="0.16">
        {inputDots.map((y, index) =>
          [-1, 0, 1].map((offset) => {
            const target =
              hiddenDots[Math.min(7, Math.max(0, Math.round(index * 0.78) + offset))];
            return (
              <line
                key={`${index}-${offset}`}
                x1="124"
                y1={y}
                x2="208"
                y2={target}
              />
            );
          }),
        )}
      </g>
      <g stroke="var(--ink)" strokeWidth="0.7" strokeOpacity="0.16">
        {hiddenDots.map((y, index) =>
          [-1, 0, 1].map((offset) => {
            const target =
              outputDots[Math.min(9, Math.max(0, Math.round(index * 1.28) + offset))];
            return (
              <line
                key={`${index}-${offset}`}
                x1="208"
                y1={y}
                x2="292"
                y2={target}
              />
            );
          }),
        )}
      </g>
      <line
        x1="208"
        y1={hiddenDots[3]}
        x2="292"
        y2={outputDots[7]}
        stroke="var(--accent)"
        strokeWidth="1.4"
      />

      {inputDots.map((y) => (
        <circle key={`in-${y}`} cx="124" cy={y} r="2" fill="var(--ink)" />
      ))}
      {hiddenDots.map((y) => (
        <circle key={`h-${y}`} cx="208" cy={y} r="2" fill="var(--ink)" />
      ))}
      {outputDots.map((y) => (
        <circle key={`o-${y}`} cx="292" cy={y} r="2" fill="var(--ink)" />
      ))}

      <text x="124" y="12" style={smallStyle} fill="var(--ink-muted)" textAnchor="middle">
        784
      </text>
      <text x="208" y="12" style={smallStyle} fill="var(--ink-muted)" textAnchor="middle">
        40
      </text>
      <text x="292" y="12" style={smallStyle} fill="var(--ink-muted)" textAnchor="middle">
        10
      </text>

      <Arrow x1={306} x2={322} y={61} />

      <g>
        {logits.map((height, index) => (
          <g key={index}>
            <rect
              x={336 + index * 38}
              y={100 - height}
              width="26"
              height={height}
              fill={index === 7 ? "var(--accent)" : "var(--ink)"}
              fillOpacity={index === 7 ? 1 : 0.18}
            />
            <text
              x={349 + index * 38}
              y="116"
              style={smallStyle}
              fill={index === 7 ? "var(--accent)" : "var(--ink-muted)"}
              textAnchor="middle"
            >
              {index}
            </text>
          </g>
        ))}
        <line
          x1="330"
          y1="100"
          x2="716"
          y2="100"
          stroke="var(--rule)"
          strokeWidth="1"
        />
      </g>

      <text x="0" y="146" style={smallStyle} fill="var(--ink-muted)">
        28 × 28 · SMOTE-BALANCED
      </text>
      <text
        x="716"
        y="146"
        style={smallStyle}
        fill="var(--ink-muted)"
        textAnchor="end"
      >
        NUMPY FORWARD + BACKWARD
      </text>
    </svg>
  );
}

/* ---------------------------------------------------------------- habit -- */

const makeRandom = (seed: number) => {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
};

const habitRandom = makeRandom(41);

const habitCells = Array.from({ length: 140 }, (_, index) => {
  const col = Math.floor(index / 7);
  const density = col < 4 ? 0.4 : col < 10 ? 0.85 : col < 13 ? 0.2 : 0.9;
  const roll = habitRandom();
  return roll > density ? 0 : 0.22 + roll * 0.7;
});

function HabitArt() {
  return (
    <svg
      viewBox="0 0 720 180"
      role="img"
      aria-labelledby="fig-habit-title fig-habit-desc"
      className="block h-auto w-full"
    >
      <title id="fig-habit-title">
        Habit tracker: day grid, toggles and streak
      </title>
      <desc id="fig-habit-desc">
        A seven-row grid of daily check-ins, with an enlarged day toggle and a
        streak counter beside it.
      </desc>

      <g>
        {habitCells.map((opacity, index) => {
          const col = Math.floor(index / 7);
          const row = index % 7;
          return (
            <rect
              key={index}
              x={col * 14}
              y={12 + row * 14}
              width="10"
              height="10"
              fill="var(--accent)"
              fillOpacity={opacity}
              stroke={opacity === 0 ? "var(--rule)" : "transparent"}
              strokeWidth="0.8"
            />
          );
        })}
      </g>

      <line
        x1="318"
        y1="12"
        x2="318"
        y2="110"
        stroke="var(--rule)"
        strokeWidth="1"
      />

      <g>
        <text
          x="346"
          y="72"
          style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif" }}
          fontSize="62"
          fill="var(--ink)"
        >
          12
        </text>
        <text x="348" y="94" style={smallStyle} fill="var(--ink-muted)">
          DAY STREAK
        </text>
      </g>

      <g>
        {[0, 1, 2].map((index) => (
          <g key={index}>
            <rect
              x={500 + index * 36}
              y="30"
              width="26"
              height="26"
              fill={index === 2 ? "transparent" : "var(--accent)"}
              fillOpacity={index === 2 ? 0 : 0.14}
              stroke={index === 2 ? "var(--rule)" : "var(--accent)"}
              strokeWidth="1"
            />
            {index < 2 ? (
              <path
                d={`M ${506 + index * 36} 43 L ${511 + index * 36} 49 L ${520 + index * 36} 37`}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.6"
              />
            ) : null}
          </g>
        ))}
        <text x="500" y="76" style={smallStyle} fill="var(--ink-muted)">
          DAY TOGGLE
        </text>
        <text x="500" y="92" style={smallStyle} fill="var(--ink-muted)">
          DATE-FNS · SAME DAY
        </text>
        <text x="500" y="114" style={smallStyle} fill="var(--ink-muted)">
          LESS
        </text>
        {[0.16, 0.36, 0.6, 0.9].map((opacity, index) => (
          <rect
            key={opacity}
            x={534 + index * 12}
            y="105"
            width="8"
            height="8"
            fill="var(--accent)"
            fillOpacity={opacity}
          />
        ))}
        <text x="586" y="114" style={smallStyle} fill="var(--ink-muted)">
          MORE
        </text>
      </g>

      <text x="0" y="146" style={smallStyle} fill="var(--ink-muted)">
        DAILY CHECK-INS · 20 WEEKS
      </text>
      <text
        x="716"
        y="146"
        style={smallStyle}
        fill="var(--ink-muted)"
        textAnchor="end"
      >
        TYPED STATE · NO STORE
      </text>
    </svg>
  );
}

/* --------------------------------------------------------------- plates -- */

type Plate = { meta: string; caption: string; art: ReactNode };

const plates: Record<string, Plate> = {
  "crowd-density-advisor": {
    meta: "frames → density → forecast",
    caption:
      "The path the project actually runs: sampled frames become density maps, counts become an hourly series, and the LSTM extends it. The red mark is a crowd alert.",
    art: <CrowdArt />,
  },
  "financial-advisor": {
    meta: "orchestrator → tools",
    caption:
      "The model routes the question and writes the explanation; the numbers come from plain Python functions behind it.",
    art: <AgentArt />,
  },
  "beverage-recommender": {
    meta: "matrix → factors → rank",
    caption:
      "A sparse review matrix is factored into user and item matrices; their product ranks what to recommend next.",
    art: <RecommenderArt />,
  },
  "digit-recognition": {
    meta: "784 → 40 → 10",
    caption:
      "A 28 × 28 image flattened to 784 inputs, one 40-neuron hidden layer, ten output scores. Every weight update is written out by hand.",
    art: <DigitArt />,
  },
  "habit-tracker": {
    meta: "grid → toggle → streak",
    caption:
      "Check-ins per day, a typed toggle per cell, and day comparisons done with date-fns rather than string keys.",
    art: <HabitArt />,
  },
};

export function ProjectFigure({
  slug,
  index,
}: {
  slug: string;
  index: number;
}) {
  const plate = plates[slug];
  const scrollRef = useRef<HTMLDivElement>(null);
  if (!plate) return null;

  return (
    <figure className="border border-rule bg-paper-raised/40">
      <div className="flex items-center justify-between gap-4 border-b border-rule/70 px-4 py-2.5 sm:px-5">
        <span className="label text-ink">
          Fig. {String(index + 2).padStart(2, "0")} — Schematic
        </span>
        <span className="label text-ink-muted sm:hidden">Scroll →</span>
        <span className="label hidden text-ink-muted sm:block">
          {plate.meta}
        </span>
      </div>
      <div
        ref={scrollRef}
        role="group"
        aria-label="Schematic diagram, scroll horizontally for the full width"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
          event.preventDefault();
          scrollRef.current?.scrollBy({
            left: event.key === "ArrowRight" ? 140 : -140,
            behavior: "auto",
          });
        }}
        className="scroll-x overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
      >
        <div className="min-w-[520px] px-4 py-5 sm:px-6">{plate.art}</div>
      </div>
      <figcaption className="flex flex-col gap-1 border-t border-rule/70 px-4 py-3 text-xs leading-5 text-ink-muted sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:px-5">
        <span className="max-w-xl">{plate.caption}</span>
        <span className="shrink-0 font-mono text-[0.625rem] tracking-[0.08em] uppercase">
          Diagram, not a screenshot
        </span>
      </figcaption>
    </figure>
  );
}
