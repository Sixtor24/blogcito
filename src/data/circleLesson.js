import { traces } from "../algorithms";

// Separate the computed octant from its reflections for the explanatory demo.
// The laboratory still uses the original midpoint algorithm iterations.
const octant = traces.circle.map(({ x, y }) => ({ x: x - 8, y: y - 7 }));
const reflections = [
  (x, y) => [y, x],
  (x, y) => [y, -x],
  (x, y) => [x, -y],
  (x, y) => [-x, -y],
  (x, y) => [-y, -x],
  (x, y) => [-y, x],
  (x, y) => [-x, y],
];
export const circleLesson = [
  ...traces.circle.map((frame) => ({
    ...frame,
    points: [{ x: frame.x, y: frame.y }],
  })),
  ...reflections.map((reflect, index) => ({
    step: octant.length + index,
    decision: `Octante ${index + 2} / 8`,
    points: octant.map(({ x, y }) => {
      const [rx, ry] = reflect(x, y);
      return { x: 8 + rx, y: 7 + ry };
    }),
  })),
];
