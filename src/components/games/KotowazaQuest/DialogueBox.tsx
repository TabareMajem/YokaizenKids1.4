import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { Location } from './types';

type Props = {
  location: Location;
  onContinue: () => void;
};

export default function DialogueBox({ location, onContinue }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="absolute bottom-0 inset-x-0 p-6 bg-white/95 backdrop-blur-sm"
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex items-start gap-4">
          {/* Character Portrait */}
          <div className="w-16 h-16 rounded-full bg-amber-100 flex-shrink-0" />
          
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 mb-1">
              {location.character}
            </h3>
            <p className="text-gray-700 mb-4">
              Welcome to the {location.name}. I have a proverb that might
              help guide you on your journey...
            </p>
            <button
              onClick={onContinue}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg
                hover:bg-amber-700 transition-colors flex items-center gap-2"
            >
              Continue
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}