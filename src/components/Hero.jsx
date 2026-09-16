import { useState } from "react";
import { ArrowRight, ArrowUpRight, Plus, Pause, Play } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SoundToggle } from "../audio/PixelAudio";
import PixelGrid from "./PixelGrid";
import { traces } from "../algorithms";
import { usePlayback } from "../hooks/usePlayback";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const SHOWCASE = [
  {
    id: "dda",
    label: "DDA",
    caption: "PUNTO FLOTANTE",
    hint: "incrementos iguales · redondeo",
    trace: traces.dda,
    circle: false,
    delay: 190,
  },
  {
    id: "bresenham",
    label: "Bresenham",
    caption: "SOLO ENTEROS",
    hint: "variable de error · decisiones",
    trace: traces.bresenham,
    circle: false,
    delay: 190,
  },
  {
    id: "circle",
    label: "Punto Medio",
    caption: "8 OCTANTES",
    hint: "un arco · siete reflejos",
    trace: traces.circle,
    circle: true,
    delay: 340,
  },
];

export default function Hero({ active = true }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const demo = SHOWCASE[index];
  const playback = usePlayback(demo.trace.length, {
    auto: Boolean(active && !reduced),
    loop: false,
    delay: demo.delay,
    hold: 1500,
    resetKey: demo.id,
    onComplete: reduced
      ? undefined
      : () => setIndex((i) => (i + 1) % SHOWCASE.length),
  });
  const frame = demo.trace[Math.min(playback.step, demo.trace.length - 1)];
  const progress = (Math.min(playback.step, demo.trace.length - 1) + 1) / demo.trace.length;

  return (
    <section className="hero" id="inicio">
      <motion.div
        className="hero-copy"
        initial="hidden"
        animate={active ? "show" : "hidden"}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
        }}
      >
        <motion.div className="eyebrow" variants={fadeUp}>
          <span className="status-dot" /> UNA EXPLORACIÓN INTERACTIVA
        </motion.div>
        <motion.h1 variants={fadeUp}>
          De una ecuación
          <br />a un <span>píxel.</span>
          <span className="title-pixel" />
        </motion.h1>
        <motion.p variants={fadeUp}>
          Las pantallas no entienden de líneas.
          <br />
          Entienden de decisiones.
        </motion.p>
        <motion.p className="hero-description" variants={fadeUp}>
          Descubre cómo DDA, Bresenham y Punto Medio convierten geometría ideal
          en los píxeles que ves.
        </motion.p>
        <motion.div className="hero-live-line" variants={fadeUp}>
          <span>Ahora</span>
          <AnimatePresence mode="wait">
            <motion.strong
              key={demo.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              {demo.label}
            </motion.strong>
          </AnimatePresence>
          <span>está eligiendo el siguiente píxel.</span>
        </motion.div>
        <motion.div className="hero-actions" variants={fadeUp}>
          <a href="#rasterizacion" className="button primary">
            Comenzar recorrido <ArrowRight size={17} />
          </a>
          <a href="#laboratorio" className="text-button">
            Abrir laboratorio <ArrowUpRight size={16} />
          </a>
        </motion.div>
        <motion.div className="hero-authors" variants={fadeUp}>
          <span>Desarrollado por</span>
          <b>Victor Rodriguez</b>
          <i />
          <b>Edwin Guarisma</b>
          <i />
          <b>Nicole Herrera</b>
        </motion.div>
      </motion.div>
      <motion.div
        className={`hero-visual theme-${demo.id}`}
        initial={{ opacity: 0, y: 24 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6, delay: 0.18 }}
      >
        <div className="visual-top">
          <SoundToggle />
          <span>
            <span className="status-dot" /> PIXEL TRACE
          </span>
          <button
            className={`hero-animation-toggle${playback.playing ? "" : " is-paused"}`}
            onClick={playback.toggle}
            aria-label={
              playback.playing
                ? "Pausar animación de portada"
                : "Reproducir animación de portada"
            }
          >
            {playback.playing ? <Pause size={10} /> : <Play size={10} />} LIVE
            RENDER <span className="live-dot" />
          </button>
        </div>
        <div className="hero-algo-bar">
          <div className="algorithm-switch hero-switch">
            {SHOWCASE.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className={i === index ? "selected" : ""}
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
              >
                {item.label}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={demo.id}
              className="hero-algo-meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              0{index + 1}/03 · {demo.caption}
            </motion.span>
          </AnimatePresence>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={demo.id}
            className="hero-trace"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <PixelGrid
              trace={demo.trace}
              step={Math.min(playback.step, demo.trace.length - 1)}
              circle={demo.circle}
              octants={demo.circle}
              hero
            />
          </motion.div>
        </AnimatePresence>
        <div className="hero-progress" aria-hidden>
          <motion.span
            animate={{ scaleX: progress }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          />
        </div>
        <div className="visual-bottom">
          <span>
            <span className="legend-square" /> Píxel seleccionado
          </span>
          <span>
            <i className="legend-line" />{" "}
            {demo.circle ? "Circunferencia ideal" : "Línea ideal"}
          </span>
          <span className="coordinate">
            x: {frame.x.toString().padStart(2, "0")}{" "}
            <span>y: {frame.y.toString().padStart(2, "0")}</span>
          </span>
        </div>
        <Plus className="corner corner-tl" size={14} />
        <Plus className="corner corner-br" size={14} />
      </motion.div>
      <motion.div
        className="hero-strip"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <span>DEL ESPACIO CONTINUO AL MUNDO DISCRETO</span>
        <div>
          {SHOWCASE.map((item, i) => (
            <span key={item.id} className={i === index ? "is-live" : ""}>
              {item.label.toUpperCase()}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
