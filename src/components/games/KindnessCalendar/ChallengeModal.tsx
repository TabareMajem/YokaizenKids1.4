import React from 'react';
import { motion } from 'framer-motion';
import { X, Gift, Heart, CheckCircle2 } from 'lucide-react';
import type { Challenge } from './types';

type Props = {
  day: number;
  challenge: Challenge;
  onComplete: () => void;
  onClose: () => void;
};

export default function ChallengeModal({
  day,
  challenge,
  onComplete,
  onClose
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
        flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-2xl p-8 max-w-md w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 
            rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center 
            justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Day {day}
          </h2>
          <div className="flex items-center justify-center gap-2 text-pink-600">
            <Heart className="w-5 h-5" />
            <span className="font-medium">Today's Act of Kindness</span>
          </div>
        </div>

        <div className="bg-purple-50 rounded-xl p-6 mb-6">
          <p className="text-lg text-center text-purple-900">
            {challenge.description}
          </p>
        </div>

        <button
          onClick={onComplete}
          className="w-full py-3 bg-purple-600 text-white rounded-lg
            hover:bg-purple-700 transition-colors flex items-center 
            justify-center gap-2"
        >
          <CheckCircle2 className="w-5 h-5" />
          Mark as Complete
        </button>
      </motion.div>
    </motion.div>
  );
}