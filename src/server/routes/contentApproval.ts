import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validation';
import { protect, authorize } from '../middleware/auth';
import {
  submitForApproval,
  reviewContent,
  getApprovalHistory
} from '../controllers/contentApproval';

const router = express.Router();

router.use(protect);

// Submit content for approval
router.post(
  '/:contentId/submit',
  authorize('teacher', 'admin'),
  submitForApproval
);

// Review content
router.post(
  '/:contentId/review',
  authorize('admin'),
  [
    body('status').isIn(['approved', 'rejected']).withMessage('Invalid status'),
    body('comments').optional().isString()
  ],
  validateRequest,
  reviewContent
);

// Get approval history
router.get(
  '/:contentId/history',
  authorize('teacher', 'admin'),
  getApprovalHistory
);

export default router;