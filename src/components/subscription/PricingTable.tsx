import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useStripe } from '../../hooks/useStripe';
import type { SubscriptionPlan } from '../../services/stripe/subscriptions';

type PlanFeature = {
  name: string;
  included: boolean;
};

type Plan = {
  id: SubscriptionPlan;
  title: string;
  price: string;
  period: string;
  features: PlanFeature[];
  isPopular?: boolean;
};

const schoolPlans: Plan[] = [
  {
    id: 'SCHOOL_BASIC',
    title: 'Basic School Plan',
    price: '¥1,500',
    period: 'student/year',
    features: [
      { name: 'Up to 100 students', included: true },
      { name: 'Basic analytics', included: true },
      { name: 'Email support', included: true },
      { name: 'Custom branding', included: false },
      { name: 'API access', included: false },
      { name: 'Advanced analytics', included: false }
    ]
  },
  {
    id: 'SCHOOL_PREMIUM',
    title: 'Premium School Plan',
    price: '¥2,500',
    period: 'student/year',
    features: [
      { name: 'Unlimited students', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'Priority support', included: true },
      { name: 'Custom branding', included: true },
      { name: 'API access', included: true },
      { name: 'Custom integrations', included: true }
    ],
    isPopular: true
  }
];

const familyPlans: Plan[] = [
  {
    id: 'FAMILY_BASIC',
    title: 'Basic Family Plan',
    price: '¥1,200',
    period: 'month',
    features: [
      { name: 'Up to 2 children', included: true },
      { name: 'Basic progress tracking', included: true },
      { name: 'Email support', included: true },
      { name: 'Advanced analytics', included: false },
      { name: 'Priority support', included: false }
    ]
  },
  {
    id: 'FAMILY_PREMIUM',
    title: 'Premium Family Plan',
    price: '¥2,000',
    period: 'month',
    features: [
      { name: 'Up to 5 children', included: true },
      { name: 'Advanced progress tracking', included: true },
      { name: 'Priority support', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'Custom learning paths', included: true }
    ],
    isPopular: true
  }
];

type Props = {
  type: 'school' | 'family';
  onPlanSelect: (plan: Plan) => void;
};

export default function PricingTable({ type, onPlanSelect }: Props) {
  const plans = type === 'school' ? schoolPlans : familyPlans;

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {plans.map((plan, index) => (
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
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600 ml-2">/{plan.period}</span>
              </div>
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
                    {feature.name}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => onPlanSelect(plan)}
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
      ))}
    </div>
  );
}