```typescript
import { useState } from 'react';
import { api } from '../lib/api';
import type { Class, Student } from '../types/teacher';

export function useClassManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createClass = async (classData: Partial<Class>) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data } = await api.post('/api/teacher/classes', classData);
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create class';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateClass = async (classId: string, updates: Partial<Class>) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data } = await api.put(`/api/teacher/classes/${classId}`, updates);
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update class';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteClass = async (classId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      await api.delete(`/api/teacher/classes/${classId}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete class';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const addStudent = async (classId: string, studentData: Partial<Student>) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data } = await api.post(`/api/teacher/classes/${classId}/students`, studentData);
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add student';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeStudent = async (classId: string, studentId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      await api.delete(`/api/teacher/classes/${classId}/students/${studentId}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to remove student';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const inviteParent = async (studentId: string, email: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data } = await api.post(`/api/teacher/students/${studentId}/invite-parent`, { email });
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send parent invitation';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const resendParentInvitation = async (studentId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data } = await api.post(`/api/teacher/students/${studentId}/resend-invite`);
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to resend invitation';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createClass,
    updateClass,
    deleteClass,
    addStudent,
    removeStudent,
    inviteParent,
    resendParentInvitation,
    isLoading,
    error
  };
}
```