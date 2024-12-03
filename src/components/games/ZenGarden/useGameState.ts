import { useState, useCallback } from 'react';
import type { GardenElement } from './types';

export function useGameState() {
  const [elements, setElements] = useState<GardenElement[]>([]);
  const [score, setScore] = useState(0);
  const [reflection, setReflection] = useState('');

  const addElement = useCallback((element: GardenElement) => {
    setElements(prev => [...prev, element]);
  }, []);

  const moveElement = useCallback((id: string, position: { x: number; y: number }) => {
    setElements(prev => prev.map(element =>
      element.id === id ? { ...element, position } : element
    ));
  }, []);

  const removeElement = useCallback((id: string) => {
    setElements(prev => prev.filter(element => element.id !== id));
  }, []);

  const completeDesign = useCallback(() => {
    // Calculate score based on number of elements and reflection
    const baseScore = elements.length * 10;
    const reflectionBonus = reflection ? 50 : 0;
    setScore(baseScore + reflectionBonus);
  }, [elements.length, reflection]);

  return {
    elements,
    score,
    reflection,
    addElement,
    moveElement,
    removeElement,
    setReflection,
    completeDesign
  };
}