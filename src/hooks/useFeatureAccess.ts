import { useSubscription } from '../components/subscription/SubscriptionProvider';

// Define feature requirements
const featureRequirements = {
  'advanced-analytics': ['SCHOOL_PREMIUM', 'FAMILY_PREMIUM'],
  'custom-content': ['SCHOOL_PREMIUM'],
  'api-access': ['SCHOOL_PREMIUM'],
  'bulk-user-management': ['SCHOOL_PREMIUM'],
  'priority-support': ['SCHOOL_PREMIUM', 'FAMILY_PREMIUM']
} as const;

type Feature = keyof typeof featureRequirements;

export function useFeatureAccess() {
  const { subscription, checkAccess } = useSubscription();

  const hasAccess = (feature: Feature): boolean => {
    if (!subscription) return false;
    
    const requiredPlans = featureRequirements[feature];
    return requiredPlans.some(plan => checkAccess(plan));
  };

  const requiresUpgrade = (feature: Feature): boolean => {
    return !hasAccess(feature);
  };

  return {
    hasAccess,
    requiresUpgrade,
    currentPlan: subscription?.planName
  };
}