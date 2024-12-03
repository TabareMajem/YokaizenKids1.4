import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Star, ArrowRight } from 'lucide-react';

type Props = {
  score: number;
  onClose: () => void;
};

export default function CompletionScreen({ score, onClose }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
        flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 text-center max-w-md"
      >
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center 
          justify-center mx-auto mb-4">
          <Cloud className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Feeling Lighter!
        </h2>
        <div className="flex items-center justify-center gap-2 mb-4">
          <Star className="w-5 h-5 text-yellow-500" />
          <span className="text-xl font-bold text-gray-900">
            {score} worries released
          </span>
        </div>
        <p className="text-gray-600 mb-6">
          Great job practicing mindfulness and letting go of your worries.
          Remember, it's okay to feel worried sometimes, but we don't have
          to carry those worries with us always.
        </p>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg
            hover:bg-blue-700 transition-colors flex items-center gap-2
            mx-auto"
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </motion.div>
  );
}