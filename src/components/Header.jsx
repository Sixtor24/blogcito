import { useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
export const Logo = () => (
  <a className="logo" href="#inicio" aria-label="Raster Lab, inicio">
    <span className="logo-icon">
      <i />
      <i />
      <i />
    </span>
    RASTER <span className="logo-slash">/</span> LAB
    <span className="logo-dot">®</span>
  </a>
);
export default function Header() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <header>
      <motion.div className="reading-progress" style={{ scaleX }} />
      <div className="nav-inner">
        <Logo />
        <nav className={open ? "open" : ""} aria-label="Navegación principal">
          {[
            ["DDA", "dda"],
            ["Bresenham", "bresenham"],
            ["Circunferencia", "circle"],
            ["Comparación", "comparacion"],
          ].map(([name, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {name}
            </a>
          ))}
        </nav>
        <a className="nav-lab" href="#laboratorio">
          Laboratorio <ArrowUpRight size={15} />
        </a>
        <button
          className="menu-toggle icon-button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
