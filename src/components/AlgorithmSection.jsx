import { useState } from "react";
import { motion } from "motion/react";
import { Play, Pause, RotateCcw, Code2, Eye, ArrowRight } from "lucide-react";
import { traces } from "../algorithms";
import { circleLesson } from "../data/circleLesson";
import { usePlayback } from "../hooks/usePlayback";
import { SoundToggle } from "../audio/PixelAudio";
import PixelGrid from "./PixelGrid";
import CodePanel from "./CodePanel";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AlgorithmSection({ algorithm: a }) {
  const trace = a.id === "circle" ? circleLesson : traces[a.id];
  const playback = usePlayback(trace.length, {
    delay: a.id === "circle" ? 650 : 360,
  });
  const [tab, setTab] = useState("visual");
  return (
    <section className={`algorithm-section section theme-${a.id}`} id={a.id}>
      <motion.div
        className="algorithm-copy"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={fadeUp}
      >
        <div className="eyebrow">
          <span className="chapter-number">{a.number}</span>{" "}
          {a.short.toUpperCase()} /{" "}
          {a.id === "circle" ? "CIRCUNFERENCIAS" : "TRAZADO DE LÍNEAS"}
        </div>
        <h2>{a.title}</h2>
        <h3 className="algorithm-subtitle">{a.subtitle}</h3>
        <p>{a.description}</p>
        <p className="algorithm-purpose">{a.purpose}</p>
        <div className="idea">
          <span /> {a.idea}
        </div>
        <ol className="steps-list">
          {a.details.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ol>
        <div className="algorithm-stats">
          {a.stats.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <a className="algorithm-link" href="#laboratorio">
          Experimentar en el laboratorio <ArrowRight size={15} />
        </a>
      </motion.div>
      <motion.div
        className="demo"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, delay: 0.08 }}
      >
        <div className="demo-tabs">
          <div
            onKeyDown={(event) => {
              if (
                ["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
              ) {
                event.preventDefault();
                const next =
                  event.key === "Home"
                    ? "visual"
                    : event.key === "End"
                      ? "code"
                      : tab === "visual"
                        ? "code"
                        : "visual";
                setTab(next);
                event.currentTarget
                  .querySelectorAll("button")
                  [next === "visual" ? 0 : 1].focus();
              }
            }}
            role="tablist"
            aria-label={`Vista de ${a.short}`}
          >
            <button
              id={`${a.id}-visual-tab`}
              aria-controls={`${a.id}-panel`}
              tabIndex={tab === "visual" ? 0 : -1}
              role="tab"
              aria-selected={tab === "visual"}
              onClick={() => setTab("visual")}
              className={tab === "visual" ? "active" : ""}
            >
              <Eye size={14} /> Visualización
            </button>
            <button
              id={`${a.id}-code-tab`}
              aria-controls={`${a.id}-panel`}
              tabIndex={tab === "code" ? 0 : -1}
              role="tab"
              aria-selected={tab === "code"}
              onClick={() => setTab("code")}
              className={tab === "code" ? "active" : ""}
            >
              <Code2 size={14} /> Código
            </button>
          </div>
          <span className="mono">
            {tab === "code"
              ? "COPIABLE"
              : a.id === "circle"
                ? "8× SYMMETRY"
                : "STEP BY STEP"}
          </span>
        </div>
        <div
          className={`demo-body${tab === "code" ? " code-view" : ""}`}
          id={`${a.id}-panel`}
          aria-labelledby={`${a.id}-${tab}-tab`}
          role="tabpanel"
          tabIndex={0}
        >
          {tab === "visual" ? (
            <PixelGrid
              trace={trace}
              step={playback.step}
              circle={a.id === "circle"}
              octants
            />
          ) : (
            <CodePanel algorithmId={a.id} snippets={a.snippets} />
          )}
        </div>
        {tab === "visual" && (
          <div className="demo-controls">
            <SoundToggle />
            <button className="small-play" onClick={playback.toggle}>
              {playback.playing ? <Pause size={14} /> : <Play size={14} />}{" "}
              {playback.playing ? "Pausar" : "Reproducir"}
            </button>
            <button
              className="icon-button"
              aria-label={`Reiniciar ${a.short}`}
              onClick={playback.reset}
            >
              <RotateCcw size={15} />
            </button>
            <span>
              PASO <b>{String(playback.step + 1).padStart(2, "0")}</b> /{" "}
              {trace.length}
            </span>
            <span className="decision">{trace[playback.step].decision}</span>
          </div>
        )}
        <p className="demo-note">{a.note}</p>
      </motion.div>
    </section>
  );
}
