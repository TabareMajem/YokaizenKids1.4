import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Stripe secret key is not configured');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16'
});

export const SUBSCRIPTION_PRICES = {
  SCHOOL: {
    BASIC: 'price_school_basic',
    PREMIUM: 'price_school_premium'
  },
  FAMILY: {
    BASIC: 'price_family_basic',
    PREMIUM: 'price_family_premium'
  }
};