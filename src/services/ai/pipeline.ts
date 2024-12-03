import { v4 as uuid } from 'uuid';
import { generateImage, generateMangaPanels } from './imageGeneration';
import { assembleMangaPage } from './panelAssembly';
import { getPromptTemplate } from './promptManagement';
import { logger } from '../../server/config/logger';
import type { ProcessedJournal, Emotion, StoryArc } from '../types';

export type PipelineResult = {
  emotions: Emotion[];
  storyArc: StoryArc;
  imageUrls: string[];
  pageUrls: string[];
};

export type PipelineOptions = {
  imageStyle?: 'manga' | 'anime' | 'realistic';
  imageQuality?: 'standard' | 'hd';
  panelsPerPage?: number;
};

const defaultOptions: Required<PipelineOptions> = {
  imageStyle: 'manga',
  imageQuality: 'standard',
  panelsPerPage: 3
};

export async function processJournalEntry(
  text: string,
  options: PipelineOptions = {}
): Promise<PipelineResult> {
  try {
    const mergedOptions = { ...defaultOptions, ...options };

    // Get the current prompt template
    const promptTemplate = await getPromptTemplate('journalAnalysis');
    if (!promptTemplate) {
      throw new Error('Journal analysis prompt template not found');
    }

    // Replace variables in the template
    const prompt = promptTemplate.template.replace('{{journalEntry}}', text);

    // Get emotional analysis and story arc from OpenAI
    const openaiResponse = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(openaiResponse.choices[0].message.content || '{}');
    const { emotions, storyArc } = result;

    // Generate images for each scene
    const imageUrls = await generateMangaPanels(
      storyArc.scenes,
      {
        style: mergedOptions.imageStyle,
        quality: mergedOptions.imageQuality
      }
    );

    // Assemble pages
    const pageUrls: string[] = [];
    for (let i = 0; i < imageUrls.length; i += mergedOptions.panelsPerPage) {
      const pageImages = imageUrls.slice(i, i + mergedOptions.panelsPerPage);
      const pageDialogues = storyArc.scenes
        .slice(i, i + mergedOptions.panelsPerPage)
        .map(scene => scene.dialogues.join('\n'));

      const pageUrl = await assembleMangaPage(pageImages, pageDialogues);
      pageUrls.push(pageUrl);
    }

    return {
      emotions,
      storyArc,
      imageUrls,
      pageUrls
    };
  } catch (error) {
    logger.error('Journal processing error:', error);
    throw new Error('Failed to process journal entry');
  }
}