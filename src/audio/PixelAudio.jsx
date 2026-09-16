import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Volume2, VolumeX } from "lucide-react";

const PixelAudioContext = createContext(null);

export function PixelAudioProvider({ children }) {
  const [enabled, setEnabled] = useState(true);
  const context = useRef(null);
  const master = useRef(null);
  const enabledRef = useRef(enabled);

  // Only called from a deliberate interaction, never from the autoplay hero.
  const unlock = useCallback(() => {
    if (!enabledRef.current) return;
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return;
    try {
      if (!context.current) {
        context.current = new Audio();
        master.current = context.current.createGain();
        master.current.connect(context.current.destination);
      }
      if (context.current.state === "suspended")
        context.current.resume().catch(() => {});
    } catch {
      /* Audio is optional; drawing continues if unavailable. */
    }
  }, []);

  const tick = useCallback((step) => {
    const audio = context.current;
    if (
      !enabledRef.current ||
      !audio ||
      audio.state !== "running" ||
      document.hidden
    )
      return;
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    const now = audio.currentTime;
    const note = [523.25, 587.33, 659.25, 783.99, 880][step % 5];
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(note * 1.3, now);
    oscillator.frequency.exponentialRampToValueAtTime(note, now + 0.045);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.055, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.065);
    oscillator.connect(gain);
    gain.connect(master.current);
    oscillator.onended = () => {
      oscillator.disconnect();
      gain.disconnect();
    };
    oscillator.start(now);
    oscillator.stop(now + 0.075);
  }, []);

  const toggleSound = () => {
    const next = !enabledRef.current;
    enabledRef.current = next;
    setEnabled(next);
    if (master.current)
      master.current.gain.setValueAtTime(
        next ? 1 : 0,
        context.current.currentTime,
      );
    if (next) unlock();
  };
  useEffect(
    () => () => {
      context.current?.close().catch(() => {});
      context.current = null;
      master.current = null;
    },
    [],
  );
  return (
    <PixelAudioContext.Provider value={{ enabled, unlock, tick, toggleSound }}>
      {children}
    </PixelAudioContext.Provider>
  );
}

export const usePixelAudio = () => useContext(PixelAudioContext);

export function SoundToggle() {
  const { enabled, toggleSound } = usePixelAudio();
  return (
    <button
      className="icon-button sound-toggle"
      onClick={toggleSound}
      aria-label={enabled ? "Silenciar píxeles" : "Activar sonido de píxeles"}
      aria-pressed={enabled}
      title={enabled ? "Sonido activado" : "Sonido desactivado"}
    >
      {enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
    </button>
  );
}
