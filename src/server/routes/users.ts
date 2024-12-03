import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validation';
import { protect, authorize } from '../middleware/auth';
import { requireActiveSubscription } from '../middleware/subscriptionGuard';
import { 
  getUsers, 
  createUser, 
  updateUser, 
  deleteUser 
} from '../controllers/users';

const router = express.Router();

router.use(protect);
router.use(requireActiveSubscription());

// Get users (admin only)
router.get(
  '/',
  authorize('admin'),
  getUsers
);

// Create user (admin only)
router.post(
  '/',
  authorize('admin'),
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('role').isIn(['student', 'teacher', 'parent', 'admin'])
      .withMessage('Invalid role'),
    body('password').isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
  ],
  validateRequest,
  createUser
);

// Update user (admin only)
router.put(
  '/:id',
  authorize('admin'),
  [
    body('name').optional().trim().notEmpty(),
    body('email').optional().isEmail(),
    body('role').optional().isIn(['student', 'teacher', 'parent', 'admin'])
  ],
  validateRequest,
  updateUser
);

// Delete user (admin only)
router.delete(
  '/:id',
  authorize('admin'),
  deleteUser
);

export default router;