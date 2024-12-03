import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validation';
import { protect, authorize } from '../middleware/auth';
import {
  getSettings,
  updateSettings,
  testEmailSettings
} from '../controllers/settings';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

// Get all settings
router.get('/', getSettings);

// Update settings by section
router.put(
  '/:section',
  [
    body().isObject().notEmpty()
  ],
  validateRequest,
  updateSettings
);

// Test email settings
router.post('/email/test', testEmailSettings);

export default router;