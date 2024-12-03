import { useState } from 'react';
import { api } from '../lib/api';
import { calculateBullyingRisk, generateRecommendations } from '../data/bullyingQuestions';

export type BullyingScores = {
  victim: number;
  bystander: number;
  perpetrator: number;
};

export function useBullyingAssessment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processResults = async (responses: { questionId: string; value: number; }[]): Promise<BullyingScores> => {
    try {
      setIsLoading(true);
      setError(null);

      // In development, calculate scores locally
      if (import.meta.env.DEV) {
        const scores = calculateBullyingRisk(responses);
        return scores as BullyingScores;
      }

      // In production, send to API for processing
      const { data } = await api.post('/api/quiz/process-bullying', { responses });
      return data.scores;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to process assessment results';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const getRecommendations = (scores: BullyingScores) => {
    return generateRecommendations(scores);
  };

  return {
    processResults,
    getRecommendations,
    isLoading,
    error
  };
}