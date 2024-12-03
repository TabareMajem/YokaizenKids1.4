import { useState } from 'react';
import { api } from '../lib/api';

export function useParentEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendParentEmail = async (
    studentId: string,
    emailData: {
      subject: string;
      message: string;
      includeProgress?: boolean;
      includeActivities?: boolean;
    }
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data } = await api.post(`/api/teacher/students/${studentId}/email`, emailData);
      return data.success;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send email';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const sendBulkParentEmails = async (
    studentIds: string[],
    emailData: {
      subject: string;
      message: string;
      includeProgress?: boolean;
      includeActivities?: boolean;
    }
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data } = await api.post('/api/teacher/students/bulk-email', {
        studentIds,
        ...emailData
      });
      return data.success;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send emails';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendParentEmail,
    sendBulkParentEmails,
    isLoading,
    error
  };
}