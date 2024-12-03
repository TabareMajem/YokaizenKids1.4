import { useState } from 'react';
import { api } from '../lib/api';
import type { ThematicPath, Milestone } from '../types/thematicPath';

// Mock data for development
const mockPaths: ThematicPath[] = [
  {
    id: '1',
    name: 'Winter Village Journey',
    theme: 'Winter Wonderland',
    backgroundImage: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=1920&h=1080',
    milestones: [
      {
        id: '1',
        position: { x: 20, y: 80 },
        activityId: 'activity-1',
        status: 'completed'
      },
      {
        id: '2',
        position: { x: 50, y: 50 },
        activityId: 'activity-2',
        status: 'current'
      },
      {
        id: '3',
        position: { x: 80, y: 20 },
        activityId: 'activity-3',
        status: 'locked'
      }
    ],
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    grade: '5th',
    createdBy: 'admin',
    lastModified: new Date()
  }
];

export function useThematicPaths() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPaths = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (import.meta.env.DEV) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockPaths;
      }

      const { data } = await api.get('/api/admin/paths');
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch paths';
      setError(message);
      return mockPaths; // Fallback to mock data
    } finally {
      setIsLoading(false);
    }
  };

  const getPath = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      if (import.meta.env.DEV) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockPaths.find(p => p.id === id);
      }

      const { data } = await api.get(`/api/admin/paths/${id}`);
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch path';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const createPath = async (pathData: Partial<ThematicPath>) => {
    try {
      setIsLoading(true);
      setError(null);

      if (import.meta.env.DEV) {
        await new Promise(resolve => setTimeout(resolve, 500));
        const newPath = {
          ...pathData,
          id: Date.now().toString(),
          createdBy: 'admin',
          lastModified: new Date()
        } as ThematicPath;
        mockPaths.push(newPath);
        return newPath;
      }

      const { data } = await api.post('/api/admin/paths', pathData);
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create path';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePath = async (id: string, pathData: Partial<ThematicPath>) => {
    try {
      setIsLoading(true);
      setError(null);

      if (import.meta.env.DEV) {
        await new Promise(resolve => setTimeout(resolve, 500));
        const index = mockPaths.findIndex(p => p.id === id);
        if (index !== -1) {
          mockPaths[index] = {
            ...mockPaths[index],
            ...pathData,
            lastModified: new Date()
          };
          return mockPaths[index];
        }
        throw new Error('Path not found');
      }

      const { data } = await api.put(`/api/admin/paths/${id}`, pathData);
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update path';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const deletePath = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      if (import.meta.env.DEV) {
        await new Promise(resolve => setTimeout(resolve, 500));
        const index = mockPaths.findIndex(p => p.id === id);
        if (index !== -1) {
          mockPaths.splice(index, 1);
          return;
        }
        throw new Error('Path not found');
      }

      await api.delete(`/api/admin/paths/${id}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete path';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateMilestonePosition = async (
    pathId: string,
    milestoneId: string,
    position: { x: number; y: number }
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      if (import.meta.env.DEV) {
        await new Promise(resolve => setTimeout(resolve, 500));
        const path = mockPaths.find(p => p.id === pathId);
        if (path) {
          const milestone = path.milestones.find(m => m.id === milestoneId);
          if (milestone) {
            milestone.position = position;
            return milestone;
          }
        }
        throw new Error('Milestone not found');
      }

      const { data } = await api.put(
        `/api/admin/paths/${pathId}/milestones/${milestoneId}/position`,
        { position }
      );
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update milestone position';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getPaths,
    getPath,
    createPath,
    updatePath,
    deletePath,
    updateMilestonePosition,
    isLoading,
    error
  };
}