import React from 'react';
import { motion } from 'framer-motion';
import type { GamePrompt } from './types';

type Props = {
  prompt: GamePrompt;
};

export default function PromptText({ prompt }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-6 left-1/2 transform -translate-x-1/2
        bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4
        text-center max-w-md"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        {prompt.title}
      </h2>
      <p className="text-gray-600">
        {prompt.description}
      </p>
    </motion.div>
  );
}