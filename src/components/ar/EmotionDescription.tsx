import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Star, Sparkles } from 'lucide-react';
import type { EmotionCard } from './types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  emotion: EmotionCard | null;
};

export default function EmotionDescription({ isOpen, onClose, emotion }: Props) {
  if (!emotion) return null;

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
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-lg bg-gradient-to-br from-purple-900 to-pink-900 
              rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="relative p-6 flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-xl">
                <Heart className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">
                  {emotion.emotion}
                </h2>
                <p className="text-purple-200">
                  Let's explore this feeling together
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 pt-0">
              <div className="bg-white/10 rounded-xl p-6 mb-6">
                <p className="text-lg leading-relaxed">
                  {emotion.description}
                </p>
              </div>

              {/* Tips Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  Helpful Tips
                </h3>
                <div className="grid gap-3">
                  {emotion.activities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 bg-white/5 rounded-lg p-4"
                    >
                      <Sparkles className="w-5 h-5 text-purple-300 flex-shrink-0" />
                      <p>{activity}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}