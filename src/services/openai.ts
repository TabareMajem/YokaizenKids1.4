import OpenAI from 'openai';
import { z } from 'zod';
import type { ProcessedJournal, Emotion, StoryArc } from './types';

let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error(
        'OpenAI API key is not configured. Please add VITE_OPENAI_API_KEY to your .env file.'
      );
    }
    openaiClient = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });
  }
  return openaiClient;
}

const EmotionSchema = z.object({
  name: z.string(),
  intensity: z.number().min(0).max(1),
  confidence: z.number().min(0).max(1)
});

const StoryArcSchema = z.object({
  title: z.string(),
  scenes: z.array(z.object({
    description: z.string(),
    emotion: z.string(),
    visualPrompt: z.string(),
    dialogues: z.array(z.string())
  })),
  theme: z.string(),
  emotionalJourney: z.string()
});

export async function analyzeEmotions(text: string): Promise<Emotion[]> {
  try {
    const openai = getOpenAIClient();
    
    const prompt = `Analyze the emotional content of this journal entry and return a JSON array of emotions with their intensity and confidence scores:
    
    Journal Entry: "${text}"
    
    Return only valid JSON in this format:
    [{ "name": "joy", "intensity": 0.8, "confidence": 0.9 }]`;

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    const result = response.choices[0].message.content;
    if (!result) throw new Error('No response from OpenAI');

    const parsed = JSON.parse(result);
    return z.array(EmotionSchema).parse(parsed.emotions);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('OpenAI API key is invalid or not configured properly');
      }
      throw new Error(`Failed to analyze emotions: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while analyzing emotions');
  }
}

export async function generateStoryArc(text: string, emotions: Emotion[]): Promise<StoryArc> {
  try {
    const openai = getOpenAIClient();
    
    const prompt = `Create a manga story arc based on this journal entry and emotions. Return JSON only:
    
    Journal Entry: "${text}"
    Emotions: ${JSON.stringify(emotions)}
    
    Create a story with 3-5 scenes that captures the emotional journey. Include specific visual prompts for each scene.
    Return in this format:
    {
      "title": "string",
      "scenes": [{
        "description": "string",
        "emotion": "string",
        "visualPrompt": "string",
        "dialogues": ["string"]
      }],
      "theme": "string",
      "emotionalJourney": "string"
    }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    const result = response.choices[0].message.content;
    if (!result) throw new Error('No response from OpenAI');

    return StoryArcSchema.parse(JSON.parse(result));
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('OpenAI API key is invalid or not configured properly');
      }
      throw new Error(`Failed to generate story arc: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while generating the story arc');
  }
}

export async function generateImagePrompt(scene: string, emotion: string): Promise<string> {
  try {
    const openai = getOpenAIClient();
    
    const prompt = `Create a detailed image generation prompt for this manga scene. Focus on composition, style, and emotional tone:
    
    Scene: "${scene}"
    Emotion: "${emotion}"
    
    Return only the prompt text, no JSON.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [{ role: "user", content: prompt }]
    });

    const result = response.choices[0].message.content;
    if (!result) throw new Error('No response from OpenAI');
    
    return result;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('OpenAI API key is invalid or not configured properly');
      }
      throw new Error(`Failed to generate image prompt: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while generating the image prompt');
  }
}