import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { loadPredefinedGames } from '../services/games/gamesLoader';
import type { Content } from '../types/content';

// Mock data for development
const mockContent: Content[] = [
  {
    id: 'activity-1',
    title: 'Understanding Emotions',
    description: 'Learn to identify and express different emotions',
    type: 'activity',
    category: 'emotional-awareness',
    status: 'published',
    content: 'Interactive activity about emotional awareness...',
    metadata: {
      ageRange: [5, 12],
      duration: 30,
      difficulty: 'beginner'
    },
    version: 1,
    createdBy: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'activity-2',
    title: 'Mindful Breathing',
    description: 'Practice calming breathing exercises',
    type: 'activity',
    category: 'mindfulness',
    status: 'published',
    content: 'Guided breathing exercises...',
    metadata: {
      ageRange: [5, 12],
      duration: 15,
      difficulty: 'beginner'
    },
    version: 1,
    createdBy: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export function useContent() {
  const [contents, setContents] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const listContent = async (params?: {
    type?: string;
    category?: string;
    status?: string;
    page?: number;
    limit?: number;
    search?: string;
  }) => {
    try {
      setIsLoading(true);
      setError(null);

      if (import.meta.env.DEV) {
        // Load predefined games
        const games = await loadPredefinedGames();
        const allContent = [...mockContent, ...games];
        setContents(allContent);
        return allContent;
      }

      const { data } = await api.get('/api/content', { params });
      setContents(data.data);
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch content';
      setError(message);
      return mockContent; // Fallback to mock data
    } finally {
      setIsLoading(false);
    }
  };

  const createContent = async (contentData: Partial<Content>) => {
    try {
      setIsLoading(true);
      setError(null);

      if (import.meta.env.DEV) {
        const newContent = {
          id: Date.now().toString(),
          ...contentData,
          status: 'published',
          version: 1,
          createdBy: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        } as Content;
        setContents(prev => [...prev, newContent]);
        return newContent;
      }

      const { data } = await api.post('/api/content', contentData);
      setContents(prev => [...prev, data.data]);
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create content';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateContent = async (id: string, contentData: Partial<Content>) => {
    try {
      setIsLoading(true);
      setError(null);

      if (import.meta.env.DEV) {
        const updatedContent = {
          ...contents.find(c => c.id === id),
          ...contentData,
          updatedAt: new Date()
        } as Content;
        setContents(prev => prev.map(c => c.id === id ? updatedContent : c));
        return updatedContent;
      }

      const { data } = await api.put(`/api/content/${id}`, contentData);
      setContents(prev => prev.map(c => c.id === id ? data.data : c));
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update content';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteContent = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      if (import.meta.env.DEV) {
        setContents(prev => prev.filter(c => c.id !== id));
        return;
      }

      await api.delete(`/api/content/${id}`);
      setContents(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete content';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Load initial content including games
  useEffect(() => {
    listContent();
  }, []);

  return {
    contents,
    listContent,
    createContent,
    updateContent,
    deleteContent,
    isLoading,
    error
  };
}