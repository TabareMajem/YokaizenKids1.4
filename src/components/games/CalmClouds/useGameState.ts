import { useState, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import type { Worry } from './types';

export function useGameState() {
  const [worries, setWorries] = useState<Worry[]>([]);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const addWorry = useCallback((text: string) => {
    setWorries(prev => [...prev, {
      id: uuid(),
      text,
      createdAt: new Date()
    }]);
  }, []);

  const removeWorry = useCallback((id: string) => {
    setWorries(prev => prev.filter(w => w.id !== id));
    setScore(prev => prev + 1);

    // Check if all worries are released
    if (worries.length === 1) {
      setIsComplete(true);
    }
  }, [worries.length]);

  return {
    worries,
    score,
    isComplete,
    addWorry,
    removeWorry,
    setIsComplete
  };
}