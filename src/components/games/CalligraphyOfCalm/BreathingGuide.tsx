import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wind } from 'lucide-react';

type Props = {
  onComplete: () => void;
};

export default function BreathingGuide({ onComplete }: Props) {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase(current => {
        switch (current) {
          case 'inhale': return 'hold';
          case 'hold': return 'exhale';
          case 'exhale': return 'inhale';
        }
      });
    }, 4000); // 4-second cycle

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white">
      <motion.div
        animate={{
          scale: phase === 'inhale' ? 1.5 : phase === 'exhale' ? 0.8 : 1
        }}
        transition={{ duration: 4, ease: "easeInOut" }}
        className="relative w-48 h-48 mb-12"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br 
          from-amber-500/20 to-purple-500/20" />
        <motion.div
          animate={{
            scale: phase === 'inhale' ? [1, 1.1] : phase === 'exhale' ? [1.1, 1] : 1,
            opacity: [0.5, 1]
          }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-gradient-to-br 
            from-amber-500 to-purple-500 blur-xl"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Wind className="w-16 h-16 text-white" />
        </div>
      </motion.div>

      <motion.div
        key={phase}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4">
          {phase.charAt(0).toUpperCase() + phase.slice(1)}
        </h2>
        <p className="text-xl text-amber-600">
          {phase === 'inhale' && "Breathe in slowly..."}
          {phase === 'hold' && "Hold your breath..."}
          {phase === 'exhale' && "Release slowly..."}
        </p>
      </motion.div>
    </div>
  );
}