import React from 'react';
import { useFeatureAccess } from '../../hooks/useFeatureAccess';
import UpgradePrompt from './UpgradePrompt';

type Props = {
  feature: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export default function FeatureGate({ feature, children, fallback }: Props) {
  const { hasAccess } = useFeatureAccess();

  if (!hasAccess(feature as any)) {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <UpgradePrompt
        feature={feature}
        description="Upgrade your plan to access this premium feature and unlock more capabilities."
      />
    );
  }

  return <>{children}</>;
}