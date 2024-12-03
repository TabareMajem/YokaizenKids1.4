import { v4 as uuidv4 } from 'uuid';
import OpenAI from 'openai';
import { validateEnv } from '../config/env';
import { logger } from '../server/config/logger';
import type { ProcessedJournal } from './types';

const openai = new OpenAI({
  apiKey: validateEnv().VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function processJournalEntry(text: string): Promise<ProcessedJournal> {
  if (!text.trim()) {
    throw new Error('Journal text cannot be empty');
  }

  try {
    // Analyze emotions using OpenAI
    const emotionResponse = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "Analyze the emotional content of this journal entry. Return a JSON object with emotions array, each having name, intensity (0-1), and confidence (0-1)."
        },
        { role: "user", content: text }
      ],
      response_format: { type: "json_object" }
    });

    const emotions = JSON.parse(emotionResponse.choices[0].message.content || '{}').emotions;

    // Generate story arc
    const storyResponse = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "Create a manga story arc based on this journal entry. Include title, theme, emotional journey, and 3-5 scenes with descriptions and dialogues."
        },
        { role: "user", content: text }
      ],
      response_format: { type: "json_object" }
    });

    const storyArc = JSON.parse(storyResponse.choices[0].message.content || '{}');

    // Validate response structure
    if (!Array.isArray(emotions) || !storyArc.title || !Array.isArray(storyArc.scenes)) {
      throw new Error('Invalid AI response format');
    }

    const processedJournal: ProcessedJournal = {
      id: uuidv4(),
      originalText: text,
      emotions,
      storyArc: {
        title: storyArc.title,
        theme: storyArc.theme,
        emotionalJourney: storyArc.emotionalJourney,
        scenes: storyArc.scenes.map(scene => ({
          description: scene.description,
          emotion: scene.emotion,
          visualPrompt: scene.visualPrompt || scene.description,
          dialogues: scene.dialogues || []
        }))
      },
      timestamp: new Date().toISOString()
    };

    logger.info('Journal processed successfully', { journalId: processedJournal.id });
    return processedJournal;
  } catch (error) {
    logger.error('Journal processing error:', error);
    throw new Error('Failed to process journal entry. Please try again.');
  }
}