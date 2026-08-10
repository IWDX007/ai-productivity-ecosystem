"use client";

import { useEffect, useState } from "react";
import styles from "./AnimatedBackground.module.css";

interface Sparkle {
  id: number;
  left: number;
  top: number;
  delay: number;
}

export default function AnimatedBackground() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    // Generate sparkles ONLY on client side (fixes hydration mismatch)
    const generated = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
    }));
    setSparkles(generated);
  }, []);

  return (
    <div className={styles.container}>
      {/* Gradient orbs (static - no hydration issue) */}
      <div className={styles.orb + " " + styles.orb1} />
      <div className={styles.orb + " " + styles.orb2} />
      <div className={styles.orb + " " + styles.orb3} />

      {/* Sparkles (client-only render) */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className={styles.sparkle}
          style={{
            left: sparkle.left + "%",
            top: sparkle.top + "%",
            animationDelay: sparkle.delay + "s",
          }}
        />
      ))}
    </div>
  );
}