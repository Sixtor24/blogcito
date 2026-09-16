import test from "node:test";
import assert from "node:assert/strict";
import { dda, bresenham, midpointCircle } from "./index.js";
for (const algorithm of [dda, bresenham]) {
  test(`${algorithm.name}: endpoints and connected integer pixels across all octants`, () => {
    for (const [x, y] of [
      [12, 7],
      [7, 12],
      [-12, 7],
      [-7, 12],
      [12, -7],
      [7, -12],
      [-12, -7],
      [-7, -12],
      [0, 9],
      [9, 0],
    ]) {
      const trace = algorithm(0, 0, x, y);
      assert.deepEqual([trace[0].x, trace[0].y], [0, 0]);
      assert.deepEqual([trace.at(-1).x, trace.at(-1).y], [x, y]);
      assert.equal(trace.length, Math.max(Math.abs(x), Math.abs(y)) + 1);
      trace.forEach((point, i) => {
        assert.ok(Number.isInteger(point.x) && Number.isInteger(point.y));
        if (i)
          assert.equal(
            Math.max(
              Math.abs(point.x - trace[i - 1].x),
              Math.abs(point.y - trace[i - 1].y),
            ),
            1,
          );
        assert.ok(
          Math.abs(y * point.x - x * point.y) / Math.hypot(x, y) <= 0.71,
        );
      });
    }
  });
  test(`${algorithm.name}: coincident endpoints`, () => {
    const trace = algorithm(2, 3, 2, 3);
    assert.equal(trace.length, 1);
    assert.deepEqual([trace[0].x, trace[0].y], [2, 3]);
  });
}
test("midpointCircle: symmetry, radius accuracy and no repeated pixels", () => {
  for (const r of [0, 1, 2, 5, 10, 30]) {
    const points = midpointCircle(8, 7, r).flatMap((s) => s.points);
    const keys = new Set(points.map((p) => `${p.x},${p.y}`));
    assert.equal(keys.size, points.length);
    for (const { x, y } of points) {
      assert.ok(keys.has(`${16 - x},${y}`));
      assert.ok(keys.has(`${x},${14 - y}`));
      assert.ok(Math.abs(Math.hypot(x - 8, y - 7) - r) <= 0.71);
    }
  }
});
