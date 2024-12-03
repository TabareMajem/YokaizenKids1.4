import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, Trophy } from 'lucide-react';
import GameCanvas from './GameCanvas';
import ScoreCounter from './ScoreCounter';
import GameOverScreen from './GameOverScreen';
import { useGameState } from './useGameState';

const GAME_DURATION = 60; // seconds

export default function EmotionBalloonPop() {
  const {
    score,
    targetEmotion,
    balloons,
    addScore,
    subtractScore,
    spawnBalloon,
    popBalloon
  } = useGameState();

  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [combo, setCombo] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Start game timer
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Spawn initial balloons
    for (let i = 0; i < 5; i++) {
      spawnBalloon();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleBalloonPop = (balloonId: string, emotion: string) => {
    if (emotion === targetEmotion) {
      setCombo(prev => prev + 1);
      addScore(10 * (combo + 1));
    } else {
      setCombo(0);
      subtractScore(5);
    }
    popBalloon(balloonId);
    spawnBalloon();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Emotion Balloon Pop</h1>
          <div className="flex items-center gap-4">
            <ScoreCounter score={score} combo={combo} />
            <div className="flex items-center gap-2 text-orange-600">
              <Clock className="w-5 h-5" />
              <span className="font-medium">{timeLeft}s</span>
            </div>
          </div>
        </div>

        {/* Target Emotion */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 text-center">
          <p className="text-gray-600">Find and pop all the</p>
          <h2 className="text-2xl font-bold text-purple-600">
            {targetEmotion} balloons!
          </h2>
        </div>

        {/* Game Canvas */}
        <div className="relative aspect-[16/9] bg-gradient-to-b from-blue-100 to-blue-50 
          rounded-xl shadow-lg overflow-hidden">
          <GameCanvas
            balloons={balloons}
            onBalloonPop={handleBalloonPop}
            disabled={isGameOver}
          />
        </div>

        {/* Game Over Screen */}
        <AnimatePresence>
          {isGameOver && (
            <GameOverScreen
              score={score}
              onPlayAgain={() => window.location.reload()}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}