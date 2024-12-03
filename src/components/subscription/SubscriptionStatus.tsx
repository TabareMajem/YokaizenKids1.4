import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useSubscription } from './SubscriptionProvider';
import { Link } from 'react-router-dom';

export default function SubscriptionStatus() {
  const { subscription, isLoading } = useSubscription();

  if (isLoading) {
    return (
      <div className="animate-pulse bg-gray-100 rounded-lg p-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    );
  }

  if (!subscription) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 
          flex items-start gap-3"
      >
        <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-yellow-700">No active subscription</p>
          <Link
            to="/subscription"
            className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
          >
            View pricing plans
          </Link>
        </div>
      </motion.div>
    );
  }

  const getStatusColor = () => {
    switch (subscription.status) {
      case 'active':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'past_due':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      default:
        return 'bg-red-50 border-red-200 text-red-700';
    }
  };

  const getStatusIcon = () => {
    switch (subscription.status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'past_due':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border rounded-lg p-4 flex items-start gap-3 ${getStatusColor()}`}
    >
      {getStatusIcon()}
      <div>
        <p className="font-medium">{subscription.planName}</p>
        <p className="text-sm">
          Next billing: {new Date(subscription.nextBillingDate).toLocaleDateString()}
        </p>
        <Link
          to="/subscription/manage"
          className="text-sm hover:underline font-medium mt-1 block"
        >
          Manage subscription
        </Link>
      </div>
    </motion.div>
  );
}