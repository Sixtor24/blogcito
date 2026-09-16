import { snippets } from "./snippets";

export const algorithms = [
  {
    id: "dda",
    number: "01",
    short: "DDA",
    title: "Algoritmo DDA",
    subtitle: "Un pequeño incremento. Una línea completa.",
    description:
      "Digital Differential Analyzer es un algoritmo básico de rasterización: convierte una recta continua en píxeles. Calcula dx y dy, elige cuántos pasos dar (el mayor cambio, para no dejar huecos) y suma incrementos Δx y Δy. En cada paso redondea al píxel más cercano.",
    purpose:
      "Sirve para dibujar líneas de forma simple e intuitiva. Es pionero, pero usa punto flotante: puede acumular errores de redondeo y ser más lento que Bresenham.",
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
    snippets: snippets.dda,
    note: "Observa cómo una posición decimal se convierte en una coordenada entera.",
  },
  {
    id: "bresenham",
    number: "02",
    short: "Bresenham",
    title: "Algoritmo de Bresenham",
    subtitle: "Mejores decisiones. Solo enteros.",
    description:
      "Jack E. Bresenham (1962) elige el píxel más cercano a la recta ideal usando solo enteros. Una variable de decisión compara distancias y dice si el siguiente paso es horizontal, vertical o diagonal: sumas y restas, sin punto flotante.",
    purpose:
      "Es el estándar en programas de dibujo y videojuegos: rápido, preciso y amigable con el hardware.",
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
    snippets: snippets.bresenham,
    note: "La línea tenue es continua. Los cuadrados son las decisiones discretas del algoritmo.",
  },
  {
    id: "circle",
    number: "03",
    short: "Punto Medio",
    title: "Una circunferencia, ocho reflejos.",
    subtitle: "Algoritmo de Punto Medio",
    description:
      "No hace falta recorrer 360°. El algoritmo de punto medio (una adaptación de Bresenham a curvas) calcula un octante de 45° con una ecuación de decisión y refleja ese arco en los otros siete ejes y diagonales.",
    purpose:
      "Dibuja círculos de forma óptima; la misma idea se extiende a elipses y arcos, con el mínimo de operaciones.",
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
    snippets: snippets.circle,
    note: "Primero calculamos un octante. Después lo reflejamos en los siete restantes, sin volver a evaluar la curva.",
  },
];
