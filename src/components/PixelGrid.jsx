import { useId } from "react";
export default function PixelGrid({
  trace,
  step,
  circle = false,
  hero = false,
  octants = false,
  center = { x: 8, y: 7 },
  radius = 5,
}) {
  const id = useId().replaceAll(":", "");
  const size = 24,
    offset = 28;
  const px = (x) => offset + x * size + size / 2;
  const py = (y) => offset + (14 - y) * size + size / 2;
  const start = trace[0];
  const end = trace[trace.length - 1];
  const drawn = new Map();
  trace
    .slice(0, step + 1)
    .forEach((frame, i) =>
      frame.points.forEach((p) =>
        drawn.set(`${p.x},${p.y}`, { ...p, current: i === step }),
      ),
    );
  return (
    <svg
      className={`pixel-grid ${hero ? "hero-grid" : ""}`}
      viewBox="0 0 464 414"
      role="img"
      aria-label={`${circle ? "Circunferencia" : "Línea"} rasterizada, paso ${step + 1} de ${trace.length}`}
    >
      <defs>
        <pattern
          id={`grid${id}`}
          x={offset}
          y={offset}
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M24 0H0V24"
            fill="none"
            stroke="currentColor"
            strokeWidth=".65"
          />
        </pattern>
        <radialGradient id={`glow${id}`}>
          <stop stopColor="var(--accent)" stopOpacity=".08" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="464" height="414" fill={`url(#glow${id})`} />
      <rect
        x={offset}
        y={offset}
        width="408"
        height="360"
        fill={`url(#grid${id})`}
        className="grid-lines"
      />
      {[0, 2, 4, 6, 8, 10, 12, 14, 16].map((n) => (
        <text
          key={`x${n}`}
          x={px(n)}
          y="407"
          textAnchor="middle"
          className="axis-label"
        >
          {n}
        </text>
      ))}
      {[0, 2, 4, 6, 8, 10, 12, 14].map((n) => (
        <text
          key={`y${n}`}
          x="15"
          y={py(n) + 3}
          textAnchor="middle"
          className="axis-label"
        >
          {n}
        </text>
      ))}
      {circle ? (
        <>
          <circle
            cx={px(center.x)}
            cy={py(center.y)}
            r={radius * size}
            className="ideal-line"
          />
          {octants &&
            [0, 45, 90, 135].map((a) => (
              <line
                key={a}
                x1={px(center.x) - radius * size}
                y1={py(center.y)}
                x2={px(center.x) + radius * size}
                y2={py(center.y)}
                transform={`rotate(${a} ${px(center.x)} ${py(center.y)})`}
                className="octant-line"
              />
            ))}
        </>
      ) : (
        <line
          x1={px(start.x)}
          y1={py(start.y)}
          x2={px(end.x)}
          y2={py(end.y)}
          className="ideal-line"
        />
      )}
      {[...drawn.values()].map((p) => (
        <rect
          key={`${p.x},${p.y}`}
          x={px(p.x) - 10}
          y={py(p.y) - 10}
          width="20"
          height="20"
          rx="2"
          className={`pixel ${p.current ? "current" : ""}`}
        />
      ))}
      {!circle && (
        <>
          <circle cx={px(start.x)} cy={py(start.y)} r="3" fill="#101411" />
          <circle cx={px(end.x)} cy={py(end.y)} r="3" fill="var(--accent)" />
          <text
            x={Math.max(28, Math.min(365, px(start.x) - 6))}
            y={Math.max(18, py(start.y) - 23)}
            className="point-label"
          >
            A ({start.x}, {start.y})
          </text>
          <text
            x={Math.max(28, Math.min(365, px(end.x) - 45))}
            y={Math.min(388, py(end.y) + 30)}
            className="point-label"
          >
            B ({end.x}, {end.y})
          </text>
        </>
      )}
      {circle && (
        <>
          <circle
            cx={px(center.x)}
            cy={py(center.y)}
            r="3"
            fill="var(--accent)"
          />
          <text
            x={px(center.x) + 9}
            y={py(center.y) - 10}
            className="point-label"
          >
            r = {radius}
          </text>
        </>
      )}
    </svg>
  );
}
