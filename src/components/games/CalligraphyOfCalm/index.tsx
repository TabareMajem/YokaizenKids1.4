import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brush, Star, Heart, RefreshCw } from 'lucide-react';
import CanvasPanel from './CanvasPanel';
import BreathingGuide from './BreathingGuide';
import ProgressMeter from './ProgressMeter';
import { useGameState } from './useGameState';

export default function CalligraphyOfCalm() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isBreathing, setIsBreathing] = useState(true);
  const {
    currentKanji,
    score,
    accuracy,
    checkStroke,
    nextKanji,
    isComplete
  } = useGameState();

  useEffect(() => {
    // Start with breathing exercise
    const timer = setTimeout(() => {
      setIsBreathing(false);
    }, 10000); // 10 seconds breathing exercise

    return () => clearTimeout(timer);
  }, []);

  const handleStrokeComplete = (path: number[][]) => {
    const result = checkStroke(path);
    if (result.isComplete) {
      nextKanji();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Calligraphy of Calm</h1>
            <p className="text-gray-600">Practice mindful writing with Japanese kanji</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-amber-600">
              <Star className="w-5 h-5" />
              <span className="font-medium">{score} points</span>
            </div>
            <div className="flex items-center gap-2 text-purple-600">
              <Heart className="w-5 h-5" />
              <span className="font-medium">{Math.round(accuracy * 100)}% accuracy</span>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="relative aspect-[4/3] bg-white rounded-xl shadow-lg overflow-hidden">
          <AnimatePresence mode="wait">
            {isBreathing ? (
              <BreathingGuide onComplete={() => setIsBreathing(false)} />
            ) : (
              <>
                <CanvasPanel
                  ref={canvasRef}
                  kanji={currentKanji}
                  onStrokeComplete={handleStrokeComplete}
                />
                <ProgressMeter progress={accuracy} />
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Game Complete Screen */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
                flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-2xl p-8 text-center max-w-md"
              >
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center 
                  justify-center mx-auto mb-4">
                  <Brush className="w-8 h-8 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Practice Complete!
                </h2>
                <p className="text-gray-600 mb-6">
                  You've mastered the art of mindful calligraphy with 
                  {Math.round(accuracy * 100)}% accuracy!
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-amber-600 text-white rounded-lg
                    hover:bg-amber-700 transition-colors flex items-center 
                    gap-2 mx-auto"
                >
                  <RefreshCw className="w-5 h-5" />
                  Practice Again
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}