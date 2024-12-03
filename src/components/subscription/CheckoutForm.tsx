import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock } from 'lucide-react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import type { StripeError } from '@stripe/stripe-js';

type Props = {
  onSuccess: () => void;
  onError: (error: string) => void;
};

export default function CheckoutForm({ onSuccess, onError }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)!,
      });

      if (error) {
        throw error;
      }

      // Here you would typically send the paymentMethod.id to your server
      // to complete the subscription setup
      onSuccess();
    } catch (err) {
      const error = err as StripeError;
      onError(error.message || 'An error occurred while processing your payment');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Information
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <CreditCard className="w-5 h-5 text-gray-400" />
          </div>
          <div className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#1f2937',
                    '::placeholder': {
                      color: '#9ca3af',
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Lock className="w-4 h-4" />
        <span>Your payment information is secure and encrypted</span>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={!stripe || isProcessing}
        className={`w-full py-3 px-4 bg-purple-600 text-white rounded-lg
          font-medium transition-colors ${
            isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'
          }`}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent 
              rounded-full animate-spin" />
            Processing...
          </div>
        ) : (
          'Subscribe Now'
        )}
      </motion.button>
    </form>
  );
}