export const algorithms = [
  {
    id: "dda",
    number: "01",
    short: "DDA",
    title: "Algoritmo DDA",
    subtitle: "Un pequeño incremento. Una línea completa.",
    description:
      "Digital Differential Analyzer construye una línea sumando pequeños incrementos en X e Y. En cada paso, redondea la posición al píxel más cercano.",
    idea: "Divide el recorrido en pasos iguales.",
    details: [
      "Calcula dx = x₂ − x₁ y dy = y₂ − y₁.",
      "Elige steps = max(|dx|, |dy|).",
      "Suma dx / steps y dy / steps; redondea y dibuja.",
    ],
    stats: [
      ["ARITMÉTICA", "Punto flotante"],
      ["VENTAJA", "Fácil de implementar"],
      ["LIMITACIÓN", "Errores de redondeo"],
      ["COMPLEJIDAD", "O(n)"],
    ],
    code: "dx = x2 - x1\ndy = y2 - y1\nsteps = max(abs(dx), abs(dy))\nxInc = steps ? dx / steps : 0\nyInc = steps ? dy / steps : 0\nx = x1; y = y1\n\nfor i = 0 to steps:\n  plot(round(x), round(y))\n  x += xInc\n  y += yInc",
    note: "Observa cómo una posición decimal se convierte en una coordenada entera.",
  },
  {
    id: "bresenham",
    number: "02",
    short: "Bresenham",
    title: "Algoritmo de Bresenham",
    subtitle: "Mejores decisiones. Solo enteros.",
    description:
      "Desarrollado por Jack E. Bresenham, este algoritmo mantiene un error acumulado para elegir el siguiente píxel. Evita decimales y decide si avanzar horizontal, vertical o diagonalmente.",
    idea: "El error indica cuál es el siguiente píxel.",
    details: [
      "Calcula las distancias y el sentido de la línea.",
      "Evalúa el doble del error en cada iteración.",
      "Avanza en X, en Y o en ambos; actualiza el error.",
    ],
    stats: [
      ["ARITMÉTICA", "Enteros"],
      ["PRECISIÓN", "Muy alta"],
      ["RENDIMIENTO", "Muy eficiente"],
      ["COMPLEJIDAD", "O(n)"],
    ],
    code: "dx = abs(x2 - x1); dy = -abs(y2 - y1)\nsx = x1 < x2 ? 1 : -1\nsy = y1 < y2 ? 1 : -1\nx = x1; y = y1; error = dx + dy\nloop:\n  plot(x, y)\n  if x == x2 and y == y2: break\n  e2 = 2 * error\n  if e2 >= dy:\n    error += dy; x += sx\n  if e2 <= dx:\n    error += dx; y += sy",
    note: "La línea tenue es continua. Los cuadrados son las decisiones discretas del algoritmo.",
  },
  {
    id: "circle",
    number: "03",
    short: "Punto Medio",
    title: "Una circunferencia, ocho reflejos.",
    subtitle: "Algoritmo de Punto Medio",
    description:
      "No necesitas calcular todo el círculo. Punto Medio evalúa un solo octante y aprovecha la simetría para obtener los otros siete con aritmética entera.",
    idea: "Calcula una parte. Refleja las demás.",
    details: [
      "Comienza en (0, r) con p = 1 − r.",
      "El signo de p decide si mantener o reducir Y.",
      "Refleja (±x, ±y) y (±y, ±x), hasta x > y.",
    ],
    stats: [
      ["ARITMÉTICA", "Enteros"],
      ["SIMETRÍA", "8 octantes"],
      ["VENTAJA", "Menos cálculos"],
      ["COMPLEJIDAD", "O(r)"],
    ],
    code: "x = 0; y = radius\np = 1 - radius\nwhile x <= y:\n  reflectEightOctants(x, y, center)\n  x += 1\n  if p < 0:\n    p += 2 * x + 1\n  else:\n    y -= 1\n    p += 2 * (x - y) + 1",
    note: "Primero calculamos un octante. Después lo reflejamos en los siete restantes, sin volver a evaluar la curva.",
  },
];
