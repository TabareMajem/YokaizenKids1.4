import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '../components/subscription/SubscriptionProvider';

export function useSubscriptionGuard(requiredPlan?: string) {
  const { subscription, isLoading, checkAccess } = useSubscription();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    // If no subscription exists, redirect to pricing
    if (!subscription) {
      navigate('/subscription', { replace: true });
      return;
    }

    // If subscription is not active, redirect to subscription management
    if (subscription.status !== 'active') {
      navigate('/subscription/manage', { replace: true });
      return;
    }

    // If a specific plan is required, check access
    if (requiredPlan && !checkAccess(requiredPlan)) {
      navigate('/subscription/upgrade', { 
        replace: true,
        state: { requiredPlan }
      });
    }
  }, [subscription, isLoading, requiredPlan, navigate, checkAccess]);

  return { isLoading };
}