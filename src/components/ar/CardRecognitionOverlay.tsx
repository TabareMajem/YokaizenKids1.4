import React from 'react';
import { motion } from 'framer-motion';
import { Book, Wind } from 'lucide-react';
import type { EmotionCard } from './types';

type Props = {
  card: EmotionCard;
  onLearnMore: () => void;
  onPractice: () => void;
};

export default function CardRecognitionOverlay({ card, onLearnMore, onPractice }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
    >
      <div className="absolute inset-x-0 bottom-0 p-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-4"
        >
          <div>
            <h3 className="text-2xl font-bold mb-2">
              {card.emotion} Detected!
            </h3>
            <p className="text-purple-200">
              {card.description}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onLearnMore}
              className="flex-1 py-3 px-4 bg-purple-500/80 rounded-xl
                hover:bg-purple-500 transition-colors flex items-center 
                justify-center gap-2"
            >
              <Book className="w-5 h-5" />
              Learn More
            </button>
            <button
              onClick={onPractice}
              className="flex-1 py-3 px-4 bg-pink-500/80 rounded-xl
                hover:bg-pink-500 transition-colors flex items-center 
                justify-center gap-2"
            >
              <Wind className="w-5 h-5" />
              Practice
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}