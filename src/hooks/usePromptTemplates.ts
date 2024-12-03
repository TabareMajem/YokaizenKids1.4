import { useState } from 'react';
import { api } from '../lib/api';

export type PromptTemplate = {
  id: string;
  name: string;
  description: string;
  template: string;
  version: number;
  isActive: boolean;
  variables: string[];
  createdBy: {
    name: string;
    email: string;
  };
  lastModified: string;
};

export type PromptChange = {
  id: string;
  templateId: string;
  userId: {
    name: string;
    email: string;
  };
  oldVersion: number;
  newVersion: number;
  changes: Array<{
    field: string;
    oldValue: string;
    newValue: string;
  }>;
  timestamp: string;
};

export function usePromptTemplates() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTemplates = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get('/api/admin/prompts');
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch templates';
      setError(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getTemplate = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/api/admin/prompts/${id}`);
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch template';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const createTemplate = async (templateData: Partial<PromptTemplate>) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/api/admin/prompts', templateData);
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create template';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTemplate = async (id: string, templateData: Partial<PromptTemplate>) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.put(`/api/admin/prompts/${id}`, templateData);
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update template';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTemplate = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.delete(`/api/admin/prompts/${id}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete template';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const getTemplateHistory = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/api/admin/prompts/${id}/history`);
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch template history';
      setError(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getTemplates,
    getTemplate,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    getTemplateHistory,
    isLoading,
    error
  };
}