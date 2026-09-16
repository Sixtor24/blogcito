import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { bresenham } from "../algorithms";

const COLS = 16;
const ROWS = 10;
const TRACE = bresenham(1, 1, 14, 8);

export default function Preloader({ onComplete }) {
  const reduced = useReducedMotion();
  const done = useRef(false);
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState(reduced ? "ready" : "boot");

  const finish = () => {
    if (done.current) return;
    done.current = true;
    onComplete();
  };

  useEffect(() => {
    document.documentElement.classList.add("booting");
    return () => document.documentElement.classList.remove("booting");
  }, []);

  useEffect(() => {
    const failsafe = setTimeout(finish, 9000);
    return () => clearTimeout(failsafe);
  }, []);

  useEffect(() => {
    if (reduced) {
      const timer = setTimeout(finish, 700);
      return () => clearTimeout(timer);
    }
    if (phase === "boot") {
      const timer = setTimeout(() => setPhase("trace"), 420);
      return () => clearTimeout(timer);
    }
    if (phase === "trace") {
      if (step < TRACE.length - 1) {
        const timer = setTimeout(() => setStep((s) => s + 1), 78);
        return () => clearTimeout(timer);
      }
      const timer = setTimeout(() => setPhase("ready"), 520);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(finish, 640);
    return () => clearTimeout(timer);
  }, [phase, step, reduced]);

  const lit = new Map();
  if (phase !== "boot") {
    TRACE.slice(0, step + 1).forEach((frame, i) =>
      frame.points.forEach((p) =>
        lit.set(`${p.x},${p.y}`, { ...p, current: i === step }),
      ),
    );
  }
  const current = TRACE[Math.min(step, TRACE.length - 1)];
  const progress = reduced
    ? 100
    : phase === "boot"
      ? 8
      : phase === "ready"
        ? 100
        : Math.round(((step + 1) / TRACE.length) * 92);

  return (
    <motion.div
      className="preloader"
      role="status"
      aria-live="polite"
      aria-label="Cargando Raster Lab"
      initial={{ opacity: 1 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="preloader-noise" aria-hidden />
      <div className="preloader-frame">
        <div className="preloader-top">
          <span>
            <span className="status-dot" /> BOOT SEQUENCE
          </span>
          <span>{String(progress).padStart(3, "0")}%</span>
        </div>

        <div className="preloader-brand">
          <span className="logo-icon">
            <i />
            <i />
            <i />
          </span>
          RASTER <span className="logo-slash">/</span> LAB
        </div>

        <p className="preloader-kicker">
          {phase === "ready"
            ? "Pantalla lista. Entrando al laboratorio."
            : "Rasterizando geometría continua en píxeles discretos."}
        </p>

        <div className="boot-stage">
          <div
            className="boot-grid"
            style={{
              gridTemplateColumns: `repeat(${COLS}, 1fr)`,
              gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            }}
          >
            {Array.from({ length: COLS * ROWS }, (_, i) => {
              const x = i % COLS;
              const y = ROWS - 1 - Math.floor(i / COLS);
              const pixel = lit.get(`${x},${y}`);
              return (
                <span
                  key={i}
                  className={`boot-cell${pixel ? " on" : ""}${pixel?.current ? " current" : ""}`}
                />
              );
            })}
          </div>
          <svg className="boot-ideal" viewBox={`0 0 ${COLS} ${ROWS}`}>
            <line
              x1="1.5"
              y1={ROWS - 1.5}
              x2="14.5"
              y2="1.5"
              className="ideal-line"
            />
          </svg>
        </div>

        <div className="preloader-meta">
          <span>
            {phase === "ready" ? "RENDER COMPLETE" : "BRESENHAM TRACE"}
          </span>
          <span className="coordinate">
            x: {String(current.x).padStart(2, "0")}{" "}
            <span>y: {String(current.y).padStart(2, "0")}</span>
          </span>
        </div>

        <div className="preloader-progress" aria-hidden>
          <motion.span
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            className="preloader-status"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            {phase === "boot" && "INICIALIZANDO CUADRÍCULA"}
            {phase === "trace" &&
              `ENCENDIENDO PÍXEL ${String(step + 1).padStart(2, "0")} / ${String(TRACE.length).padStart(2, "0")}`}
            {phase === "ready" && "HANDOFF → RASTER LAB"}
          </motion.div>
        </AnimatePresence>

        <div className="preloader-authors">
          <span>Un proyecto de</span>
          <b>Victor Rodriguez</b>
          <i />
          <b>Edwin Guarisma</b>
          <i />
          <b>Nicole Herrera</b>
        </div>
      </div>

      <button className="preloader-skip" type="button" onClick={finish}>
        Saltar
      </button>
    </motion.div>
  );
}
