import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { AssessmentData } from '../types/assessment';

export type ChildProgress = {
  id: string;
  name: string;
  recentMood: {
    value: number;
    dominantEmotion: string;
    timestamp: string;
  };
  weeklyActivity: {
    journalEntries: number;
    completedActivities: number;
    totalTime: number;
  };
  milestones: {
    completed: number;
    inProgress: number;
    total: number;
  };
  skills: Array<{
    name: string;
    progress: number;
  }>;
  assessments: AssessmentData[];
};

// Mock data for development
const mockChildren: ChildProgress[] = [
  {
    id: '1',
    name: 'Sarah',
    recentMood: {
      value: 0.8,
      dominantEmotion: 'Happy',
      timestamp: new Date().toISOString()
    },
    weeklyActivity: {
      journalEntries: 5,
      completedActivities: 8,
      totalTime: 180 // minutes
    },
    milestones: {
      completed: 3,
      inProgress: 1,
      total: 5
    },
    skills: [
      { name: 'Emotional Awareness', progress: 75 },
      { name: 'Self Expression', progress: 60 },
      { name: 'Empathy', progress: 85 }
    ],
    assessments: [
      {
        date: '2024-03-15',
        eiScores: {
          'emotional-awareness': 85,
          'empathy': 78,
          'social-skills': 82,
          'mindfulness': 75,
          'self-regulation': 80
        },
        bigFiveScores: {
          'openness': 82,
          'conscientiousness': 75,
          'extraversion': 68,
          'agreeableness': 85,
          'emotional-stability': 72
        },
        bullyingScores: {
          'victim': 25,
          'bystander': 65,
          'perpetrator': 15
        }
      }
    ]
  },
  {
    id: '2',
    name: 'Alex',
    recentMood: {
      value: 0.7,
      dominantEmotion: 'Content',
      timestamp: new Date().toISOString()
    },
    weeklyActivity: {
      journalEntries: 3,
      completedActivities: 6,
      totalTime: 150 // minutes
    },
    milestones: {
      completed: 2,
      inProgress: 2,
      total: 5
    },
    skills: [
      { name: 'Social Skills', progress: 70 },
      { name: 'Mindfulness', progress: 65 }
    ],
    assessments: [
      {
        date: '2024-03-14',
        eiScores: {
          'emotional-awareness': 72,
          'empathy': 85,
          'social-skills': 78,
          'mindfulness': 70,
          'self-regulation': 75
        },
        bigFiveScores: {
          'openness': 75,
          'conscientiousness': 80,
          'extraversion': 72,
          'agreeableness': 78,
          'emotional-stability': 68
        },
        bullyingScores: {
          'victim': 35,
          'bystander': 55,
          'perpetrator': 20
        }
      }
    ]
  }
];

export function useParentDashboard() {
  const [children, setChildren] = useState<ChildProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChildrenProgress = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (import.meta.env.DEV) {
          setChildren(mockChildren);
        } else {
          const { data } = await api.get('/api/parent/children/progress');
          setChildren(data.data);
        }
      } catch (err) {
        setError('Failed to fetch children\'s progress');
        setChildren(mockChildren); // Fallback to mock data
      } finally {
        setIsLoading(false);
      }
    };

    fetchChildrenProgress();
  }, []);

  const refreshProgress = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (import.meta.env.DEV) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setChildren(mockChildren);
      } else {
        const { data } = await api.get('/api/parent/children/progress');
        setChildren(data.data);
      }
    } catch (err) {
      setError('Failed to refresh progress');
      setChildren(mockChildren);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    children,
    isLoading,
    error,
    refreshProgress
  };
}