export const LANGUAGES = [
  { id: "pseudo", label: "Pseudo" },
  { id: "javascript", label: "JS" },
  { id: "python", label: "Python" },
  { id: "cpp", label: "C++" },
];

export const snippets = {
  dda: {
    pseudo: `dx = x2 - x1
dy = y2 - y1
steps = max(abs(dx), abs(dy))
xInc = steps ? dx / steps : 0
yInc = steps ? dy / steps : 0
x = x1; y = y1

for i = 0 to steps:
  plot(round(x), round(y))
  x += xInc
  y += yInc`,
    javascript: `// plot(x, y) enciende un píxel. Impleméntala en tu editor.
function dda(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const steps = Math.max(Math.abs(dx), Math.abs(dy));
  const xInc = steps ? dx / steps : 0;
  const yInc = steps ? dy / steps : 0;
  let x = x1;
  let y = y1;
  for (let i = 0; i <= steps; i++) {
    plot(Math.round(x), Math.round(y));
    x += xInc;
    y += yInc;
  }
}`,
    python: `# plot(x, y) enciende un píxel. Impleméntala en tu editor.
def dda(x1, y1, x2, y2):
    dx = x2 - x1
    dy = y2 - y1
    steps = max(abs(dx), abs(dy))
    x_inc = dx / steps if steps else 0
    y_inc = dy / steps if steps else 0
    x, y = x1, y1
    for _ in range(steps + 1):
        plot(round(x), round(y))
        x += x_inc
        y += y_inc`,
    cpp: `// plot(x, y) enciende un píxel. Impleméntala en tu editor.
void dda(int x1, int y1, int x2, int y2) {
    int dx = x2 - x1;
    int dy = y2 - y1;
    int adx = dx < 0 ? -dx : dx;
    int ady = dy < 0 ? -dy : dy;
    int steps = adx > ady ? adx : ady;
    float xInc = steps ? dx / (float)steps : 0;
    float yInc = steps ? dy / (float)steps : 0;
    float x = x1;
    float y = y1;
    for (int i = 0; i <= steps; i++) {
        plot((int)(x + (x >= 0 ? 0.5f : -0.5f)),
             (int)(y + (y >= 0 ? 0.5f : -0.5f)));
        x += xInc;
        y += yInc;
    }
}`,
  },
  bresenham: {
    pseudo: `dx = abs(x2 - x1); dy = -abs(y2 - y1)
sx = x1 < x2 ? 1 : -1
sy = y1 < y2 ? 1 : -1
x = x1; y = y1; error = dx + dy
loop:
  plot(x, y)
  if x == x2 and y == y2: break
  e2 = 2 * error
  if e2 >= dy:
    error += dy; x += sx
  if e2 <= dx:
    error += dx; y += sy`,
    javascript: `// plot(x, y) enciende un píxel. Impleméntala en tu editor.
function bresenham(x1, y1, x2, y2) {
  const dx = Math.abs(x2 - x1);
  const dy = -Math.abs(y2 - y1);
  const sx = x1 < x2 ? 1 : -1;
  const sy = y1 < y2 ? 1 : -1;
  let x = x1;
  let y = y1;
  let error = dx + dy;
  while (true) {
    plot(x, y);
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
}`,
    python: `# plot(x, y) enciende un píxel. Impleméntala en tu editor.
def bresenham(x1, y1, x2, y2):
    dx = abs(x2 - x1)
    dy = -abs(y2 - y1)
    sx = 1 if x1 < x2 else -1
    sy = 1 if y1 < y2 else -1
    x, y = x1, y1
    error = dx + dy
    while True:
        plot(x, y)
        if x == x2 and y == y2:
            break
        e2 = 2 * error
        if e2 >= dy:
            error += dy
            x += sx
        if e2 <= dx:
            error += dx
            y += sy`,
    cpp: `// plot(x, y) enciende un píxel. Impleméntala en tu editor.
void bresenham(int x1, int y1, int x2, int y2) {
    int dx = x2 - x1;
    if (dx < 0) dx = -dx;
    int dy = y2 - y1;
    if (dy < 0) dy = -dy;
    dy = -dy;
    int sx = x1 < x2 ? 1 : -1;
    int sy = y1 < y2 ? 1 : -1;
    int x = x1;
    int y = y1;
    int error = dx + dy;
    while (true) {
        plot(x, y);
        if (x == x2 && y == y2) break;
        int e2 = 2 * error;
        if (e2 >= dy) {
            error += dy;
            x += sx;
        }
        if (e2 <= dx) {
            error += dx;
            y += sy;
        }
    }
}`,
  },
  circle: {
    pseudo: `x = 0; y = radius
p = 1 - radius
while x <= y:
  reflectEightOctants(x, y, center)
  x += 1
  if p < 0:
    p += 2 * x + 1
  else:
    y -= 1
    p += 2 * (x - y) + 1`,
    javascript: `// plot(x, y) enciende un píxel. Impleméntala en tu editor.
function plotOctants(cx, cy, x, y) {
  plot(cx + x, cy + y);
  plot(cx - x, cy + y);
  plot(cx + x, cy - y);
  plot(cx - x, cy - y);
  plot(cx + y, cy + x);
  plot(cx - y, cy + x);
  plot(cx + y, cy - x);
  plot(cx - y, cy - x);
}

function midpointCircle(cx, cy, radius) {
  let x = 0;
  let y = radius;
  let p = 1 - radius;
  while (x <= y) {
    plotOctants(cx, cy, x, y);
    x += 1;
    if (p < 0) p += 2 * x + 1;
    else {
      y -= 1;
      p += 2 * (x - y) + 1;
    }
  }
}`,
    python: `# plot(x, y) enciende un píxel. Impleméntala en tu editor.
def plot_octants(cx, cy, x, y):
    plot(cx + x, cy + y)
    plot(cx - x, cy + y)
    plot(cx + x, cy - y)
    plot(cx - x, cy - y)
    plot(cx + y, cy + x)
    plot(cx - y, cy + x)
    plot(cx + y, cy - x)
    plot(cx - y, cy - x)

def midpoint_circle(cx, cy, radius):
    x = 0
    y = radius
    p = 1 - radius
    while x <= y:
        plot_octants(cx, cy, x, y)
        x += 1
        if p < 0:
            p += 2 * x + 1
        else:
            y -= 1
            p += 2 * (x - y) + 1`,
    cpp: `// plot(x, y) enciende un píxel. Impleméntala en tu editor.
void plotOctants(int cx, int cy, int x, int y) {
    plot(cx + x, cy + y);
    plot(cx - x, cy + y);
    plot(cx + x, cy - y);
    plot(cx - x, cy - y);
    plot(cx + y, cy + x);
    plot(cx - y, cy + x);
    plot(cx + y, cy - x);
    plot(cx - y, cy - x);
}

void midpointCircle(int cx, int cy, int radius) {
    int x = 0;
    int y = radius;
    int p = 1 - radius;
    while (x <= y) {
        plotOctants(cx, cy, x, y);
        x += 1;
        if (p < 0) p += 2 * x + 1;
        else {
            y -= 1;
            p += 2 * (x - y) + 1;
        }
    }
}`,
  },
};
