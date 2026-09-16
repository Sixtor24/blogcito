import { Grid2X2, Zap, Cpu, ArrowDownRight } from "lucide-react";
import { motion } from "motion/react";
export default function Introduction() {
  return (
    <section className="introduction section" id="rasterizacion">
      <div className="section-heading">
        <div>
          <div className="eyebrow muted">00 / EL PUNTO DE PARTIDA</div>
          <h2>
            La geometría es continua.
            <br />
            <span className="secondary-text">Tu pantalla no.</span>
          </h2>
        </div>
        <p>
          Una línea tiene infinitos puntos. Una pantalla, un número finito de
          píxeles. <strong>Rasterizar es decidir cuáles encender.</strong> Estos
          algoritmos hacen que esa decisión sea simple, rápida y precisa.
        </p>
      </div>
      <div className="concepts">
        {[
          [
            Grid2X2,
            "Espacio discreto",
            "Coordenadas enteras. Una cuadrícula. Un lugar concreto para cada píxel.",
          ],
          [
            Zap,
            "Decisiones rápidas",
            "En cada iteración, elegir el siguiente píxel con la menor cantidad de trabajo.",
          ],
          [
            Cpu,
            "Hardware real",
            "Menos operaciones costosas. Más eficiencia en lo que termina en tu pantalla.",
          ],
        ].map(([Icon, title, text], i) => (
          <motion.div
            className="concept"
            key={title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="concept-top">
              <Icon size={21} />
              <span>0{i + 1}</span>
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.div>
        ))}
      </div>
      <div className="chapter-intro">
        <span>TRES FORMAS DE TOMAR LA SIGUIENTE DECISIÓN</span>
        <ArrowDownRight size={20} />
      </div>
    </section>
  );
}
