import { useState } from 'react';
import { processJournalEntry, type PipelineResult, type PipelineOptions } from '../services/ai/pipeline';
import { generateImage, type ImageGenerationOptions } from '../services/ai/imageGeneration';
import { ARRecognitionService, type ARDetectionResult } from '../services/ai/arRecognition';

export function useAIPipeline() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [arService] = useState(() => new ARRecognitionService());

  const processJournal = async (
    text: string,
    options?: PipelineOptions
  ): Promise<PipelineResult | null> => {
    try {
      setIsProcessing(true);
      setError(null);
      return await processJournalEntry(text, options);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to process journal';
      setError(message);
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  const generateMangaImage = async (
    prompt: string,
    options?: ImageGenerationOptions
  ): Promise<string | null> => {
    try {
      setIsProcessing(true);
      setError(null);
      return await generateImage(prompt, options);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate image';
      setError(message);
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  const initializeAR = async (videoElement: HTMLVideoElement): Promise<void> => {
    try {
      await arService.initialize(videoElement);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to initialize AR';
      setError(message);
      throw new Error(message);
    }
  };

  const detectARCard = async (): Promise<ARDetectionResult | null> => {
    try {
      return await arService.detectCard();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to detect AR card';
      setError(message);
      return null;
    }
  };

  const cleanup = () => {
    arService.stop();
  };

  return {
    processJournal,
    generateMangaImage,
    initializeAR,
    detectARCard,
    cleanup,
    isProcessing,
    error
  };
}