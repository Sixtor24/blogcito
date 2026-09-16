import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Terminal,
  SlidersHorizontal,
} from "lucide-react";
import { dda, bresenham, midpointCircle } from "../algorithms";
import ParameterForm from "./ParameterForm";
import { SoundToggle } from "../audio/PixelAudio";
import { usePlayback } from "../hooks/usePlayback";
import PixelGrid from "./PixelGrid";
function LabPlayer({ mode, parameters, onApply }) {
  const trace = useMemo(
    () =>
      mode === "circle"
        ? midpointCircle(parameters.cx, parameters.cy, parameters.radius)
        : (mode === "dda" ? dda : bresenham)(
            parameters.x1,
            parameters.y1,
            parameters.x2,
            parameters.y2,
          ),
    [mode, parameters],
  );
  const p = usePlayback(trace.length, { delay: 550 });
  const current = trace[p.step];
  const count = new Set(
    trace
      .slice(0, p.step + 1)
      .flatMap((s) => s.points.map((v) => `${v.x},${v.y}`)),
  ).size;
  return (
    <div className="lab-workspace">
      <div className="lab-canvas">
        <div className="canvas-heading">
          <span>
            <span className="status-dot" /> CANVAS_01
          </span>
          <span>
            17 × 15 <span className="muted">/ COORDENADAS CARTESIANAS</span>
          </span>
        </div>
        <PixelGrid
          trace={trace}
          step={p.step}
          circle={mode === "circle"}
          octants
          center={
            mode === "circle"
              ? { x: parameters.cx, y: parameters.cy }
              : undefined
          }
          radius={parameters.radius}
        />
        <div className="lab-legend">
          <span>
            <i className="legend-square" /> Calculado
          </span>
          <span>
            <i className="legend-square current-key" /> Píxel actual
          </span>
          <span>
            <i className="legend-line" /> Geometría ideal
          </span>
        </div>
      </div>
      <aside className="lab-sidebar">
        <div className="panel-label">
          <SlidersHorizontal size={14} /> PARÁMETROS
        </div>
        <ParameterForm mode={mode} parameters={parameters} onApply={onApply} />
        <div className="panel-label">
          <Terminal size={14} /> ESTADO ACTUAL <span className="status-dot" />
        </div>
        <div className="state-row">
          <span>Paso actual</span>
          <strong>
            {String(p.step + 1).padStart(2, "0")}
            <small> / {trace.length}</small>
          </strong>
        </div>
        <div className="state-row">
          <span>Coordenada actual</span>
          <code>
            ({current.x}, {current.y})
          </code>
        </div>
        <div className="state-row">
          <span>
            {mode === "dda" ? "Y antes de redondear" : "Variable de decisión"}
          </span>
          <code>{current.value}</code>
        </div>
        <div className="state-row">
          <span>Píxeles dibujados</span>
          <code>{count}</code>
        </div>
        <div className="lab-explanation">
          <span>// ¿QUÉ ESTÁ PASANDO?</span>
          <p>
            {mode === "dda"
              ? "Sumamos incrementos constantes y redondeamos la posición. El valor de Y conserva los decimales antes de elegir el píxel."
              : mode === "circle"
                ? "El signo de p elige el siguiente punto del octante. Sus reflejos en los otros siete aparecen en la misma iteración."
                : "El error compara la línea ideal con la cuadrícula. Su valor decide si el próximo movimiento cambia X, Y o ambas."}
          </p>
        </div>
      </aside>
      <div className="lab-playback">
        <div className="playback-buttons">
          <button className="button primary" onClick={p.toggle}>
            {p.playing ? <Pause size={16} /> : <Play size={16} />}{" "}
            {p.playing ? "Pausar" : "Reproducir"}
          </button>
          <button
            className="icon-button"
            aria-label="Reiniciar laboratorio"
            onClick={p.reset}
          >
            <RotateCcw size={16} />
          </button>
          <SoundToggle />
          <span className="control-divider" />
          <button
            className="icon-button"
            aria-label="Paso anterior"
            disabled={p.step === 0}
            onClick={() => p.seek(p.step - 1)}
          >
            <ChevronLeft size={19} />
          </button>
          <button
            className="icon-button"
            aria-label="Siguiente paso"
            disabled={p.step === trace.length - 1}
            onClick={() => p.seek(p.step + 1)}
          >
            <ChevronRight size={19} />
          </button>
        </div>
        <label className="iteration-slider">
          <span>ITERACIÓN</span>
          <input
            type="range"
            min="0"
            max={trace.length - 1}
            value={p.step}
            onChange={(e) => p.seek(Number(e.target.value))}
            aria-label="Iteración del algoritmo"
          />
          <span>
            {p.step + 1} / {trace.length}
          </span>
        </label>
      </div>
    </div>
  );
}
export default function RasterLab() {
  const [mode, setMode] = useState("dda");
  const [parameters, setParameters] = useState({
    line: { x1: 2, y1: 10, x2: 14, y2: 3 },
    circle: { cx: 8, cy: 7, radius: 5 },
  });
  const [revision, setRevision] = useState(0);
  const kind = mode === "circle" ? "circle" : "line";
  const apply = (values) => {
    setParameters((p) => ({ ...p, [kind]: values }));
    setRevision((n) => n + 1);
  };
  return (
    <section className={`section lab-section theme-${mode}`} id="laboratorio">
      <motion.div
        className="lab-title"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45 }}
      >
        <div>
          <div className="eyebrow">05 / APRENDER HACIENDO</div>
          <h2>
            Menos imaginar.
            <br />
            Más <span>experimentar.</span>
          </h2>
        </div>
        <p>
          Elige tus coordenadas, aplica los cambios y avanza un píxel a la vez.
          Observa y escucha cada decisión.
        </p>
      </motion.div>
      <motion.div
        className="lab-shell"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, delay: 0.08 }}
      >
        <div className="lab-toolbar">
          <span className="lab-brand">
            <FlaskConical size={17} /> RASTER <span>/</span> LAB
          </span>
          <div
            className="algorithm-switch"
            role="group"
            aria-label="Seleccionar algoritmo"
          >
            {[
              ["dda", "DDA"],
              ["bresenham", "Bresenham"],
              ["circle", "Circunferencia"],
            ].map(([id, name]) => (
              <button
                key={id}
                aria-pressed={mode === id}
                className={mode === id ? "selected" : ""}
                onClick={() => setMode(id)}
              >
                {name}
              </button>
            ))}
          </div>
          <span className="interactive-badge">
            <span className="status-dot" /> INTERACTIVO
          </span>
        </div>
        <LabPlayer
          mode={mode}
          key={`${mode}-${revision}`}
          parameters={parameters[kind]}
          onApply={apply}
        />
      </motion.div>
      <p className="lab-tip">
        Un paso, una decisión. Usa las flechas o arrastra el control para
        recorrer cada iteración.
      </p>
    </section>
  );
}
