import { ArrowUp, ArrowUpRight } from "lucide-react";
import { Logo } from "./Header";

const AUTHORS = ["Victor Rodriguez", "Edwin Guarisma", "Nicole Herrera"];

export default function Footer() {
  return (
    <>
      <section className="conclusion">
        <div className="eyebrow muted">CADA PÍXEL TIENE UNA HISTORIA</div>
        <h2>
          Los gráficos empiezan
          <br />
          mucho antes de verse <span>bonitos.</span>
        </h2>
        <p>
          DDA nos enseña a dar el primer paso. Bresenham, a decidir mejor.
          <br />
          Punto Medio, a encontrar la simetría. Ahora conoces lo que hay detrás
          de la pantalla.
        </p>
        <a href="#inicio" className="button secondary">
          Volver al inicio <ArrowUp size={16} />
        </a>
      </section>
      <footer>
        <div className="footer-brand">
          <Logo />
          <span>Un laboratorio para entender lo que ves.</span>
        </div>
        <div className="footer-credits">
          <span>Desarrollado por</span>
          <ul>
            {AUTHORS.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
        <a href="#laboratorio">
          Hecho de matemáticas y píxeles <ArrowUpRight size={13} />
        </a>
      </footer>
    </>
  );
}
