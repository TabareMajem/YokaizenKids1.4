import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CONFETTI_COLORS = [
  '#FF69B4', // Pink
  '#8B5CF6', // Purple
  '#FFD700', // Gold
  '#FF6B6B', // Coral
  '#4FD1C5', // Teal
];

type Particle = {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
};

export default function Confetti() {
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    // Generate confetti particles
    particles.current = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -20 - Math.random() * 20,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.5,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.current.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: `${particle.x}vw`,
            y: `${particle.y}vh`,
            rotate: particle.rotation,
            scale: particle.scale,
          }}
          animate={{
            y: '120vh',
            rotate: particle.rotation + 360,
          }}
          transition={{
            duration: 2.5 + Math.random() * 2,
            ease: [0.23, 0.51, 0.32, 0.95],
            repeat: Infinity,
          }}
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  );
}