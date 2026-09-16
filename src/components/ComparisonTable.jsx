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
      <div className="eyebrow muted">04 / FRENTE A FRENTE</div>
      <div className="section-heading">
        <h2>
          Mismo lienzo.
          <br />
          <span className="secondary-text">Distintas decisiones.</span>
        </h2>
        <p>
          No hay un algoritmo para todo. La figura que quieres dibujar y el
          coste de cada operación determinan la mejor herramienta.
        </p>
      </div>
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
              <tr
                key={row[0]}
                className={`theme-${["dda", "bresenham", "circle"][i]}`}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
