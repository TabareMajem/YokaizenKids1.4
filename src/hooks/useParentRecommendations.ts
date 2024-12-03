import { useState } from 'react';
import { api } from '../lib/api';
import type { EIScores } from './useQuizResults';
import type { BigFiveScores } from './useBigFiveResults';

export type ParentActivity = {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'discussion' | 'activity' | 'exercise';
  emotionalFocus: string[];
  personalityTraits?: string[];
  materials?: string[];
  steps?: string[];
};

export function useParentRecommendations() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateRecommendations = async (
    eiScores?: EIScores,
    bigFiveScores?: BigFiveScores
  ): Promise<ParentActivity[]> => {
    try {
      setIsLoading(true);
      setError(null);

      // In development, return mock recommendations
      if (import.meta.env.DEV) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        return getMockRecommendations(eiScores, bigFiveScores);
      }

      const { data } = await api.post('/api/parent/recommendations', {
        eiScores,
        bigFiveScores
      });

      return data.recommendations;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate recommendations';
      setError(message);
      return getMockRecommendations(eiScores, bigFiveScores); // Fallback to mock data
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateRecommendations,
    isLoading,
    error
  };
}

function getMockRecommendations(
  eiScores?: EIScores,
  bigFiveScores?: BigFiveScores
): ParentActivity[] {
  // Base activities that are always recommended
  const baseActivities: ParentActivity[] = [
    {
      id: '1',
      title: 'Emotion Expression Art Session',
      description: 'Help your child express feelings through creative art activities',
      duration: '30 minutes',
      type: 'activity',
      emotionalFocus: ['emotional-awareness', 'self-expression'],
      personalityTraits: ['openness'],
      materials: ['Paper', 'Colors', 'Art supplies'],
      steps: [
        'Set up a comfortable art space',
        'Ask about their day and feelings',
        'Let them choose colors that match their emotions',
        'Create art together while discussing feelings'
      ]
    },
    {
      id: '2',
      title: 'Family Emotional Check-in',
      description: 'Interactive session to strengthen family emotional bonds',
      duration: '25 minutes',
      type: 'discussion',
      emotionalFocus: ['empathy', 'social-skills'],
      personalityTraits: ['extraversion', 'agreeableness'],
      steps: [
        'Gather everyone in a comfortable space',
        'Share highlights and challenges',
        'Practice active listening',
        'End with positive affirmations'
      ]
    }
  ];

  // Add targeted activities based on scores
  if (eiScores) {
    const lowEIScores = Object.entries(eiScores)
      .filter(([_, score]) => score < 70)
      .map(([category]) => category);

    lowEIScores.forEach(category => {
      baseActivities.push({
        id: `ei_${category}`,
        title: `${category.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')} Builder`,
        description: `Focused activity to develop ${category} skills`,
        duration: '20 minutes',
        type: 'exercise',
        emotionalFocus: [category],
        steps: [
          'Introduction to the concept',
          'Guided practice',
          'Real-world application',
          'Reflection and discussion'
        ]
      });
    });
  }

  if (bigFiveScores) {
    const lowBigFiveScores = Object.entries(bigFiveScores)
      .filter(([_, score]) => score < 70)
      .map(([trait]) => trait);

    lowBigFiveScores.forEach(trait => {
      baseActivities.push({
        id: `bf_${trait}`,
        title: `${trait.charAt(0).toUpperCase() + trait.slice(1)} Development`,
        description: `Activities to nurture ${trait} characteristics`,
        duration: '25 minutes',
        type: 'activity',
        emotionalFocus: ['self-awareness'],
        personalityTraits: [trait],
        steps: [
          'Understand the trait',
          'Practice related skills',
          'Set personal goals',
          'Track progress'
        ]
      });
    });
  }

  return baseActivities;
}