export function dda(x1, y1, x2, y2) {
  const dx = x2 - x1,
    dy = y2 - y1;
  const steps = Math.max(Math.abs(dx), Math.abs(dy));
  return Array.from({ length: steps + 1 }, (_, step) => {
    const rawX = x1 + (steps ? (step * dx) / steps : 0);
    const rawY = y1 + (steps ? (step * dy) / steps : 0);
    return {
      x: Math.round(rawX),
      y: Math.round(rawY),
      step,
      decision: step ? `y = ${rawY.toFixed(3)}` : "Inicial",
      value: rawY.toFixed(3),
      points: [{ x: Math.round(rawX), y: Math.round(rawY) }],
    };
  });
}
export function bresenham(x1, y1, x2, y2) {
  const dx = Math.abs(x2 - x1),
    dy = -Math.abs(y2 - y1);
  const sx = x1 < x2 ? 1 : -1,
    sy = y1 < y2 ? 1 : -1;
  let x = x1,
    y = y1,
    error = dx + dy;
  const result = [];
  while (true) {
    result.push({
      x,
      y,
      step: result.length,
      decision: `error = ${error}`,
      value: error,
      points: [{ x, y }],
    });
    if (x === x2 && y === y2) break;
    const e2 = 2 * error;
    if (e2 >= dy) {
      error += dy;
      x += sx;
    }
    if (e2 <= dx) {
      error += dx;
      y += sy;
    }
  }
  return result;
}
export function midpointCircle(cx, cy, radius) {
  let x = 0,
    y = radius,
    p = 1 - radius;
  const result = [];
  while (x <= y) {
    const points = [
      ...new Map(
        [
          [x, y],
          [y, x],
          [-x, y],
          [-y, x],
          [x, -y],
          [y, -x],
          [-x, -y],
          [-y, -x],
        ].map(([a, b]) => [`${cx + a},${cy + b}`, { x: cx + a, y: cy + b }]),
      ).values(),
    ];
    result.push({
      x: cx + x,
      y: cy + y,
      step: result.length,
      decision: `p = ${p}`,
      value: p,
      points,
    });
    x++;
    if (p < 0) p += 2 * x + 1;
    else {
      y--;
      p += 2 * (x - y) + 1;
    }
  }
  return result;
}
export const traces = {
  dda: dda(2, 10, 14, 3),
  bresenham: bresenham(2, 10, 14, 3),
  circle: midpointCircle(8, 7, 5),
};
