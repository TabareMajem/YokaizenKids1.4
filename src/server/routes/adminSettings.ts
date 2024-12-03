import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validation';
import { protect, authorize } from '../middleware/auth';
import {
  getSettings,
  updateGeneralSettings,
  updateSecuritySettings,
  updateEmailSettings,
  testEmailSettings
} from '../controllers/adminSettings';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

// Get all settings
router.get('/', getSettings);

// Update general settings
router.put(
  '/general',
  [
    body('siteName').optional().trim().notEmpty(),
    body('supportEmail').optional().isEmail(),
    body('defaultLanguage').optional().isIn(['en', 'ja', 'es']),
    body('maintenanceMode').optional().isBoolean()
  ],
  validateRequest,
  updateGeneralSettings
);

// Update security settings
router.put(
  '/security',
  [
    body('passwordMinLength').optional().isInt({ min: 6, max: 32 }),
    body('mfaEnabled').optional().isBoolean(),
    body('sessionTimeout').optional().isInt({ min: 5, max: 1440 }),
    body('loginAttempts').optional().isInt({ min: 3, max: 10 })
  ],
  validateRequest,
  updateSecuritySettings
);

// Update email settings
router.put(
  '/email',
  [
    body('smtpHost').optional().trim().notEmpty(),
    body('smtpPort').optional().isInt({ min: 1, max: 65535 }),
    body('smtpUser').optional().trim().notEmpty(),
    body('smtpSecure').optional().isBoolean(),
    body('senderName').optional().trim().notEmpty(),
    body('senderEmail').optional().isEmail()
  ],
  validateRequest,
  updateEmailSettings
);

// Test email settings
router.post('/email/test', testEmailSettings);

export default router;