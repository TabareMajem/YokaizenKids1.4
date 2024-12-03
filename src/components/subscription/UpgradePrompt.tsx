import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type Props = {
  feature: string;
  description: string;
};

export default function UpgradePrompt({ feature, description }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 
        border border-purple-100 text-center"
    >
      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center 
        justify-center mx-auto mb-4">
        <Sparkles className="w-6 h-6 text-purple-600" />
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Upgrade to Access {feature}
      </h3>
      
      <p className="text-gray-600 mb-6">
        {description}
      </p>

      <Link
        to="/subscription/upgrade"
        className="inline-flex items-center justify-center px-6 py-3 
          bg-purple-600 text-white rounded-lg hover:bg-purple-700 
          transition-colors gap-2"
      >
        View Premium Features
        <ArrowRight className="w-5 h-5" />
      </Link>
    </motion.div>
  );
}