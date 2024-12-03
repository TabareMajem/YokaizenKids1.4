import OpenAI from 'openai';
import { validateEnv } from '../../config/env';

let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    const env = validateEnv();
    openaiClient = new OpenAI({
      apiKey: env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });
  }
  return openaiClient;
}

export type ContentGenerationOptions = {
  type: 'activity' | 'prompt' | 'lesson';
  ageRange: [number, number];
  language: 'en' | 'ja' | 'es';
  topic: string;
  tone?: 'playful' | 'educational' | 'encouraging';
};

export async function generateContent(
  prompt: string,
  options: ContentGenerationOptions
): Promise<string> {
  try {
    const openai = getOpenAIClient();
    
    const systemPrompt = `You are an expert in creating ${options.type}s for children 
      aged ${options.ageRange[0]}-${options.ageRange[1]}. Create content that is:
      - Age-appropriate and engaging
      - Educational and fun
      - Clear and easy to understand
      - In ${options.language} language
      - Using a ${options.tone || 'playful'} tone
      
      Topic: ${options.topic}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ]
    });

    return response.choices[0].message.content || '';
  } catch (error) {
    console.error('Content generation error:', error);
    throw new Error('Failed to generate content');
  }
}

export async function generateAudio(
  text: string,
  language: 'en' | 'ja' | 'es' = 'en'
): Promise<string> {
  try {
    const openai = getOpenAIClient();
    
    const voiceMap = {
      en: 'nova',
      ja: 'shimizu',
      es: 'bella'
    };

    const response = await openai.audio.speech.create({
      model: "tts-1",
      voice: voiceMap[language],
      input: text
    });

    const buffer = Buffer.from(await response.arrayBuffer());
    return `data:audio/mp3;base64,${buffer.toString('base64')}`;
  } catch (error) {
    console.error('Audio generation error:', error);
    throw new Error('Failed to generate audio');
  }
}

export async function generateSEOMetadata(
  content: string,
  language: 'en' | 'ja' | 'es'
): Promise<{
  title: string;
  description: string;
  keywords: string[];
}> {
  try {
    const openai = getOpenAIClient();
    
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `Generate SEO metadata in ${language} for the following content. 
            Include a compelling title (max 60 chars), meta description (max 160 chars), 
            and relevant keywords.`
        },
        { role: "user", content }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return {
      title: result.title || '',
      description: result.description || '',
      keywords: result.keywords || []
    };
  } catch (error) {
    console.error('SEO metadata generation error:', error);
    throw new Error('Failed to generate SEO metadata');
  }
}