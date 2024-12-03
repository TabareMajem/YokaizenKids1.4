import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { Subscription } from '../types/subscription';

export function useSubscription() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const { data } = await api.get('/api/subscriptions/current');
        setSubscription(data);
      } catch (err) {
        setError('Failed to fetch subscription status');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  const checkAccess = (requiredPlan: string): boolean => {
    if (!subscription) return false;
    
    const planHierarchy = {
      'SCHOOL_BASIC': 1,
      'SCHOOL_PREMIUM': 2,
      'FAMILY_BASIC': 1,
      'FAMILY_PREMIUM': 2
    };

    const currentPlanLevel = planHierarchy[subscription.planName as keyof typeof planHierarchy] || 0;
    const requiredPlanLevel = planHierarchy[requiredPlan as keyof typeof planHierarchy] || 0;

    return currentPlanLevel >= requiredPlanLevel;
  };

  return {
    subscription,
    isLoading,
    error,
    checkAccess
  };
}