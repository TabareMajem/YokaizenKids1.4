import { useState } from 'react';
import { generateParentContent, type ContentGenerationParams } from '../services/ai/parentContentGenerator';
import { useParentContent } from './useParentContent';
import type { ParentContent } from '../types/parentContent';

export function useParentContentGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { createContent } = useParentContent();

  const generateContent = async (params: ContentGenerationParams): Promise<ParentContent | null> => {
    try {
      setIsGenerating(true);
      setError(null);

      // Generate content using AI
      const generatedContent = await generateParentContent(params);

      // Save to database
      await createContent(generatedContent);

      return generatedContent;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate content';
      setError(message);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateContent,
    isGenerating,
    error
  };
}