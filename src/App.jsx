import { AnimatePresence, MotionConfig } from "motion/react";
import { useState } from "react";
import { PixelAudioProvider } from "./audio/PixelAudio";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Introduction from "./components/Introduction";
import AlgorithmSection from "./components/AlgorithmSection";
import ComparisonTable from "./components/ComparisonTable";
import RasterLab from "./components/RasterLab";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import { algorithms } from "./data/algorithms";

export default function App() {
  const [booting, setBooting] = useState(true);
  return (
    <PixelAudioProvider>
      <MotionConfig reducedMotion="user">
        <AnimatePresence>
          {booting && <Preloader onComplete={() => setBooting(false)} />}
        </AnimatePresence>
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <div inert={booting || undefined}>
          <Header />
          <main id="contenido">
            <Hero active={!booting} />
            <Introduction />
            {algorithms.map((a) => (
              <AlgorithmSection key={a.id} algorithm={a} />
            ))}
            <ComparisonTable />
            <RasterLab />
            <Footer />
          </main>
        </div>
      </MotionConfig>
    </PixelAudioProvider>
  );
}
