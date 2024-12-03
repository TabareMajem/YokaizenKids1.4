import React, { createContext, useContext, useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../../lib/stripe';
import type { Subscription } from '../../types/subscription';

type SubscriptionContextType = {
  subscription: Subscription | null;
  isLoading: boolean;
  error: string | null;
  checkAccess: (feature: string) => boolean;
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        // In a real app, this would fetch from your API
        const mockSubscription: Subscription = {
          id: 'sub_mock',
          customerName: 'Test User',
          customerEmail: 'test@example.com',
          planName: 'SCHOOL_PREMIUM',
          status: 'active',
          amount: 2500,
          nextBillingDate: new Date().toISOString()
        };
        setSubscription(mockSubscription);
      } catch (err) {
        setError('Failed to fetch subscription status');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  const checkAccess = (feature: string): boolean => {
    if (!subscription) return false;
    
    // Define feature access by plan
    const featureAccess = {
      SCHOOL_BASIC: ['basic_analytics', 'content_creation'],
      SCHOOL_PREMIUM: ['advanced_analytics', 'content_creation', 'api_access'],
      FAMILY_BASIC: ['basic_features'],
      FAMILY_PREMIUM: ['all_features']
    };

    const plan = subscription.planName as keyof typeof featureAccess;
    return featureAccess[plan]?.includes(feature) || false;
  };

  return (
    <Elements stripe={stripePromise}>
      <SubscriptionContext.Provider value={{
        subscription,
        isLoading,
        error,
        checkAccess
      }}>
        {children}
      </SubscriptionContext.Provider>
    </Elements>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}