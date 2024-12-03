import { validateEnv } from '../../config/env';
import { uploadImage } from '../storage/s3';
import { logger } from '../../server/config/logger';

const STABLE_DIFFUSION_API_URL = 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image';

export type ImageGenerationOptions = {
  style?: 'manga' | 'anime' | 'realistic';
  size?: '512x512' | '768x768' | '1024x1024';
  quality?: 'standard' | 'hd';
  negativePrompt?: string;
};

const defaultOptions: Required<ImageGenerationOptions> = {
  style: 'manga',
  size: '1024x1024',
  quality: 'standard',
  negativePrompt: 'low quality, bad anatomy, worst quality, low resolution'
};

const stylePrompts = {
  manga: 'manga style, black and white, ink drawing, detailed linework',
  anime: 'anime style, cel shaded, vibrant colors',
  realistic: 'photorealistic, detailed, high resolution'
};

export async function generateImage(
  prompt: string,
  options: ImageGenerationOptions = {}
): Promise<string> {
  try {
    const env = validateEnv();
    if (!env.VITE_STABILITY_API_KEY) {
      throw new Error('Stability API key not configured');
    }

    const mergedOptions = { ...defaultOptions, ...options };
    const stylePrompt = stylePrompts[mergedOptions.style];
    const enhancedPrompt = `${stylePrompt}, ${prompt}`;

    const response = await fetch(STABLE_DIFFUSION_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${env.VITE_STABILITY_API_KEY}`
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: enhancedPrompt,
            weight: 1
          },
          {
            text: mergedOptions.negativePrompt,
            weight: -1
          }
        ],
        cfg_scale: 7,
        height: parseInt(mergedOptions.size.split('x')[1]),
        width: parseInt(mergedOptions.size.split('x')[0]),
        samples: 1,
        steps: mergedOptions.quality === 'hd' ? 50 : 30
      })
    });

    if (!response.ok) {
      throw new Error(`Stable Diffusion API error: ${response.statusText}`);
    }

    const result = await response.json();
    const base64Image = result.artifacts[0].base64;

    // Convert base64 to buffer
    const buffer = Buffer.from(base64Image, 'base64');

    // Upload to S3
    const filename = `manga/${Date.now()}-${Math.random().toString(36).substring(7)}.png`;
    const imageUrl = await uploadImage(buffer, filename, 'image/png');

    return imageUrl;
  } catch (error) {
    logger.error('Image generation error:', error);
    throw new Error('Failed to generate image');
  }
}

export async function generateMangaPanels(
  scenes: Array<{
    description: string;
    emotion: string;
  }>,
  options: ImageGenerationOptions = {}
): Promise<string[]> {
  try {
    // Generate images in parallel with a concurrency limit of 3
    const concurrencyLimit = 3;
    const imageUrls: string[] = [];

    for (let i = 0; i < scenes.length; i += concurrencyLimit) {
      const batch = scenes.slice(i, i + concurrencyLimit);
      const promises = batch.map(scene => 
        generateImage(
          `${scene.description}, expressing ${scene.emotion}`,
          options
        )
      );

      const results = await Promise.all(promises);
      imageUrls.push(...results);
    }

    return imageUrls;
  } catch (error) {
    logger.error('Manga panel generation error:', error);
    throw new Error('Failed to generate manga panels');
  }
}