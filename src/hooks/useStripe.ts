import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { api } from '../lib/api';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);

type CheckoutOptions = {
  priceId: string;
  quantity?: number;
  successUrl: string;
  cancelUrl: string;
};

export function useStripe() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCheckoutSession = async (options: CheckoutOptions) => {
    if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
      setError('Stripe is not configured');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const { data } = await api.post('/api/stripe/create-checkout-session', options);
      
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId
      });

      if (error) {
        throw error;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create checkout session';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createCheckoutSession,
    isLoading,
    error
  };
}