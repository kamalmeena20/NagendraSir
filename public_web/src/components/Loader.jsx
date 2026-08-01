import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./loader.css";

const PHYSICS_FACTS = [
  {
    term: "Neutron",
    symbol: "n⁰",
    meaning:
      "A neutral particle in the atomic nucleus. Neutrons reveal material structure through scattering and drive nuclear interactions.",
  },
  {
    term: "Electric Field",
    symbol: "E",
    meaning:
      "A force field around electric charges. It pushes or pulls other charges and shapes how light and matter interact.",
  },
  {
    term: "Magnetic Field",
    symbol: "B",
    meaning:
      "A field produced by moving charges and magnets. It guides charged particles and underpins motors, sensors, and quantum devices.",
  },
  {
    term: "Photon",
    symbol: "γ",
    meaning:
      "A quantum packet of light energy. Photons carry information in optics, lasers, and next-generation photonic systems.",
  },
  {
    term: "Quantum Metrology",
    symbol: "ℏ",
    meaning:
      "Ultra-precise measurement using quantum states — enabling advanced sensing beyond classical limits.",
  },
];

export default function Loader() {
  const [index, setIndex] = useState(0);
  const fact = useMemo(() => PHYSICS_FACTS[index], [index]);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % PHYSICS_FACTS.length);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="physics-loader">
      <div className="physics-loader__orbits" aria-hidden="true">
        <span className="orbit orbit-1" />
        <span className="orbit orbit-2" />
        <span className="orbit orbit-3" />
        <span className="core" />
        <span className="particle p1" />
        <span className="particle p2" />
        <span className="particle p3" />
      </div>

      <div className="physics-loader__copy">
        <p className="physics-loader__eyebrow">Loading Lab Insights</p>

        <AnimatePresence mode="wait">
          <motion.div
            key={fact.term}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="physics-loader__fact"
          >
            <div className="physics-loader__term-row">
              <span className="physics-loader__symbol">{fact.symbol}</span>
              <h2 className="physics-loader__term">{fact.term}</h2>
            </div>
            <p className="physics-loader__meaning">{fact.meaning}</p>
          </motion.div>
        </AnimatePresence>

        <div className="physics-loader__dots">
          {PHYSICS_FACTS.map((item, i) => (
            <span
              key={item.term}
              className={`dot ${i === index ? "active" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
