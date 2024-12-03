import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSubscription } from '../../hooks/useSubscription';

type Props = {
  children: React.ReactNode;
  requiredPlan?: string;
};

export default function SubscriptionGuard({ children, requiredPlan }: Props) {
  const { subscription, isLoading, checkAccess } = useSubscription();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent 
          rounded-full animate-spin" />
      </div>
    );
  }

  if (!subscription) {
    return <Navigate to="/subscription" replace />;
  }

  if (requiredPlan && !checkAccess(requiredPlan)) {
    return <Navigate to="/subscription/upgrade" replace />;
  }

  return <>{children}</>;
}