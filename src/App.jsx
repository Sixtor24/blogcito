import { MotionConfig } from "motion/react";
import { PixelAudioProvider } from "./audio/PixelAudio";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Introduction from "./components/Introduction";
import AlgorithmSection from "./components/AlgorithmSection";
import ComparisonTable from "./components/ComparisonTable";
import RasterLab from "./components/RasterLab";
import Footer from "./components/Footer";
import { algorithms } from "./data/algorithms";
export default function App() {
  return (
    <PixelAudioProvider>
      <MotionConfig reducedMotion="user">
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">
          <Hero />
          <Introduction />
          {algorithms.map((a) => (
            <AlgorithmSection key={a.id} algorithm={a} />
          ))}
          <ComparisonTable />
          <RasterLab />
          <Footer />
        </main>
      </MotionConfig>
    </PixelAudioProvider>
  );
}
