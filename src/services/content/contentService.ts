import { api } from '../../lib/api';
import type { Content } from '../../types/content';

export async function fetchContent(params?: {
  type?: string;
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
  search?: string;
}) {
  try {
    const { data } = await api.get('/api/content', { params });
    return data.data;
  } catch (error) {
    console.error('Content fetch error:', error);
    throw error;
  }
}

export async function createContent(contentData: Partial<Content>) {
  try {
    const { data } = await api.post('/api/content', contentData);
    return data.data;
  } catch (error) {
    console.error('Content creation error:', error);
    throw error;
  }
}

export async function updateContent(id: string, contentData: Partial<Content>) {
  try {
    const { data } = await api.put(`/api/content/${id}`, contentData);
    return data.data;
  } catch (error) {
    console.error('Content update error:', error);
    throw error;
  }
}

export async function deleteContent(id: string) {
  try {
    await api.delete(`/api/content/${id}`);
  } catch (error) {
    console.error('Content deletion error:', error);
    throw error;
  }
}