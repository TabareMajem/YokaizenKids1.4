import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

type PricingFeature = {
  text: string;
  included: boolean;
};

type Props = {
  title: string;
  price: string;
  period: string;
  description: string;
  features: PricingFeature[];
  isPopular?: boolean;
  onSelect: () => void;
};

export default function PricingCard({
  title,
  price,
  period,
  description,
  features,
  isPopular,
  onSelect
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative bg-white rounded-2xl shadow-lg overflow-hidden
        ${isPopular ? 'border-2 border-purple-500' : 'border border-gray-200'}`}
    >
      {isPopular && (
        <div className="absolute top-0 right-0 bg-purple-500 text-white px-4 py-1 
          text-sm font-medium rounded-bl-lg">
          Most Popular
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-4xl font-bold text-gray-900">{price}</span>
            <span className="text-gray-600 ml-2">/{period}</span>
          </div>
        </div>

        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li 
              key={index}
              className={`flex items-start gap-3 ${
                feature.included ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              <Check className={`w-5 h-5 flex-shrink-0 ${
                feature.included ? 'text-purple-500' : 'text-gray-300'
              }`} />
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={onSelect}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors
            ${isPopular 
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
            }`}
        >
          Select Plan
        </button>
      </div>
    </motion.div>
  );
}