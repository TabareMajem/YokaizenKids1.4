import { useState, useEffect, useCallback } from 'react';
import type { Challenge } from './types';

const challenges: Challenge[] = [
  {
    id: 1,
    description: "Write a kind note to someone in your family.",
    points: 10
  },
  {
    id: 2,
    description: "Help a classmate with their homework.",
    points: 10
  },
  {
    id: 3,
    description: "Share your snack with someone during lunch.",
    points: 10
  }
  // Add more challenges to complete 25 days
];

export function useGameState() {
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [currentDay, setCurrentDay] = useState(1);

  useEffect(() => {
    // In a real app, this would be based on the actual date
    // For demo purposes, we'll use a mock current day
    setCurrentDay(Math.floor(Math.random() * 25) + 1);
  }, []);

  const isUnlocked = useCallback((day: number) => {
    return day <= currentDay;
  }, [currentDay]);

  const completeChallenge = useCallback((day: number) => {
    if (!completedChallenges.includes(day)) {
      setCompletedChallenges(prev => [...prev, day]);
      setScore(prev => prev + challenges[day - 1].points);
    }
  }, [completedChallenges]);

  return {
    challenges,
    completedChallenges,
    currentDay,
    score,
    completeChallenge,
    isUnlocked
  };
}