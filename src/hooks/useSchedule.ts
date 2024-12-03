import { useState } from 'react';
import { api } from '../lib/api';
import type { ClassSchedule } from '../types/teacher';

export function useSchedule() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getClassSchedule = async (classId: string, startDate: Date, endDate: Date) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data } = await api.get(`/api/teacher/classes/${classId}/schedule`, {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        }
      });
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch schedule';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const createScheduleEvent = async (classId: string, eventData: Partial<ClassSchedule>) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data } = await api.post(`/api/teacher/classes/${classId}/schedule`, eventData);
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create event';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateScheduleEvent = async (classId: string, eventId: string, updates: Partial<ClassSchedule>) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data } = await api.put(`/api/teacher/classes/${classId}/schedule/${eventId}`, updates);
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update event';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteScheduleEvent = async (classId: string, eventId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      await api.delete(`/api/teacher/classes/${classId}/schedule/${eventId}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete event';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getClassSchedule,
    createScheduleEvent,
    updateScheduleEvent,
    deleteScheduleEvent,
    isLoading,
    error
  };
}