import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { User } from '../types/user';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get('/api/users');
      setUsers(data.data);
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async (userData: Partial<User>) => {
    try {
      const { data } = await api.post('/api/users', userData);
      setUsers(prev => [...prev, data.data]);
      return data.data;
    } catch (err) {
      throw new Error('Failed to create user');
    }
  };

  const updateUser = async (userId: string, userData: Partial<User>) => {
    try {
      const { data } = await api.put(`/api/users/${userId}`, userData);
      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, ...data.data } : user
      ));
      return data.data;
    } catch (err) {
      throw new Error('Failed to update user');
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await api.delete(`/api/users/${userId}`);
      setUsers(prev => prev.filter(user => user.id !== userId));
    } catch (err) {
      throw new Error('Failed to delete user');
    }
  };

  return {
    users,
    isLoading,
    error,
    createUser,
    updateUser,
    deleteUser
  };
}