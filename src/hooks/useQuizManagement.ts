import { useState } from 'react';
import { api } from '../lib/api';
import type { QuizQuestionAdmin, QuizQuestionDraft } from '../types/adminQuiz';

// Mock data for development
const mockQuestions: QuizQuestionAdmin[] = [
  {
    id: '1',
    text: 'How would you feel in this situation?',
    type: 'text_and_image',
    image: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&h=600',
    answers: [
      {
        text: 'Happy and excited',
        image: 'https://images.unsplash.com/photo-1545315003-c5ad6226c272?w=400&h=300',
        score: 10,
        category: 'emotional-awareness',
        isCorrect: true
      },
      {
        text: 'Nervous and worried',
        image: 'https://images.unsplash.com/photo-1546539782-6fc531453083?w=400&h=300',
        score: 5,
        category: 'emotional-awareness',
        isCorrect: false
      }
    ],
    category: 'emotional-awareness',
    difficulty: 'beginner',
    language: 'en',
    status: 'published',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'admin'
  }
];

export function useQuizManagement() {
  const [questions, setQuestions] = useState<QuizQuestionAdmin[]>(mockQuestions);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (import.meta.env.DEV) {
        // Use mock data in development
        await new Promise(resolve => setTimeout(resolve, 1000));
        return mockQuestions;
      }

      const { data } = await api.get('/api/admin/quiz/questions');
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch questions';
      setError(message);
      return mockQuestions; // Fallback to mock data
    } finally {
      setIsLoading(false);
    }
  };

  const createQuestion = async (questionData: QuizQuestionDraft) => {
    try {
      setIsLoading(true);
      setError(null);

      // Handle file uploads if present
      const formData = new FormData();
      
      if (questionData.image instanceof File) {
        formData.append('questionImage', questionData.image);
      }

      questionData.answers.forEach((answer, index) => {
        if (answer.image instanceof File) {
          formData.append(`answerImage_${index}`, answer.image);
        }
      });

      // Add the rest of the question data
      formData.append('data', JSON.stringify(questionData));

      if (import.meta.env.DEV) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        const newQuestion: QuizQuestionAdmin = {
          ...questionData,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'admin'
        };
        setQuestions(prev => [...prev, newQuestion]);
        return newQuestion;
      }

      const { data } = await api.post('/api/admin/quiz/questions', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setQuestions(prev => [...prev, data.data]);
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create question';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuestion = async (id: string, questionData: Partial<QuizQuestionDraft>) => {
    try {
      setIsLoading(true);
      setError(null);

      // Handle file uploads if present
      const formData = new FormData();
      
      if (questionData.image instanceof File) {
        formData.append('questionImage', questionData.image);
      }

      questionData.answers?.forEach((answer, index) => {
        if (answer.image instanceof File) {
          formData.append(`answerImage_${index}`, answer.image);
        }
      });

      // Add the rest of the question data
      formData.append('data', JSON.stringify(questionData));

      if (import.meta.env.DEV) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setQuestions(prev => prev.map(q =>
          q.id === id
            ? { ...q, ...questionData, updatedAt: new Date() }
            : q
        ));
        return;
      }

      const { data } = await api.put(`/api/admin/quiz/questions/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setQuestions(prev => prev.map(q =>
        q.id === id ? data.data : q
      ));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update question';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteQuestion = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      if (import.meta.env.DEV) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setQuestions(prev => prev.filter(q => q.id !== id));
        return;
      }

      await api.delete(`/api/admin/quiz/questions/${id}`);
      setQuestions(prev => prev.filter(q => q.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete question';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const duplicateQuestion = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const questionToDuplicate = questions.find(q => q.id === id);
      if (!questionToDuplicate) {
        throw new Error('Question not found');
      }

      const { id: _, createdAt: __, updatedAt: ___, ...questionData } = questionToDuplicate;
      return await createQuestion(questionData);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to duplicate question';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    questions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    duplicateQuestion,
    isLoading,
    error
  };
}