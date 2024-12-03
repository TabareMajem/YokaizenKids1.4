import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validation';
import { protect } from '../middleware/auth';
import { login, register, getCurrentUser } from '../controllers/auth';

const router = express.Router();

// Login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').exists().withMessage('Please provide a password')
  ],
  validateRequest,
  login
);

// Register
router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').isIn(['teacher', 'parent', 'admin']).withMessage('Invalid role')
  ],
  validateRequest,
  register
);

// Get current user
router.get('/me', protect, getCurrentUser);

export default router;