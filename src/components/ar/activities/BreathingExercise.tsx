import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, ArrowLeft } from 'lucide-react';

type Props = {
  duration?: number;
  onComplete?: () => void;
};

export default function BreathingExercise({ duration = 60, onComplete }: Props) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
      
      // Cycle through breathing phases
      setPhase(current => {
        switch (current) {
          case 'inhale': return 'hold';
          case 'hold': return 'exhale';
          case 'exhale': return 'inhale';
        }
      });
    }, 4000); // 4-second cycle

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Breathing Circle */}
      <motion.div
        animate={{
          scale: phase === 'inhale' ? 1.5 : phase === 'exhale' ? 0.8 : 1,
        }}
        transition={{ duration: 4, ease: "easeInOut" }}
        className="relative w-48 h-48 mb-12"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br 
          from-purple-500/20 to-pink-500/20" />
        <motion.div
          animate={{
            scale: phase === 'inhale' ? [1, 1.1] : phase === 'exhale' ? [1.1, 1] : 1,
            opacity: [0.5, 1]
          }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-gradient-to-br 
            from-purple-500 to-pink-500 blur-xl"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Wind className="w-16 h-16 text-white" />
        </div>
      </motion.div>

      {/* Instructions */}
      <AnimatePresence mode="wait">
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
          <p className="text-xl text-purple-200">
            {phase === 'inhale' && "Breathe in slowly..."}
            {phase === 'hold' && "Hold your breath..."}
            {phase === 'exhale' && "Release slowly..."}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Timer */}
      <div className="mt-12 text-center">
        <p className="text-lg text-purple-300">
          Time remaining: {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, '0')}
        </p>
      </div>
    </div>
  );
}