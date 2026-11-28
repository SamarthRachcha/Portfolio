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

/* ------------------------------------------------------------- text gen -- */

const contextWords = [
  "the",
  "panel",
  "said",
  "it",
  "may",
  "vote",
  "on",
  "the",
  "plan",
  "soon",
];

const nextWords = [
  { word: "vote", probability: 0.34 },
  { word: "next", probability: 0.21 },
  { word: "week", probability: 0.16 },
  { word: "meeting", probability: 0.09 },
  { word: "election", probability: 0.05 },
];

function TextGenArt() {
  return (
    <svg
      viewBox="0 0 720 180"
      role="img"
      aria-labelledby="fig-text-title fig-text-desc"
      className="block h-auto w-full"
    >
      <title id="fig-text-title">
        Text generation: ten-word context, stacked LSTMs, next-word probabilities
      </title>
      <desc id="fig-text-desc">
        Ten context words feed two 128-unit LSTM layers, which score every
        candidate next word; the model samples from the most likely ones.
      </desc>

      <text x="0" y="12" style={smallStyle} fill="var(--ink-muted)">
        CONTEXT
      </text>
      <text x="196" y="12" style={smallStyle} fill="var(--ink-muted)">
        LSTM
      </text>
      <text x="352" y="12" style={smallStyle} fill="var(--ink-muted)">
        NEXT WORD
      </text>

      {contextWords.map((word, index) => {
        const col = index % 5;
        const row = Math.floor(index / 5);
        return (
          <g key={`${word}-${index}`}>
            <rect
              x={col * 32}
              y={24 + row * 28}
              width="28"
              height="20"
              fill="var(--paper)"
              stroke="var(--rule)"
            />
            <text
              x={col * 32 + 14}
              y={37 + row * 28}
              style={{ fontFamily: mono, fontSize: 8 }}
              fill="var(--ink)"
              textAnchor="middle"
            >
              {word}
            </text>
          </g>
        );
      })}

      <Arrow x1={164} x2={188} y={62} />

      <g>
        <rect
          x="196"
          y="26"
          width="112"
          height="32"
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth="1.2"
        />
        <rect
          x="196"
          y="62"
          width="112"
          height="32"
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth="1.2"
        />
        <line
          x1="252"
          y1="58"
          x2="252"
          y2="62"
          stroke="var(--ink)"
          strokeWidth="1"
        />
        <path
          d="M 248,62 L 252,66 L 256,62"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1"
        />
        <text
          x="252"
          y="46"
          style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.08em" }}
          fill="var(--ink)"
          textAnchor="middle"
        >
          128
        </text>
        <text
          x="252"
          y="82"
          style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.08em" }}
          fill="var(--ink)"
          textAnchor="middle"
        >
          128
        </text>
      </g>

      <Arrow x1={316} x2={340} y={60} />

      <g>
        {nextWords.map((candidate, index) => {
          const y = 24 + index * 20;
          const width = candidate.probability * 680;
          return (
            <g key={candidate.word}>
              <text
                x="352"
                y={y + 8}
                style={{ fontFamily: sans, fontSize: 11 }}
                fill={index === 0 ? "var(--ink)" : "var(--ink-muted)"}
              >
                {candidate.word}
              </text>
              <rect
                x="430"
                y={y + 1}
                width={width}
                height="7"
                fill={index === 0 ? "var(--accent)" : "var(--ink)"}
                fillOpacity={index === 0 ? 1 : 0.18}
              />
              <text
                x="716"
                y={y + 8}
                style={smallStyle}
                fill={index === 0 ? "var(--accent)" : "var(--ink-muted)"}
                textAnchor="end"
              >
                {candidate.probability.toFixed(2)}
              </text>
            </g>
          );
        })}
      </g>

      <text x="0" y="150" style={smallStyle} fill="var(--ink-muted)">
        1M CHARACTERS · NEWS CORPUS
      </text>
      <text
        x="716"
        y="150"
        style={smallStyle}
        fill="var(--ink-muted)"
        textAnchor="end"
      >
        SOFTMAX · TOP-K SAMPLING
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ bot -- */

const termCells = Array.from({ length: 50 }, (_, index) => {
  const col = index % 10;
  const row = Math.floor(index / 10);
  const active = (col * 7 + row * 3) % 9 < 3;
  const weight = ((col * 5 + row * 7) % 6) / 5;
  return { active, weight };
});

const botTrees = [398, 448, 498];

function BotArt() {
  return (
    <svg
      viewBox="0 0 720 180"
      role="img"
      aria-labelledby="fig-bot-title fig-bot-desc"
      className="block h-auto w-full"
    >
      <title id="fig-bot-title">
        Bot detection: tweet text, TF-IDF and metadata features, random forest
      </title>
      <desc id="fig-bot-desc">
        A tweet becomes a TF-IDF vector, is combined with follower, retweet and
        verification features, and is classified by a random forest.
      </desc>

      <text x="0" y="12" style={smallStyle} fill="var(--ink-muted)">
        TWEET
      </text>
      <text x="146" y="12" style={smallStyle} fill="var(--ink-muted)">
        TF-IDF
      </text>
      <text x="262" y="12" style={smallStyle} fill="var(--ink-muted)">
        METADATA
      </text>
      <text x="398" y="12" style={smallStyle} fill="var(--ink-muted)">
        FOREST
      </text>
      <text x="552" y="12" style={smallStyle} fill="var(--ink-muted)">
        LABEL
      </text>

      <g>
        <rect
          x="0"
          y="24"
          width="112"
          height="76"
          fill="var(--paper)"
          stroke="var(--rule)"
        />
        <circle cx="17" cy="40" r="6" fill="var(--ink)" opacity="0.28" />
        <line x1="30" y1="36" x2="100" y2="36" stroke="var(--ink)" strokeOpacity="0.35" strokeWidth="2" />
        <line x1="30" y1="44" x2="86" y2="44" stroke="var(--ink)" strokeOpacity="0.2" strokeWidth="2" />
        <line x1="10" y1="62" x2="102" y2="62" stroke="var(--ink)" strokeOpacity="0.35" strokeWidth="2" />
        <line x1="10" y1="72" x2="94" y2="72" stroke="var(--ink)" strokeOpacity="0.35" strokeWidth="2" />
        <line x1="10" y1="82" x2="62" y2="82" stroke="var(--ink)" strokeOpacity="0.2" strokeWidth="2" />
      </g>

      <Arrow x1={120} x2={140} y={62} />

      <g>
        {termCells.map((cell, index) => {
          const col = index % 10;
          const row = Math.floor(index / 10);
          return (
            <rect
              key={index}
              x={146 + col * 9.5}
              y={28 + row * 9.5}
              width="8"
              height="8"
              fill={cell.active ? "var(--accent)" : "transparent"}
              fillOpacity={cell.active ? 0.3 + cell.weight * 0.65 : 0}
              stroke="var(--rule)"
              strokeWidth="0.6"
            />
          );
        })}
      </g>

      <text
        x="250"
        y="58"
        style={{ fontFamily: mono, fontSize: 16 }}
        fill="var(--ink-muted)"
        textAnchor="middle"
      >
        +
      </text>

      <g>
        {[
          { label: "followers", value: "2.2k" },
          { label: "retweets", value: "54" },
          { label: "verified", value: "1" },
        ].map((row, index) => (
          <g key={row.label}>
            <rect
              x="262"
              y={30 + index * 20}
              width="92"
              height="16"
              fill="var(--paper)"
              stroke="var(--rule)"
            />
            <text
              x="268"
              y={41 + index * 20}
              style={{ fontFamily: mono, fontSize: 7.5 }}
              fill="var(--ink-muted)"
            >
              {row.label}
            </text>
            <text
              x="348"
              y={41 + index * 20}
              style={{ fontFamily: mono, fontSize: 7.5 }}
              fill="var(--ink)"
              textAnchor="end"
            >
              {row.value}
            </text>
          </g>
        ))}
      </g>

      <Arrow x1={360} x2={380} y={58} />

      <g>
        {botTrees.map((cx) => (
          <g key={cx} stroke="var(--ink)" strokeWidth="1" fill="none">
            <line x1={cx} y1="32" x2={cx - 10} y2="58" />
            <line x1={cx} y1="32" x2={cx + 10} y2="58" />
            <line x1={cx - 10} y1="58" x2={cx - 16} y2="84" />
            <line x1={cx - 10} y1="58" x2={cx - 4} y2="84" />
            <line x1={cx + 10} y1="58" x2={cx + 4} y2="84" />
            <line x1={cx + 10} y1="58" x2={cx + 16} y2="84" />
            <circle cx={cx} cy="32" r="2.4" fill="var(--paper)" />
            <circle cx={cx - 10} cy="58" r="2.4" fill="var(--paper)" />
            <circle cx={cx + 10} cy="58" r="2.4" fill="var(--paper)" />
            <circle cx={cx - 16} cy="84" r="2.2" fill="var(--paper)" />
            <circle cx={cx - 4} cy="84" r="2.2" fill="var(--paper)" />
            <circle cx={cx + 4} cy="84" r="2.2" fill="var(--paper)" />
            <circle cx={cx + 16} cy="84" r="2.2" fill="var(--paper)" />
          </g>
        ))}
      </g>

      <Arrow x1={522} x2={542} y={58} />

      <g>
        <text
          x="552"
          y="60"
          style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif" }}
          fontSize="34"
          fill="var(--ink)"
        >
          BOT
        </text>
        <text
          x="552"
          y="82"
          style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.08em" }}
          fill="var(--accent)"
        >
          0.87
        </text>
        <rect x="552" y="90" width="140" height="4" fill="var(--ink)" fillOpacity="0.12" />
        <rect x="552" y="90" width="122" height="4" fill="var(--accent)" />
      </g>

      <text x="0" y="150" style={smallStyle} fill="var(--ink-muted)">
        TEXT + METADATA · 80/20 SPLIT
      </text>
      <text
        x="716"
        y="150"
        style={smallStyle}
        fill="var(--ink-muted)"
        textAnchor="end"
      >
        RANDOM FOREST
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------- mobilenet -- */

const convBlocks = [92, 78, 64, 50, 36, 24];

const softmaxBars = [14, 26, 52, 38, 20, 30, 44, 18, 24, 12];

const topFive = [
  { label: "golden retriever", score: 0.62 },
  { label: "Labrador retriever", score: 0.14 },
  { label: "cocker spaniel", score: 0.07 },
  { label: "vizsla", score: 0.04 },
  { label: "saluki", score: 0.02 },
];

function MobileNetArt() {
  return (
    <svg
      viewBox="0 0 720 180"
      role="img"
      aria-labelledby="fig-mobile-title fig-mobile-desc"
      className="block h-auto w-full"
    >
      <title id="fig-mobile-title">
        MobileNetV2: image input, convolutional blocks, top-5 predictions
      </title>
      <desc id="fig-mobile-desc">
        A 224 by 224 image passes through the pre-trained convolutional stack,
        becomes a softmax distribution over classes, and decodes to five labels.
      </desc>

      <text x="0" y="12" style={smallStyle} fill="var(--ink-muted)">
        INPUT
      </text>
      <text x="132" y="12" style={smallStyle} fill="var(--ink-muted)">
        CONVOLUTIONS
      </text>
      <text x="328" y="12" style={smallStyle} fill="var(--ink-muted)">
        SOFTMAX
      </text>
      <text x="496" y="12" style={smallStyle} fill="var(--ink-muted)">
        TOP-5
      </text>

      <g>
        <rect
          x="0"
          y="24"
          width="96"
          height="96"
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth="1.2"
        />
        <circle
          cx="30"
          cy="50"
          r="8"
          fill="none"
          stroke="var(--ink)"
          strokeOpacity="0.5"
        />
        <path
          d="M 8 106 L 36 68 L 56 90 L 70 74 L 88 106 Z"
          fill="var(--ink)"
          fillOpacity="0.12"
          stroke="var(--ink)"
          strokeOpacity="0.45"
        />
        <line
          x1="8"
          y1="106"
          x2="88"
          y2="106"
          stroke="var(--ink)"
          strokeOpacity="0.45"
        />
        <text
          x="48"
          y="134"
          style={smallStyle}
          fill="var(--ink-muted)"
          textAnchor="middle"
        >
          224 × 224
        </text>
      </g>

      <Arrow x1={104} x2={124} y={72} />

      <g>
        {convBlocks.map((height, index) => (
          <rect
            key={height}
            x={132 + index * 28}
            y={72 - height / 2}
            width="22"
            height={height}
            fill={index === convBlocks.length - 1 ? "var(--accent)" : "var(--ink)"}
            fillOpacity={index === convBlocks.length - 1 ? 0.9 : 0.1 + index * 0.06}
          />
        ))}
        <text
          x="202"
          y="134"
          style={smallStyle}
          fill="var(--ink-muted)"
          textAnchor="middle"
        >
          MOBILENETV2 · IMAGENET
        </text>
      </g>

      <Arrow x1={302} x2={322} y={72} />

      <g>
        {softmaxBars.map((height, index) => (
          <rect
            key={index}
            x={328 + index * 14}
            y={108 - height}
            width="9"
            height={height}
            fill={index === 2 ? "var(--accent)" : "var(--ink)"}
            fillOpacity={index === 2 ? 1 : 0.16}
          />
        ))}
        <line
          x1="322"
          y1="108"
          x2="466"
          y2="108"
          stroke="var(--rule)"
          strokeWidth="1"
        />
      </g>

      <Arrow x1={470} x2={490} y={72} />

      <g>
        {topFive.map((row, index) => {
          const y = 26 + index * 20;
          return (
            <g key={row.label}>
              <text
                x="496"
                y={y}
                style={{ fontFamily: sans, fontSize: 10 }}
                fill={index === 0 ? "var(--ink)" : "var(--ink-muted)"}
              >
                {row.label}
              </text>
              <text
                x="716"
                y={y}
                style={smallStyle}
                fill={index === 0 ? "var(--accent)" : "var(--ink-muted)"}
                textAnchor="end"
              >
                {row.score.toFixed(2)}
              </text>
              {index === 0 ? (
                <rect
                  x="496"
                  y={y + 4}
                  width={row.score * 200}
                  height="3"
                  fill="var(--accent)"
                />
              ) : null}
            </g>
          );
        })}
      </g>

      <text x="0" y="156" style={smallStyle} fill="var(--ink-muted)">
        PRE-TRAINED · NO TRAINING
      </text>
      <text
        x="716"
        y="156"
        style={smallStyle}
        fill="var(--ink-muted)"
        textAnchor="end"
      >
        TOP-5 DECODE
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
  "text-generation-lstm": {
    meta: "10 words → 2 × LSTM → next word",
    caption:
      "Ten words of context go through two 128-unit LSTM layers, which score every word in the vocabulary. The model samples from the top candidates rather than always taking the first.",
    art: <TextGenArt />,
  },
  "twitter-bot-detection": {
    meta: "text + metadata → forest",
    caption:
      "The tweet becomes a TF-IDF vector, then joins follower, retweet and verification counts. A random forest returns the label and its confidence.",
    art: <BotArt />,
  },
  "mobilenet-inference": {
    meta: "224 → conv stack → top-5",
    caption:
      "One forward pass through pre-trained MobileNetV2: the image is resized and preprocessed, the convolutional stack runs, and the scores decode to five ImageNet labels.",
    art: <MobileNetArt />,
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
          Fig. {String(index + 1).padStart(2, "0")} — Schematic
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
      <figcaption className="border-t border-rule/70 px-4 py-3 text-xs leading-5 text-ink-muted sm:px-5">
        <span className="max-w-xl">{plate.caption}</span>
      </figcaption>
    </figure>
  );
}
