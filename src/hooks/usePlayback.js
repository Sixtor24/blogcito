import { useEffect, useRef, useState } from "react";
import { usePixelAudio } from "../audio/PixelAudio";
export function usePlayback(
  length,
  { auto = false, loop = false, delay = 360 } = {},
) {
  const { unlock, tick } = usePixelAudio();
  const interacted = useRef(false);
  const previousStep = useRef(0);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(auto);
  useEffect(() => {
    if (!playing) return;
    if (step >= length - 1 && !loop) {
      setPlaying(false);
      return;
    }
    const timer = setTimeout(
      () => setStep((s) => (s >= length - 1 ? 0 : s + 1)),
      step === length - 1 ? 1800 : delay,
    );
    return () => clearTimeout(timer);
  }, [playing, step, length, loop, delay]);
  useEffect(() => {
    if (interacted.current && step > previousStep.current) tick(step);
    previousStep.current = step;
  }, [step, tick]);
  const reset = () => {
    setStep(0);
    setPlaying(false);
  };
  const toggle = () => {
    interacted.current = true;
    unlock();
    if (step === length - 1) setStep(0);
    setPlaying((p) => !p);
  };
  const seek = (n) => {
    interacted.current = true;
    unlock();
    setPlaying(false);
    setStep(Math.max(0, Math.min(length - 1, n)));
  };
  return { step, playing, reset, toggle, seek };
}
