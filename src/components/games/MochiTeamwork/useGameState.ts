import { useState, useCallback, useEffect } from 'react';
import type { GameRole } from './types';

const GAME_DURATION = 60; // seconds
const PERFECT_TIMING = 1000; // milliseconds
const TIMING_WINDOW = 200; // milliseconds

export function useGameState() {
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [currentRole, setCurrentRole] = useState<GameRole>('pounder');
  const [lastActionTime, setLastActionTime] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);

  useEffect(() => {
    if (isGameActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsGameOver(true);
            setIsGameActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isGameActive, timeLeft]);

  const startGame = useCallback(() => {
    setIsGameActive(true);
    setTimeLeft(GAME_DURATION);
    setScore(0);
    setCombo(0);
    setIsGameOver(false);
  }, []);

  const resetGame = useCallback(() => {
    startGame();
  }, [startGame]);

  const switchRole = useCallback(() => {
    setCurrentRole(prev => prev === 'pounder' ? 'turner' : 'pounder');
  }, []);

  const checkTiming = useCallback(() => {
    const now = Date.now();
    const timeDiff = now - lastActionTime;

    // First action
    if (lastActionTime === 0) {
      setLastActionTime(now);
      return;
    }

    // Check timing accuracy
    const accuracy = Math.abs(PERFECT_TIMING - timeDiff);
    if (accuracy <= TIMING_WINDOW) {
      // Perfect timing
      setCombo(prev => prev + 1);
      setScore(prev => prev + (10 * (combo + 1)));
    } else if (accuracy <= TIMING_WINDOW * 2) {
      // Good timing
      setScore(prev => prev + 5);
      setCombo(0);
    } else {
      // Bad timing
      setCombo(0);
    }

    setLastActionTime(now);
  }, [lastActionTime, combo]);

  return {
    score,
    combo,
    timeLeft,
    currentRole,
    isGameOver,
    startGame,
    resetGame,
    switchRole,
    checkTiming
  };
}