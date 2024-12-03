import { useState, useCallback } from 'react';
import type { Kanji } from './types';

const kanjiSet: Kanji[] = [
  {
    character: '心',
    meaning: 'Heart/Mind',
    strokes: [
      [[100, 100], [200, 200]], // Simplified stroke paths
    ],
    template: 'https://example.com/kokoro.png'
  },
  {
    character: '和',
    meaning: 'Peace/Harmony',
    strokes: [
      [[150, 150], [250, 250]],
    ],
    template: 'https://example.com/wa.png'
  }
];

export function useGameState() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [accuracy, setAccuracy] = useState(1);
  const [completedStrokes, setCompletedStrokes] = useState<number>(0);

  const checkStroke = useCallback((path: number[][]) => {
    const currentKanji = kanjiSet[currentIndex];
    const targetStroke = currentKanji.strokes[completedStrokes];
    
    // Calculate stroke accuracy (simplified)
    const strokeAccuracy = 0.8 + Math.random() * 0.2; // Mock accuracy
    
    setAccuracy(prev => (prev + strokeAccuracy) / 2);
    setScore(prev => prev + Math.round(strokeAccuracy * 10));
    
    const isComplete = completedStrokes + 1 >= currentKanji.strokes.length;
    if (isComplete) {
      setCompletedStrokes(0);
    } else {
      setCompletedStrokes(prev => prev + 1);
    }
    
    return { isComplete, accuracy: strokeAccuracy };
  }, [currentIndex, completedStrokes]);

  const nextKanji = useCallback(() => {
    if (currentIndex < kanjiSet.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex]);

  return {
    currentKanji: kanjiSet[currentIndex],
    score,
    accuracy,
    checkStroke,
    nextKanji,
    isComplete: currentIndex === kanjiSet.length - 1
  };
}