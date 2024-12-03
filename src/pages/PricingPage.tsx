import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { School, Users, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PricingTable from '../components/pricing/PricingTable';
import StudentCountInput from '../components/pricing/StudentCountInput';
import { useStripe } from '../hooks/useStripe';

export default function PricingPage() {
  const [planType, setPlanType] = useState<'school' | 'family'>('school');
  const [studentCount, setStudentCount] = useState(10);
  const { createCheckoutSession, isLoading, error } = useStripe();
  const navigate = useNavigate();

  const handleSelectPlan = async (planId: string) => {
    try {
      await createCheckoutSession({
        priceId: planId,
        quantity: planType === 'school' ? studentCount : 1,
        successUrl: `${window.location.origin}/subscription/success`,
        cancelUrl: `${window.location.origin}/pricing`
      });
    } catch (err) {
      console.error('Failed to create checkout session:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Choose the perfect plan for your school or family
          </motion.p>
        </div>

        {/* Plan Type Selector */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setPlanType('school')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors
              ${planType === 'school'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-purple-600 hover:bg-purple-50'
              }`}
          >
            <School className="w-5 h-5" />
            For Schools
          </button>
          <button
            onClick={() => setPlanType('family')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors
              ${planType === 'family'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-purple-600 hover:bg-purple-50'
              }`}
          >
            <Users className="w-5 h-5" />
            For Families
          </button>
        </div>

        {/* Student Count Input (for schools only) */}
        {planType === 'school' && (
          <div className="max-w-md mx-auto mb-12">
            <StudentCountInput
              studentCount={studentCount}
              onCountChange={setStudentCount}
              minStudents={5}
              maxStudents={1000}
            />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto mb-8 p-4 bg-red-50 text-red-600 
              rounded-lg text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex 
            items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-purple-500 
                border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-gray-600">Processing your request...</p>
            </div>
          </div>
        )}

        {/* Pricing Table */}
        <PricingTable
          type={planType}
          studentCount={studentCount}
          onSelectPlan={handleSelectPlan}
        />

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            All plans include a 30-day free trial. No credit card required.
          </p>
          <p className="text-sm text-gray-500">
            Need a custom plan for your organization?{' '}
            <Link to="/contact" className="text-purple-600 hover:text-purple-700">
              Contact our sales team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}