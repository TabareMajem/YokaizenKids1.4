import express from 'express';
import { body, query } from 'express-validator';
import { validateRequest } from '../middleware/validation';
import { protect, authorize } from '../middleware/auth';
import { requireActiveSubscription } from '../middleware/subscriptionGuard';
import {
  createContent,
  updateContent,
  getContent,
  listContent,
  publishContent,
  archiveContent
} from '../controllers/content';

const router = express.Router();

router.use(protect);
router.use(requireActiveSubscription());

// Create content
router.post(
  '/',
  authorize('admin', 'teacher'),
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('type').isIn(['activity', 'prompt', 'lesson']).withMessage('Invalid content type'),
    body('category').isIn(['emotional-awareness', 'social-skills', 'mindfulness', 'self-expression'])
      .withMessage('Invalid category'),
    body('content').trim().notEmpty().withMessage('Content is required')
  ],
  validateRequest,
  createContent
);

// Update content
router.put(
  '/:id',
  authorize('admin', 'teacher'),
  [
    body('title').optional().trim().notEmpty(),
    body('description').optional().trim().notEmpty(),
    body('content').optional().trim().notEmpty()
  ],
  validateRequest,
  updateContent
);

// Get single content
router.get('/:id', getContent);

// List content
router.get(
  '/',
  [
    query('type').optional().isIn(['activity', 'prompt', 'lesson']),
    query('category').optional().isIn(['emotional-awareness', 'social-skills', 'mindfulness', 'self-expression']),
    query('status').optional().isIn(['draft', 'published', 'archived']),
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 50 }).toInt(),
    query('search').optional().isString()
  ],
  validateRequest,
  listContent
);

// Publish content
router.post(
  '/:id/publish',
  authorize('admin'),
  publishContent
);

// Archive content
router.post(
  '/:id/archive',
  authorize('admin'),
  archiveContent
);

export default router;