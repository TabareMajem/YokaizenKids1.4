import { useState, useCallback } from 'react';
import type { EmotionMask, GamePrompt } from './types';

const prompts: GamePrompt[] = [
  {
    id: 'happy',
    title: 'Show me happy!',
    description: 'Think of something that makes you smile',
    targetEmotion: 'happy'
  },
  {
    id: 'sad',
    title: 'Show me sad',
    description: 'Think of a time when you felt down',
    targetEmotion: 'sad'
  }
  // Add more prompts
];

export function useARMasks() {
  const [currentMask, setCurrentMask] = useState<EmotionMask | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState<GamePrompt>(prompts[0]);

  const initializeAR = useCallback(async (videoElement: HTMLVideoElement) => {
    // In a real implementation, this would initialize face tracking
    // For now, we'll just return true
    return true;
  }, []);

  const selectMask = useCallback((mask: EmotionMask) => {
    setCurrentMask(mask);
  }, []);

  const checkAnswer = useCallback((mask: EmotionMask) => {
    return mask.emotion === currentPrompt.targetEmotion;
  }, [currentPrompt]);

  const nextPrompt = useCallback(() => {
    const currentIndex = prompts.findIndex(p => p.id === currentPrompt.id);
    const nextIndex = (currentIndex + 1) % prompts.length;
    setCurrentPrompt(prompts[nextIndex]);
    setCurrentMask(null);
  }, [currentPrompt]);

  return {
    currentMask,
    currentPrompt,
    initializeAR,
    selectMask,
    checkAnswer,
    nextPrompt
  };
}