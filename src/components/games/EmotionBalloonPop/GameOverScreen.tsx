import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, ArrowRight } from 'lucide-react';

type Props = {
  score: number;
  onPlayAgain: () => void;
};

export default function GameOverScreen({ score, onPlayAgain }: Props) {
  const getRank = (score: number): string => {
    if (score >= 500) return 'Emotion Master';
    if (score >= 300) return 'Feeling Expert';
    if (score >= 100) return 'Emotion Explorer';
    return 'Beginner';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center 
        justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 text-center max-w-md"
      >
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center 
          justify-center mx-auto mb-4">
          <Trophy className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Game Over!
        </h2>
        <div className="flex items-center justify-center gap-2 mb-4">
          <Star className="w-5 h-5 text-yellow-500" />
          <span className="text-xl font-bold text-gray-900">{score} points</span>
        </div>
        <p className="text-purple-600 font-medium mb-6">
          Rank: {getRank(score)}
        </p>
        <button
          onClick={onPlayAgain}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg
            hover:bg-purple-700 transition-colors flex items-center gap-2
            mx-auto"
        >
          Play Again
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </motion.div>
  );
}