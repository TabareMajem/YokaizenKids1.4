import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

type Props = {
  score: number;
  combo: number;
};

export default function ScoreCounter({ score, combo }: Props) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-purple-600">
        <Star className="w-5 h-5" />
        <span className="font-medium">{score}</span>
      </div>
      {combo > 1 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="px-2 py-1 bg-pink-100 text-pink-600 rounded-full text-sm"
        >
          {combo}x Combo!
        </motion.div>
      )}
    </div>
  );
}