import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSubscriptionGuard } from '../../hooks/useSubscriptionGuard';

type Props = {
  children: React.ReactNode;
  requiredPlan?: string;
  fallback?: React.ReactNode;
};

export default function SubscriptionGuard({ children, requiredPlan, fallback }: Props) {
  const location = useLocation();
  const { isLoading } = useSubscriptionGuard(requiredPlan);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent 
          rounded-full animate-spin" />
      </div>
    );
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}