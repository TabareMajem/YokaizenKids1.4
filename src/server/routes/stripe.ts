import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validation';
import { protect } from '../middleware/auth';
import { createCheckoutSession, handleWebhook } from '../controllers/stripe';

const router = express.Router();

// Create checkout session
router.post(
  '/create-checkout-session',
  protect,
  [
    body('priceId').isString().notEmpty(),
    body('successUrl').isString().notEmpty(),
    body('cancelUrl').isString().notEmpty()
  ],
  validateRequest,
  createCheckoutSession
);

// Webhook handler - no auth required
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  handleWebhook
);

export default router;