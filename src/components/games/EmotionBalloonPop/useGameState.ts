import { useState, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import type { GameBalloon } from './types';

const emotions = ['happy', 'sad', 'angry', 'surprised', 'scared'];

export function useGameState() {
  const [score, setScore] = useState(0);
  const [targetEmotion, setTargetEmotion] = useState(() => 
    emotions[Math.floor(Math.random() * emotions.length)]
  );
  const [balloons, setBalloons] = useState<GameBalloon[]>([]);

  const addScore = useCallback((points: number) => {
    setScore(prev => prev + points);
  }, []);

  const subtractScore = useCallback((points: number) => {
    setScore(prev => Math.max(0, prev - points));
  }, []);

  const spawnBalloon = useCallback(() => {
    const newBalloon: GameBalloon = {
      id: uuid(),
      emotion: emotions[Math.floor(Math.random() * emotions.length)],
      x: Math.random() * 80 + 10, // 10% to 90% of width
      speed: Math.random() * 2 + 3 // 3 to 5 seconds
    };

    setBalloons(prev => [...prev, newBalloon]);
  }, []);

  const popBalloon = useCallback((id: string) => {
    setBalloons(prev => prev.filter(b => b.id !== id));
  }, []);

  return {
    score,
    targetEmotion,
    balloons,
    addScore,
    subtractScore,
    spawnBalloon,
    popBalloon
  };
}