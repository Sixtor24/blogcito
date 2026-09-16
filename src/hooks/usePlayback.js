import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePixelAudio } from "../audio/PixelAudio";
export function usePlayback(
  length,
  { auto = false, loop = false, delay = 360, hold = 1800, onComplete, resetKey } = {},
) {
  const { unlock, tick } = usePixelAudio();
  const interacted = useRef(false);
  const previousStep = useRef(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(auto);
  useLayoutEffect(() => {
    if (resetKey === undefined) return;
    setStep(0);
    setPlaying(auto);
    previousStep.current = 0;
  }, [resetKey, auto]);
  useEffect(() => {
    if (!playing) return;
    if (step >= length - 1) {
      if (loop) {
        const timer = setTimeout(() => setStep(0), hold);
        return () => clearTimeout(timer);
      }
      if (onCompleteRef.current) {
        const timer = setTimeout(() => {
          setPlaying(false);
          onCompleteRef.current?.();
        }, hold);
        return () => clearTimeout(timer);
      }
      setPlaying(false);
      return;
    }
    const timer = setTimeout(() => setStep((s) => s + 1), delay);
    return () => clearTimeout(timer);
  }, [playing, step, length, loop, delay, hold]);
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
