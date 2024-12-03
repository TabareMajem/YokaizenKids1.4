import { useState } from 'react';
import { api } from '../lib/api';
import type { QuizResult } from '../types/quiz';
import { calculateBigFiveScore, getBigFiveTraits } from '../data/bigFiveQuestions';

export type BigFiveScores = {
  'openness': number;
  'conscientiousness': number;
  'extraversion': number;
  'agreeableness': number;
  'emotional-stability': number;
};

export function useBigFiveResults() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processResults = async (responses: { questionId: string; value: number; }[]): Promise<BigFiveScores> => {
    try {
      setIsLoading(true);
      setError(null);

      // In development, calculate scores locally
      if (import.meta.env.DEV) {
        const traits = getBigFiveTraits();
        const scores = traits.reduce((acc, trait) => {
          acc[trait as keyof BigFiveScores] = calculateBigFiveScore(responses, trait);
          return acc;
        }, {} as BigFiveScores);

        return scores;
      }

      // In production, send to API for processing
      const { data } = await api.post('/api/quiz/process-big-five', { responses });
      return data.scores;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to process assessment results';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    processResults,
    isLoading,
    error
  };
}