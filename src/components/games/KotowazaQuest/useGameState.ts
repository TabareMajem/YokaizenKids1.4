import { useState, useCallback } from 'react';
import type { Location, Puzzle } from './types';

const puzzles: Record<string, Puzzle> = {
  shrine: {
    id: 'shrine',
    situation: "A student is struggling with a difficult task but wants to give up.",
    proverb: "七転び八起き (Nana korobi ya oki)",
    meaning: "Fall seven times, stand up eight - Never give up",
    options: [
      "七転び八起き - Fall seven times, stand up eight",
      "急がば回れ - More haste, less speed",
      "石の上にも三年 - Persistence leads to success"
    ],
    correctAnswer: "七転び八起き - Fall seven times, stand up eight"
  },
  market: {
    id: 'market',
    situation: "Someone is trying to do everything too quickly and making mistakes.",
    proverb: "急がば回れ (Isogaba maware)",
    meaning: "More haste, less speed - Take your time to do things right",
    options: [
      "急がば回れ - More haste, less speed",
      "七転び八起き - Fall seven times, stand up eight",
      "猿も木から落ちる - Even monkeys fall from trees"
    ],
    correctAnswer: "急がば回れ - More haste, less speed"
  }
  // Add more puzzles
};

export function useGameState() {
  const [score, setScore] = useState(0);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [solvedPuzzles, setSolvedPuzzles] = useState<string[]>([]);

  const selectLocation = useCallback((locationId: string) => {
    setCurrentLocation({
      id: locationId,
      name: locationId === 'shrine' ? 'Mountain Shrine' : 'Village Market',
      character: locationId === 'shrine' ? 'Old Monk' : 'Wise Merchant',
      x: 0,
      y: 0
    });
  }, []);

  const solvePuzzle = useCallback((answer: string) => {
    if (!currentLocation) return false;

    const puzzle = puzzles[currentLocation.id];
    const isCorrect = answer === puzzle.correctAnswer;

    if (isCorrect) {
      setScore(prev => prev + 100);
      setSolvedPuzzles(prev => [...prev, currentLocation.id]);
    }

    return isCorrect;
  }, [currentLocation]);

  return {
    score,
    currentLocation,
    currentPuzzle: currentLocation ? puzzles[currentLocation.id] : null,
    solvedPuzzles,
    selectLocation,
    solvePuzzle
  };
}