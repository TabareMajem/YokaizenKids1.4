import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Check } from 'lucide-react';
import { useStripe } from '../../hooks/useStripe';
import type { SubscriptionPlan } from '../../services/stripe/subscriptions';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: string;
  upgradePlan: SubscriptionPlan;
};

export default function SubscriptionUpgradeModal({ 
  isOpen, 
  onClose, 
  currentPlan,
  upgradePlan 
}: Props) {
  const { createCheckoutSession, isLoading, error } = useStripe();

  const handleUpgrade = async () => {
    try {
      await createCheckoutSession(upgradePlan);
    } catch (err) {
      console.error('Failed to start upgrade:', err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
            flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  Upgrade Your Plan
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">Current Plan</p>
                    <p className="font-medium text-gray-800">{currentPlan}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">New Plan</p>
                    <p className="font-medium text-purple-600">{upgradePlan}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    New Features You'll Get
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Advanced Analytics',
                      'Priority Support',
                      'Custom Branding',
                      'API Access'
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <div className="p-1 bg-green-100 rounded-full">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <button
                onClick={handleUpgrade}
                disabled={isLoading}
                className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg
                  font-medium transition-colors disabled:opacity-50
                  disabled:cursor-not-allowed hover:bg-purple-700
                  flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent 
                      rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Upgrade Now
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}