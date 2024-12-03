import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

type PricingFeature = {
  text: string;
  included: boolean;
};

type Plan = {
  id: string;
  title: string;
  pricePerStudent: number;
  period: string;
  features: PricingFeature[];
  isPopular?: boolean;
};

const schoolPlans: Plan[] = [
  {
    id: 'price_school_basic',
    title: 'Basic School Plan',
    pricePerStudent: 1500,
    period: 'student/year',
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
    id: 'price_school_premium',
    title: 'Premium School Plan',
    pricePerStudent: 2500,
    period: 'student/year',
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

const familyPlans: Plan[] = [
  {
    id: 'price_family_basic',
    title: 'Family Plan',
    pricePerStudent: 1200,
    period: 'month',
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
    id: 'price_family_premium',
    title: 'Family Plus Plan',
    pricePerStudent: 2000,
    period: 'month',
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

type Props = {
  type: 'school' | 'family';
  studentCount?: number;
  onSelectPlan: (planId: string) => void;
};

export default function PricingTable({ type, studentCount = 1, onSelectPlan }: Props) {
  const plans = type === 'school' ? schoolPlans : familyPlans;

  const formatPrice = (plan: Plan) => {
    if (type === 'school') {
      return {
        perStudent: `¥${plan.pricePerStudent.toLocaleString()}`,
        total: studentCount > 1 ? `¥${(plan.pricePerStudent * studentCount).toLocaleString()} total` : undefined
      };
    }
    return {
      perStudent: `¥${plan.pricePerStudent.toLocaleString()}`,
      total: undefined
    };
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {plans.map((plan, index) => {
        const price = formatPrice(plan);
        return (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative bg-white rounded-2xl shadow-lg overflow-hidden
              ${plan.isPopular ? 'border-2 border-purple-500' : 'border border-gray-200'}`}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-purple-500 text-white px-4 py-1 
                text-sm font-medium rounded-bl-lg">
                Most Popular
              </div>
            )}

            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.title}</h3>
              
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">
                    {price.perStudent}
                  </span>
                  <span className="text-gray-600 ml-2">/{plan.period}</span>
                </div>
                {price.total && (
                  <p className="text-sm text-gray-500 mt-1">
                    {price.total}
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300" />
                    )}
                    <span className={feature.included ? 'text-gray-900' : 'text-gray-400'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSelectPlan(plan.id)}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors
                  ${plan.isPopular 
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  }`}
              >
                Select Plan
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}