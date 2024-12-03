import OpenAI from 'openai';
import { logger } from '../../config/logger';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export type EmotionAnalysis = {
  emotions: Array<{
    name: string;
    intensity: number;
    confidence: number;
  }>;
  dominantEmotion: string;
  sentimentScore: number;
};

export type StoryGeneration = {
  title: string;
  theme: string;
  emotionalJourney: string;
  scenes: Array<{
    description: string;
    emotion: string;
    visualPrompt: string;
    dialogues: string[];
  }>;
};

export async function analyzeEmotions(text: string): Promise<EmotionAnalysis> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are an expert in emotional analysis and child psychology."
        },
        {
          role: "user",
          content: `Analyze the emotional content of this journal entry and return a JSON object with emotions, their intensities (0-1), and confidence scores (0-1): ${text}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return {
      emotions: result.emotions,
      dominantEmotion: result.dominantEmotion,
      sentimentScore: result.sentimentScore
    };
  } catch (error) {
    logger.error('OpenAI emotion analysis error:', error);
    throw new Error('Failed to analyze emotions');
  }
}

export async function generateMangaStory(text: string, emotions: EmotionAnalysis): Promise<StoryGeneration> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are an expert manga storyteller who creates engaging stories for children."
        },
        {
          role: "user",
          content: `Create a manga story based on this journal entry and emotional analysis. Include a title, theme, emotional journey, and 3-5 scenes with descriptions and dialogues: ${text}\n\nEmotional Analysis: ${JSON.stringify(emotions)}`
        }
      ],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    logger.error('OpenAI story generation error:', error);
    throw new Error('Failed to generate manga story');
  }
}

export async function generateImagePrompt(scene: string, emotion: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are an expert at creating detailed image generation prompts for manga-style artwork."
        },
        {
          role: "user",
          content: `Create a detailed image generation prompt for this manga scene. Focus on composition, style, and emotional tone.\n\nScene: ${scene}\nEmotion: ${emotion}`
        }
      ]
    });

    return response.choices[0].message.content || '';
  } catch (error) {
    logger.error('OpenAI image prompt generation error:', error);
    throw new Error('Failed to generate image prompt');
  }
}