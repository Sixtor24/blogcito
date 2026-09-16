import { ArrowRight, ArrowUpRight, Plus, Pause, Play } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { SoundToggle } from "../audio/PixelAudio";
import PixelGrid from "./PixelGrid";
import { traces } from "../algorithms";
import { usePlayback } from "../hooks/usePlayback";
export default function Hero() {
  const reduced = useReducedMotion();
  const playback = usePlayback(traces.bresenham.length, {
    auto: !reduced,
    loop: true,
    delay: 240,
  });
  return (
    <section className="hero" id="inicio">
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="status-dot" /> UNA EXPLORACIÓN INTERACTIVA
        </div>
        <h1>
          De una ecuación
          <br />a un <span>píxel.</span>
          <span className="title-pixel" />
        </h1>
        <p>
          Las pantallas no entienden de líneas.
          <br />
          Entienden de decisiones.
        </p>
        <p className="hero-description">
          Descubre cómo DDA, Bresenham y Punto Medio convierten geometría ideal
          en los píxeles que ves.
        </p>
        <div className="hero-actions">
          <a href="#rasterizacion" className="button primary">
            Comenzar recorrido <ArrowRight size={17} />
          </a>
          <a href="#laboratorio" className="text-button">
            Abrir laboratorio <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="hero-footnote">
          <span className="tiny-grid">▦</span> 3 algoritmos <span>·</span> Sin
          magia. Solo matemáticas.
        </div>
      </div>
      <div className="hero-visual">
        <div className="visual-top">
          <SoundToggle />
          <span>
            <span className="status-dot" /> PIXEL TRACE
          </span>
          <button
            className="hero-animation-toggle"
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
        <PixelGrid trace={traces.bresenham} step={playback.step} hero />
        <div className="visual-bottom">
          <span>
            <span className="legend-square" /> Píxel seleccionado
          </span>
          <span>
            <i className="legend-line" /> Línea ideal
          </span>
          <span className="coordinate">
            x: {traces.bresenham[playback.step].x.toString().padStart(2, "0")}{" "}
            <span>
              y: {traces.bresenham[playback.step].y.toString().padStart(2, "0")}
            </span>
          </span>
        </div>
        <Plus className="corner corner-tl" size={14} />
        <Plus className="corner corner-br" size={14} />
      </div>
      <div className="hero-strip">
        <span>DEL ESPACIO CONTINUO AL MUNDO DISCRETO</span>
        <div>
          <span>COMPUTACIÓN GRÁFICA</span>
          <span>RASTERIZACIÓN</span>
          <span>
            INTEGER MATH <ArrowUpRight size={12} />
          </span>
        </div>
      </div>
    </section>
  );
}
