```typescript
import { useState } from 'react';
import { generateRecommendations, getActivityDescription, getProgressSuggestions } from '../services/recommendations/eiRecommendations';
import type { ParentActivity } from './useParentRecommendations';
import type { EIScores } from './useQuizResults';

export function useActivityRecommendations() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRecommendations = async (
    scores: EIScores,
    culturalContext: 'jp' | 'us' = 'us',
    previousScores?: EIScores
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const activities = generateRecommendations(scores, culturalContext);
      const suggestions = getProgressSuggestions(scores, previousScores);

      return {
        activities,
        suggestions,
        descriptions: activities.reduce((acc, activity) => {
          acc[activity.id] = getActivityDescription(activity, scores);
          return acc;
        }, {} as Record<string, string>)
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate recommendations';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getRecommendations,
    isLoading,
    error
  };
}