import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { QuizQuestion, QuizResult, QuizSession } from '../types/quiz';

export function useQuiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = async (category?: string, difficulty?: string) => {
    try {
      setIsLoading(true);
      setError(null);

      if (import.meta.env.DEV) {
        // Use mock data in development
        await new Promise(resolve => setTimeout(resolve, 1000));
        setQuestions(getMockQuestions());
        return;
      }

      const { data } = await api.get('/api/quiz/questions', {
        params: { category, difficulty }
      });
      setQuestions(data.data);
    } catch (err) {
      setError('Failed to fetch quiz questions');
      console.error('Error fetching quiz questions:', err);
      // Use mock data as fallback
      setQuestions(getMockQuestions());
    } finally {
      setIsLoading(false);
    }
  };

  const submitQuizResults = async (results: QuizResult[]): Promise<QuizSession> => {
    try {
      setIsLoading(true);
      setError(null);

      if (import.meta.env.DEV) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return getMockSession(results);
      }

      const { data } = await api.post('/api/quiz/results', { results });
      return data.data;
    } catch (err) {
      setError('Failed to submit quiz results');
      console.error('Error submitting quiz results:', err);
      // Return mock session as fallback
      return getMockSession(results);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    questions,
    fetchQuestions,
    submitQuizResults,
    isLoading,
    error
  };
}

// Mock data helpers
function getMockQuestions(): QuizQuestion[] {
  return [
    {
      id: '1',
      text: 'How would you feel in this situation?',
      image: {
        url: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&h=600',
        alt: 'Children playing together in a park'
      },
      answers: [
        {
          id: 'a1',
          text: 'Happy and excited',
          image: {
            url: 'https://images.unsplash.com/photo-1545315003-c5ad6226c272?w=400&h=300',
            alt: 'Happy face emoji'
          },
          isCorrect: true
        },
        {
          id: 'a2',
          text: 'Nervous and worried',
          image: {
            url: 'https://images.unsplash.com/photo-1546539782-6fc531453083?w=400&h=300',
            alt: 'Worried face emoji'
          },
          isCorrect: false
        }
      ],
      type: 'single-choice',
      category: 'emotional-awareness',
      difficulty: 'beginner',
      points: 10,
      timeLimit: 30
    },
    // Add more mock questions as needed
  ];
}

function getMockSession(results: QuizResult[]): QuizSession {
  const totalPoints = results.reduce((sum, result) => sum + result.points, 0);
  const totalTime = results.reduce((sum, result) => sum + result.timeSpent, 0);

  return {
    id: Date.now().toString(),
    userId: 'mock-user',
    startedAt: new Date(Date.now() - totalTime * 1000),
    completedAt: new Date(),
    results,
    totalPoints,
    averageTime: totalTime / results.length,
    skillScores: {
      'emotional-awareness': 85,
      'social-skills': 75,
      'mindfulness': 90
    }
  };
}