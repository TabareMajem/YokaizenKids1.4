import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { validateRequest } from '../middleware/validation';
import { ObjectId } from 'mongodb';
import { getCollections } from '../../../lib/db/collections';
import { processJournalEntry } from '../../../services/ai/pipeline';
import type { Journal } from '../../../lib/db/types';

const router = Router();

// POST /api/journals
router.post('/',
  [
    body('text').isString().trim().notEmpty().withMessage('Journal text is required'),
    body('userId').isString().notEmpty().withMessage('User ID is required')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { text, userId } = req.body;
      const { journals } = await getCollections();

      // Process journal entry through AI pipeline
      const processedEntry = await processJournalEntry(text);

      const journal: Omit<Journal, '_id'> = {
        userId: new ObjectId(userId),
        text,
        mood: {
          value: processedEntry.emotions[0]?.intensity || 0,
          dominantEmotion: processedEntry.emotions[0]?.name || 'neutral',
          confidence: processedEntry.emotions[0]?.confidence || 0
        },
        tags: processedEntry.storyArc.theme.split(',').map(t => t.trim()),
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await journals.insertOne(journal as Journal);
      
      res.status(201).json({
        success: true,
        data: {
          journalId: result.insertedId,
          processedEntry
        }
      });
    } catch (error) {
      console.error('Journal creation error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create journal entry'
      });
    }
  }
);

// GET /api/journals/:userId
router.get('/:userId',
  [
    param('userId').isString().notEmpty().withMessage('User ID is required'),
    query('limit').optional().isInt({ min: 1, max: 50 }).toInt()
  ],
  validateRequest,
  async (req, res) => {
    try {
      const userId = new ObjectId(req.params.userId);
      const limit = parseInt(req.query.limit as string) || 10;
      
      const { journals } = await getCollections();
      
      const entries = await journals
        .find({ userId })
        .sort({ createdAt: -1 })
        .limit(limit)
        .toArray();

      res.json({
        success: true,
        data: entries
      });
    } catch (error) {
      console.error('Journal retrieval error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve journal entries'
      });
    }
  }
);

export default router;