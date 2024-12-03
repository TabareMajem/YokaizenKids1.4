import React from 'react';
import { motion } from 'framer-motion';
import { School, Users } from 'lucide-react';
import PricingCard from './PricingCard';

const schoolPlans = [
  {
    title: 'Basic School Plan',
    price: '¥1,500',
    period: 'student/year',
    description: 'Perfect for schools starting their SEL journey',
    features: [
      { text: 'Student & Teacher Dashboards', included: true },
      { text: 'Core SEL Activities', included: true },
      { text: 'Basic Analytics', included: true },
      { text: 'Standard Support', included: true },
      { text: 'Advanced Analytics', included: false },
      { text: 'Custom Content', included: false }
    ]
  },
  {
    title: 'Premium School Plan',
    price: '¥2,500',
    period: 'student/year',
    description: 'Advanced features for comprehensive SEL programs',
    features: [
      { text: 'Student & Teacher Dashboards', included: true },
      { text: 'Core SEL Activities', included: true },
      { text: 'Advanced Analytics', included: true },
      { text: 'Priority Support', included: true },
      { text: 'Custom Content', included: true },
      { text: 'School System Integration', included: true }
    ],
    isPopular: true
  }
];

const familyPlans = [
  {
    title: 'Family Plan',
    price: '¥1,200',
    period: 'month',
    description: 'Great for families with up to 2 children',
    features: [
      { text: 'Access for 2 Children', included: true },
      { text: 'Parent Dashboard', included: true },
      { text: 'Personalized Activities', included: true },
      { text: 'Basic Support', included: true },
      { text: 'Advanced Progress Tracking', included: false },
      { text: 'Direct Educator Messaging', included: false }
    ]
  },
  {
    title: 'Family Plus Plan',
    price: '¥2,000',
    period: 'month',
    description: 'Perfect for larger families with up to 5 children',
    features: [
      { text: 'Access for 5 Children', included: true },
      { text: 'Parent Dashboard', included: true },
      { text: 'Personalized Activities', included: true },
      { text: 'Priority Support', included: true },
      { text: 'Advanced Progress Tracking', included: true },
      { text: 'Direct Educator Messaging', included: true }
    ],
    isPopular: true
  }
];

export default function PricingSection() {
  const handleSelectPlan = () => {
    // Handle plan selection
  };

  return (
    <div className="py-16 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Flexible Plans to Suit Your Needs
          </motion.h2>
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
          <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 
            text-white rounded-lg">
            <School className="w-5 h-5" />
            For Schools
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-white 
            text-purple-600 rounded-lg">
            <Users className="w-5 h-5" />
            For Families
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {schoolPlans.map((plan) => (
            <PricingCard
              key={plan.title}
              {...plan}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            All plans include a 30-day free trial. No credit card required.
          </p>
          <p className="text-sm text-gray-500">
            Need a custom plan for your organization?{' '}
            <a href="/contact" className="text-purple-600 hover:text-purple-700">
              Contact our sales team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}