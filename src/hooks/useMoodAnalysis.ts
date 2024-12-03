import { useState } from 'react';
import { analyzeMood, aggregateWeeklyMoods } from '../services/moodAnalysis';
import type { MoodScore, DailyMood, WeeklyInsight } from '../services/moodAnalysis';

export function useMoodAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeJournalEntry = async (text: string): Promise<MoodScore | null> => {
    try {
      setIsAnalyzing(true);
      setError(null);
      return await analyzeMood(text);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze mood';
      setError(errorMessage);
      console.error('Mood analysis error:', errorMessage);
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getWeeklyInsights = (dailyMoods: DailyMood[]): WeeklyInsight[] => {
    try {
      return aggregateWeeklyMoods(dailyMoods);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate insights';
      setError(errorMessage);
      console.error('Weekly insights error:', errorMessage);
      return [];
    }
  };

  return {
    analyzeJournalEntry,
    getWeeklyInsights,
    isAnalyzing,
    error
  };
}