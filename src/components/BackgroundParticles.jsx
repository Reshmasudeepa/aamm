import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function BackgroundParticles() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const items = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 18 + 10,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 5,
      type: i % 3 === 0 ? "heart" : i % 3 === 1 ? "sparkle" : "orb",
    }));
    setParticles(items);
  }, []);

  return (
    <div className="bg-particles-container" aria-hidden="true">
      {/* Ambient Glowing Orbs */}
      <div className="ambient-orb orb-1" />
      <div className="ambient-orb orb-2" />
      <div className="ambient-orb orb-3" />

      {/* Floating Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`floating-particle particle-${p.type}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
          }}
          animate={{
            y: ["0vh", "-30vh", "0vh"],
            x: ["0vw", `${Math.sin(p.id) * 5}vw`, "0vw"],
            opacity: [0.15, 0.65, 0.15],
            scale: [0.9, 1.2, 0.9],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        >
          {p.type === "heart" ? "💗" : p.type === "sparkle" ? "✨" : "🌸"}
        </motion.div>
      ))}
    </div>
  );
}
