import OpenAI from 'openai';
import { validateEnv } from '../../config/env';
import { logger } from '../../server/config/logger';
import type { ParentContent, ActivityStep } from '../../types/parentContent';
import type { Language } from '../../types/language';

const openai = new OpenAI({
  apiKey: validateEnv().VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export type ContentGenerationParams = {
  childAge: number;
  emotionalFocus: string[];
  duration: number;
  language: Language;
  personalityTraits?: string[];
  culturalContext?: 'jp' | 'us';
};

export async function generateParentContent(params: ContentGenerationParams): Promise<ParentContent> {
  try {
    const prompt = `Create an engaging parent-child activity with the following parameters:
      - Child Age: ${params.childAge} years
      - Emotional Focus: ${params.emotionalFocus.join(', ')}
      - Duration: ${params.duration} minutes
      - Cultural Context: ${params.culturalContext || 'neutral'}
      ${params.personalityTraits ? `- Personality Traits: ${params.personalityTraits.join(', ')}` : ''}

      Return a JSON object with:
      - title
      - description
      - type (activity/discussion/exercise)
      - materials (array)
      - steps (array of {text, image})
      - assessmentCriteria
      
      Make it engaging, age-appropriate, and culturally sensitive.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are an expert in child development and parent-child activities."
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');

    // Generate translations if needed
    const translations = params.language !== 'en' ? 
      await generateTranslations(result, params.language) : 
      undefined;

    return {
      id: Date.now().toString(),
      title: result.title,
      description: result.description,
      type: result.type,
      duration: `${params.duration} minutes`,
      emotionalFocus: params.emotionalFocus,
      materials: result.materials || [],
      steps: result.steps,
      targetAge: [params.childAge - 1, params.childAge + 1],
      status: 'draft',
      languages: translations ? ['en', params.language] : ['en'],
      translations: translations || {},
      assessmentCriteria: result.assessmentCriteria,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'ai-generator'
    };
  } catch (error) {
    logger.error('Parent content generation error:', error);
    throw new Error('Failed to generate parent content');
  }
}

async function generateTranslations(
  content: any,
  targetLanguage: Language
): Promise<Record<Language, {
  title: string;
  description: string;
  materials?: string[];
  steps: ActivityStep[];
}>> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are a professional translator. Translate the following content to ${targetLanguage}. 
            Maintain the same structure and format. Return as JSON.`
        },
        {
          role: "user",
          content: JSON.stringify({
            title: content.title,
            description: content.description,
            materials: content.materials,
            steps: content.steps
          })
        }
      ],
      response_format: { type: "json_object" }
    });

    const translated = JSON.parse(response.choices[0].message.content || '{}');
    return {
      [targetLanguage]: translated
    };
  } catch (error) {
    logger.error('Translation generation error:', error);
    throw new Error('Failed to generate translations');
  }
}