import { useState, useEffect, useRef } from 'react';
import { CardRecognitionService } from '../services/ar/cardRecognition';
import type { EmotionCard } from '../components/ar/types';

export function useCardRecognition() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detectedCard, setDetectedCard] = useState<{
    card: EmotionCard;
    confidence: number;
    corners: { x: number; y: number }[];
  } | null>(null);

  const serviceRef = useRef<CardRecognitionService | null>(null);
  const frameRef = useRef<number>();

  const initialize = async (videoElement: HTMLVideoElement) => {
    try {
      if (!serviceRef.current) {
        serviceRef.current = new CardRecognitionService();
      }

      await serviceRef.current.initialize(videoElement);
      setIsInitialized(true);
      setError(null);

      // Start detection loop
      startDetection();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to initialize card recognition';
      setError(message);
      setIsInitialized(false);
    }
  };

  const startDetection = () => {
    const detect = async () => {
      if (!serviceRef.current) return;

      try {
        const result = await serviceRef.current.detectCard();
        setDetectedCard(result);
      } catch (err) {
        console.error('Detection error:', err);
      }

      frameRef.current = requestAnimationFrame(detect);
    };

    frameRef.current = requestAnimationFrame(detect);
  };

  const stopDetection = () => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    
    if (serviceRef.current) {
      serviceRef.current.stop();
    }
  };

  useEffect(() => {
    return () => {
      stopDetection();
    };
  }, []);

  return {
    initialize,
    stopDetection,
    isInitialized,
    error,
    detectedCard
  };
}