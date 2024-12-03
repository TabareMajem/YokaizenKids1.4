import { useState } from 'react';
import { api } from '../lib/api';
import { useParentStore } from './useParentStore';
import { useStudentStore } from './useStudentStore';

export function useParentInvitation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addParent = useParentStore((state) => state.addParent);
  const linkStudent = useParentStore((state) => state.linkStudent);
  const updateStudent = useStudentStore((state) => state.updateStudent);

  const sendInvitation = async (studentId: string, parentEmail: string) => {
    try {
      setIsLoading(true);
      setError(null);

      if (import.meta.env.DEV) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Create mock parent account
        const parentId = Date.now().toString();
        addParent({
          id: parentId,
          name: `Parent of ${studentId}`,
          email: parentEmail,
          role: 'parent',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });

        // Update student with parent info
        updateStudent(studentId, {
          parentEmail,
          parentInviteStatus: 'sent',
          parentInviteSentAt: new Date().toISOString()
        });

        return;
      }

      // In production, call API
      const { data } = await api.post('/api/parent/invite', {
        studentId,
        parentEmail
      });

      addParent(data.parent);
      linkStudent(data.parent.id, studentId);
      updateStudent(studentId, {
        parentEmail,
        parentInviteStatus: 'sent',
        parentInviteSentAt: new Date().toISOString()
      });

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send invitation';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendInvitation,
    isLoading,
    error
  };
}