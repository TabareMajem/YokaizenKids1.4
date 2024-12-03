import { Request, Response } from 'express';
import { Journal } from '../models/Journal';
import { processJournalEntry } from '../services/ai';
import { logger } from '../config/logger';
import { cache } from '../middleware/cache';

export const createJournal = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    const userId = req.user._id;

    // Process journal with AI
    const aiAnalysis = await processJournalEntry(text);

    const journal = await Journal.create({
      userId,
      text,
      mood: aiAnalysis.mood,
      tags: aiAnalysis.tags,
      aiAnalysis: {
        emotions: aiAnalysis.emotions,
        themes: aiAnalysis.themes,
        suggestions: aiAnalysis.suggestions
      }
    });

    res.status(201).json({
      success: true,
      data: journal
    });
  } catch (error) {
    logger.error('Journal creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Error creating journal entry'
    });
  }
};

export const getJournals = [
  cache(300), // Cache for 5 minutes
  async (req: Request, res: Response) => {
    try {
      const userId = req.user._id;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const journals = await Journal.find({ userId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      const total = await Journal.countDocuments({ userId });

      res.json({
        success: true,
        data: journals,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      logger.error('Journal retrieval error:', error);
      res.status(500).json({
        success: false,
        error: 'Error retrieving journal entries'
      });
    }
  }
];