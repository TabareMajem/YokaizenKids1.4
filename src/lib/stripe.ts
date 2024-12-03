import { loadStripe } from '@stripe/stripe-js';
import { validateEnv } from '../config/env';

const env = validateEnv();

if (!env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Stripe public key is not configured');
}

export const stripePromise = loadStripe(env.VITE_STRIPE_PUBLIC_KEY);