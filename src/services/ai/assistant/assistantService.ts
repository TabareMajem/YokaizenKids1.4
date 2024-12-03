import { OpenAI } from 'openai';
import { validateEnv } from '../../../config/env';
import { logger } from '../../../server/config/logger';

let openaiClient: OpenAI | null = null;

export async function initializeAssistant(role: 'teacher' | 'parent') {
  try {
    const env = validateEnv();
    openaiClient = new OpenAI({
      apiKey: env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });

    logger.info('AI Assistant initialized successfully');
  } catch (error) {
    logger.error('AI Assistant initialization error:', error);
    throw new Error('Failed to initialize AI Assistant');
  }
}

export async function getAssistantResponse(message: string): Promise<string> {
  if (!openaiClient) {
    await initializeAssistant('teacher'); // Default to teacher role if not initialized
  }

  try {
    const response = await openaiClient!.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: getAssistantTemplate('teacher') },
        { role: 'user', content: message }
      ]
    });

    return response.choices[0].message.content || '';
  } catch (error) {
    logger.error('AI Assistant response error:', error);
    throw new Error('Failed to get AI Assistant response');
  }
}

function getAssistantTemplate(role: 'teacher' | 'parent'): string {
  if (role === 'teacher') {
    return `You are a helpful teaching assistant for Kokoro Quest, specializing in:
      - Social-emotional learning (SEL)
      - Student progress monitoring
      - Activity recommendations
      - Best practices for emotional intelligence development`;
  }

  return `You are a supportive parenting advisor for Kokoro Quest, specializing in:
    - Child emotional development
    - Parent-child communication
    - Activity suggestions
    - Progress interpretation`;
}