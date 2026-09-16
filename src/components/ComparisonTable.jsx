import { motion } from "motion/react";

const rows = [
  [
    "DDA",
    "Líneas",
    "Punto flotante",
    "Bueno",
    "Simple e intuitivo",
    "Puede acumular errores",
  ],
  [
    "Bresenham",
    "Líneas",
    "Enteros",
    "Muy alto",
    "Rápido y preciso",
    "Lógica más compleja",
  ],
  [
    "Punto Medio",
    "Circunferencias",
    "Enteros",
    "Muy alto",
    "Aprovecha la simetría",
    "Especializado en círculos",
  ],
];
export default function ComparisonTable() {
  return (
    <section className="section comparison" id="comparacion">
      <motion.div
        className="eyebrow muted"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        04 / FRENTE A FRENTE
      </motion.div>
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <h2>
          Mismo lienzo.
          <br />
          <span className="secondary-text">Distintas decisiones.</span>
        </h2>
        <p>
          No hay un algoritmo para todo. La figura que quieres dibujar y el
          coste de cada operación determinan la mejor herramienta.
        </p>
      </motion.div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {[
                "Algoritmo",
                "Ideal para",
                "Aritmética",
                "Rendimiento",
                "Ventaja principal",
                "Limitación",
              ].map((h) => (
                <th scope="col" key={h}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <motion.tr
                key={row[0]}
                className={`theme-${["dda", "bresenham", "circle"][i]}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                {row.map((cell, j) => (
                  <td key={j}>
                    {j === 0 ? (
                      <strong>
                        <span className="status-dot" />
                        {cell}
                      </strong>
                    ) : j === 3 ? (
                      <span className="performance">
                        <i />
                        {cell}
                      </span>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
