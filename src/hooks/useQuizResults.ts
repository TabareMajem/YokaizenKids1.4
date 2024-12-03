import { useState } from 'react';
import { api } from '../lib/api';
import type { QuizResult } from '../types/quiz';
import { calculateCategoryScore, getCategories } from '../data/eiQuestions';

export type EIScores = {
  'emotional-awareness': number;
  'empathy': number;
  'social-skills': number;
  'mindfulness': number;
  'self-regulation': number;
};

export function useQuizResults() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processResults = async (results: QuizResult[]): Promise<EIScores> => {
    try {
      setIsLoading(true);
      setError(null);

      // In development, calculate scores locally
      if (import.meta.env.DEV) {
        const categories = getCategories();
        const scores = categories.reduce((acc, category) => {
          acc[category as keyof EIScores] = calculateCategoryScore(results, category);
          return acc;
        }, {} as EIScores);

        return scores;
      }

      // In production, send to API for processing
      const { data } = await api.post('/api/quiz/process-results', { results });
      return data.scores;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to process quiz results';
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