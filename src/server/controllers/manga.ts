import { Request, Response } from 'express';
import { Manga } from '../models/Manga';
import { processJournalEntry } from '../services/ai/pipeline';
import { logger } from '../config/logger';
import { cache } from '../middleware/cache';

export const createManga = async (req: Request, res: Response) => {
  try {
    const { journalId, text } = req.body;
    const userId = req.user._id;

    // Process journal entry and generate manga
    const processed = await processJournalEntry(text);

    const manga = await Manga.create({
      userId,
      journalId,
      title: processed.story.title,
      theme: processed.story.theme,
      emotionalJourney: processed.story.emotionalJourney,
      panels: processed.story.scenes.map(scene => ({
        imageUrl: scene.imageUrl,
        description: scene.description,
        emotion: scene.emotion,
        dialogues: scene.dialogues
      }))
    });

    res.status(201).json({
      success: true,
      data: manga
    });
  } catch (error) {
    logger.error('Manga creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create manga'
    });
  }
};

export const getManga = [
  cache(300),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const manga = await Manga.findById(id);

      if (!manga) {
        return res.status(404).json({
          success: false,
          error: 'Manga not found'
        });
      }

      res.json({
        success: true,
        data: manga
      });
    } catch (error) {
      logger.error('Manga retrieval error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve manga'
      });
    }
  }
];