import { useState } from 'react';
import { api } from '../lib/api';

type TeacherSettings = {
  notifications: {
    email: boolean;
    inApp: boolean;
    parentUpdates: boolean;
    studentProgress: boolean;
  };
  email: {
    signature: string;
    replyTo: string;
    copyToSelf: boolean;
  };
  calendar: {
    defaultView: 'week' | 'month';
    weekStartsOn: 0 | 1 | 6;
    workingHours: {
      start: string;
      end: string;
    };
  };
  display: {
    theme: 'light' | 'dark' | 'system';
    colorScheme: string;
    language: string;
  };
  privacy: {
    showEmail: boolean;
    showProfile: boolean;
    allowMessages: boolean;
  };
};

export function useTeacherSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSettings = async (): Promise<TeacherSettings> => {
    try {
      setIsLoading(true);
      setError(null);

      if (import.meta.env.DEV) {
        // Return mock settings in development
        return {
          notifications: {
            email: true,
            inApp: true,
            parentUpdates: true,
            studentProgress: true
          },
          email: {
            signature: '',
            replyTo: '',
            copyToSelf: false
          },
          calendar: {
            defaultView: 'week',
            weekStartsOn: 1,
            workingHours: {
              start: '09:00',
              end: '17:00'
            }
          },
          display: {
            theme: 'system',
            colorScheme: 'purple',
            language: 'en'
          },
          privacy: {
            showEmail: false,
            showProfile: true,
            allowMessages: true
          }
        };
      }

      const { data } = await api.get('/api/teacher/settings');
      return data.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch settings';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSettings = async (settings: Partial<TeacherSettings>): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      if (import.meta.env.DEV) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return;
      }

      await api.put('/api/teacher/settings', settings);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update settings';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getSettings,
    updateSettings,
    isLoading,
    error
  };
}