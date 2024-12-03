import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { validateRequest } from '../middleware/validation';
import { ObjectId } from 'mongodb';
import { getCollections } from '../../../lib/db/collections';
import type { Content } from '../../../types/content';

const router = Router();

// Create content
router.post('/',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('type').isIn(['activity', 'prompt', 'lesson']).withMessage('Invalid content type'),
    body('category').isIn(['emotional-awareness', 'social-skills', 'mindfulness', 'self-expression'])
      .withMessage('Invalid category'),
    body('content').trim().notEmpty().withMessage('Content is required')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { contents } = await getCollections();
      
      const content: Omit<Content, '_id'> = {
        ...req.body,
        status: 'draft',
        version: 1,
        createdBy: req.user._id,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await contents.insertOne(content as Content);
      
      res.status(201).json({
        success: true,
        data: {
          id: result.insertedId,
          ...content
        }
      });
    } catch (error) {
      console.error('Content creation error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create content'
      });
    }
  }
);

// Update content
router.put('/:id',
  [
    param('id').isString().notEmpty(),
    body('title').optional().trim().notEmpty(),
    body('description').optional().trim().notEmpty(),
    body('content').optional().trim().notEmpty()
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { contents } = await getCollections();
      const contentId = new ObjectId(req.params.id);
      
      const result = await contents.findOneAndUpdate(
        { _id: contentId },
        {
          $set: {
            ...req.body,
            updatedAt: new Date(),
            version: { $inc: 1 }
          }
        },
        { returnDocument: 'after' }
      );

      if (!result) {
        return res.status(404).json({
          success: false,
          error: 'Content not found'
        });
      }

      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      console.error('Content update error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update content'
      });
    }
  }
);

// Get content by ID
router.get('/:id',
  [
    param('id').isString().notEmpty()
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { contents } = await getCollections();
      const contentId = new ObjectId(req.params.id);
      
      const content = await contents.findOne({ _id: contentId });

      if (!content) {
        return res.status(404).json({
          success: false,
          error: 'Content not found'
        });
      }

      res.json({
        success: true,
        data: content
      });
    } catch (error) {
      console.error('Content retrieval error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve content'
      });
    }
  }
);

// List contents with filters
router.get('/',
  [
    query('type').optional().isIn(['activity', 'prompt', 'lesson']),
    query('category').optional().isIn(['emotional-awareness', 'social-skills', 'mindfulness', 'self-expression']),
    query('status').optional().isIn(['draft', 'published', 'archived']),
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 50 }).toInt(),
    query('search').optional().isString()
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { contents } = await getCollections();
      const {
        type,
        category,
        status,
        page = 1,
        limit = 10,
        search
      } = req.query;

      const query: any = {};

      if (type) query.type = type;
      if (category) query.category = category;
      if (status) query.status = status;
      if (search) {
        query.$text = { $search: search as string };
      }

      const [items, total] = await Promise.all([
        contents
          .find(query)
          .sort({ updatedAt: -1 })
          .skip((Number(page) - 1) * Number(limit))
          .limit(Number(limit))
          .toArray(),
        contents.countDocuments(query)
      ]);

      res.json({
        success: true,
        data: items,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit))
        }
      });
    } catch (error) {
      console.error('Content listing error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to list contents'
      });
    }
  }
);

// Delete content
router.delete('/:id',
  [
    param('id').isString().notEmpty()
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { contents } = await getCollections();
      const contentId = new ObjectId(req.params.id);
      
      const result = await contents.deleteOne({ _id: contentId });

      if (result.deletedCount === 0) {
        return res.status(404).json({
          success: false,
          error: 'Content not found'
        });
      }

      res.json({
        success: true,
        message: 'Content deleted successfully'
      });
    } catch (error) {
      console.error('Content deletion error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete content'
      });
    }
  }
);

export default router;