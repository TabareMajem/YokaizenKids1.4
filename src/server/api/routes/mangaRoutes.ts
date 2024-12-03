import { Router } from 'express';
import { param, query } from 'express-validator';
import { validateRequest } from '../middleware/validation';
import { ObjectId } from 'mongodb';
import { getCollections } from '../../../lib/db/collections';

const router = Router();

// GET /api/manga/:userId
router.get('/:userId',
  [
    param('userId').isString().notEmpty().withMessage('User ID is required'),
    query('limit').optional().isInt({ min: 1, max: 20 }).toInt()
  ],
  validateRequest,
  async (req, res) => {
    try {
      const userId = new ObjectId(req.params.userId);
      const limit = parseInt(req.query.limit as string) || 10;
      
      const { mangas } = await getCollections();
      
      const mangaStories = await mangas
        .find({ userId })
        .sort({ createdAt: -1 })
        .limit(limit)
        .toArray();

      res.json({
        success: true,
        data: mangaStories
      });
    } catch (error) {
      console.error('Manga retrieval error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve manga stories'
      });
    }
  }
);

// GET /api/manga/journal/:journalId
router.get('/journal/:journalId',
  [
    param('journalId').isString().notEmpty().withMessage('Journal ID is required')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const journalId = new ObjectId(req.params.journalId);
      
      const { mangas } = await getCollections();
      
      const manga = await mangas.findOne({ journalId });

      if (!manga) {
        return res.status(404).json({
          success: false,
          error: 'Manga not found for this journal entry'
        });
      }

      res.json({
        success: true,
        data: manga
      });
    } catch (error) {
      console.error('Manga retrieval error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve manga'
      });
    }
  }
);

export default router;