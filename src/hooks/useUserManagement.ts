import { useState } from 'react';
import { api } from '../lib/api';
import type { User } from '../types/user';

export function useUserManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUsers = async (params?: { 
    role?: string; 
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    try {
      setIsLoading(true);
      setError(null);

      // In development, return mock data
      if (import.meta.env.DEV) {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
        return getMockUsers();
      }

      const { data } = await api.get('/api/users', { params });
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch users';
      setError(message);
      return getMockUsers(); // Return mock data as fallback
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = async (userData: Partial<User>) => {
    try {
      setIsLoading(true);
      setError(null);

      if (import.meta.env.DEV) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
          id: Date.now().toString(),
          ...userData,
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
      }

      const { data } = await api.post('/api/users', userData);
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create user';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (userId: string, userData: Partial<User>) => {
    try {
      setIsLoading(true);
      setError(null);

      if (import.meta.env.DEV) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
          id: userId,
          ...userData,
          updatedAt: new Date().toISOString()
        };
      }

      const { data } = await api.put(`/api/users/${userId}`, userData);
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update user';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      if (import.meta.env.DEV) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return;
      }

      await api.delete(`/api/users/${userId}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete user';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    isLoading,
    error
  };
}

// Mock data helper
function getMockUsers(): User[] {
  return [
    {
      id: '1',
      name: 'John Teacher',
      email: 'john@example.com',
      role: 'teacher',
      status: 'active',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    },
    {
      id: '2',
      name: 'Sarah Parent',
      email: 'sarah@example.com',
      role: 'parent',
      status: 'active',
      createdAt: '2024-01-02T00:00:00.000Z',
      updatedAt: '2024-01-02T00:00:00.000Z'
    },
    {
      id: '3',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      status: 'active',
      createdAt: '2024-01-03T00:00:00.000Z',
      updatedAt: '2024-01-03T00:00:00.000Z'
    }
  ];
}