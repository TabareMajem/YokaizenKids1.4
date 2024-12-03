import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { ParentContent } from '../types/parentContent';

// Mock data for development
const mockContents: ParentContent[] = [
  {
    id: '1',
    title: 'Emotion Expression Art Session',
    description: 'Help children express feelings through creative art activities',
    type: 'activity',
    duration: '30 minutes',
    emotionalFocus: ['emotional awareness', 'self-expression'],
    materials: ['Paper', 'Colors', 'Art supplies'],
    steps: [
      'Set up a comfortable art space',
      'Ask about their day and feelings',
      'Let them choose colors that match their emotions',
      'Create art together while discussing feelings'
    ],
    targetAge: [5, 12],
    status: 'published',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'admin'
  },
  {
    id: '2',
    title: 'Family Emotional Check-in',
    description: 'Interactive session to strengthen family emotional bonds',
    type: 'discussion',
    duration: '25 minutes',
    emotionalFocus: ['family connection', 'emotional sharing'],
    steps: [
      'Gather everyone in a comfortable space',
      'Share highlights and challenges',
      'Practice active listening',
      'End with positive affirmations'
    ],
    status: 'published',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'admin'
  }
];

export function useParentContent() {
  const [contents, setContents] = useState<ParentContent[]>(mockContents);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createContent = async (contentData: Partial<ParentContent>) => {
    try {
      setIsLoading(true);
      setError(null);

      if (import.meta.env.DEV) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newContent: ParentContent = {
          ...contentData as ParentContent,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'admin',
          status: 'draft'
        };

        setContents(prev => [...prev, newContent]);
        return newContent;
      }

      const { data } = await api.post('/api/admin/parent-content', contentData);
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

  const updateContent = async (id: string, contentData: Partial<ParentContent>) => {
    try {
      setIsLoading(true);
      setError(null);

      if (import.meta.env.DEV) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setContents(prev => prev.map(content =>
          content.id === id
            ? { ...content, ...contentData, updatedAt: new Date() }
            : content
        ));
        return;
      }

      const { data } = await api.put(`/api/admin/parent-content/${id}`, contentData);
      setContents(prev => prev.map(content =>
        content.id === id ? data.data : content
      ));
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
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setContents(prev => prev.filter(content => content.id !== id));
        return;
      }

      await api.delete(`/api/admin/parent-content/${id}`);
      setContents(prev => prev.filter(content => content.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete content';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    contents,
    createContent,
    updateContent,
    deleteContent,
    isLoading,
    error
  };
}