import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { School, Users } from 'lucide-react';
import PricingTable from '../../components/subscription/PricingTable';
import { useStripe } from '../../hooks/useStripe';

export default function SubscriptionPage() {
  const [planType, setPlanType] = useState<'school' | 'family'>('school');
  const { createCheckoutSession, isLoading, error } = useStripe();

  const handlePlanSelect = async (plan: any) => {
    try {
      await createCheckoutSession(plan.id);
    } catch (err) {
      console.error('Failed to start checkout:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Choose Your Plan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Select the perfect plan for your needs
          </motion.p>
        </div>

        {/* Plan Type Selector */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setPlanType('school')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg
              ${planType === 'school'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-purple-600 hover:bg-purple-50'
              } transition-colors`}
          >
            <School className="w-5 h-5" />
            For Schools
          </button>
          <button
            onClick={() => setPlanType('family')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg
              ${planType === 'family'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-purple-600 hover:bg-purple-50'
              } transition-colors`}
          >
            <Users className="w-5 h-5" />
            For Families
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-md mx-auto mb-8 p-4 bg-red-50 border border-red-200 
            rounded-lg text-red-600 text-center">
            {error}
          </div>
        )}

        {/* Pricing Table */}
        <PricingTable
          type={planType}
          onPlanSelect={handlePlanSelect}
        />

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex 
            items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent 
                rounded-full animate-spin mb-4" />
              <p className="text-gray-600">Processing your request...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}