import OpenAI from 'openai';
import { validateEnv } from '../../config/env';
import { logger } from '../../server/config/logger';
import { generateImage } from './imageGeneration';
import type { ProcessedJournal } from '../types';

const STABLE_DIFFUSION_API_URL = 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image';

export async function generateMangaStory(journalText: string): Promise<ProcessedJournal> {
  try {
    const env = validateEnv();
    const openai = new OpenAI({
      apiKey: env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });

    // Generate story structure and dialogues
    const storyResponse = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `Create a manga story based on this journal entry. Include:
            - Title
            - Theme
            - Emotional journey
            - 3-5 scenes with:
              * Description
              * Emotion
              * Detailed visual prompt for Stable Diffusion
              * Character dialogues
            Return as JSON.`
        },
        { role: "user", content: journalText }
      ],
      response_format: { type: "json_object" }
    });

    const storyArc = JSON.parse(storyResponse.choices[0].message.content || '{}');

    // Generate images for each scene using Stable Diffusion
    const scenes = await Promise.all(
      storyArc.scenes.map(async (scene: any) => {
        const imageUrl = await generateImage(
          scene.visualPrompt,
          { style: 'manga', quality: 'hd' }
        );

        return {
          ...scene,
          imageUrl
        };
      })
    );

    // Analyze emotions
    const emotionResponse = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "Analyze the emotional content of this journal entry. Return a JSON array of emotions with intensity and confidence scores."
        },
        { role: "user", content: journalText }
      ],
      response_format: { type: "json_object" }
    });

    const emotions = JSON.parse(emotionResponse.choices[0].message.content || '{}').emotions;

    return {
      id: Date.now().toString(),
      originalText: journalText,
      emotions,
      storyArc: {
        ...storyArc,
        scenes
      },
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    logger.error('Manga generation error:', error);
    throw new Error('Failed to generate manga story');
  }
}