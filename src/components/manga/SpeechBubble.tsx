import React from 'react';
import { motion } from 'framer-motion';
import { type SpeechBubbleData } from './types';

type Props = {
  bubble: SpeechBubbleData;
};

export default function SpeechBubble({ bubble }: Props) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, type: "spring" }}
      style={{
        left: `${bubble.position.x}%`,
        top: `${bubble.position.y}%`,
      }}
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 
        max-w-[200px] p-4 bg-white/95 backdrop-blur-sm shadow-lg
        ${bubble.type === 'thought' ? 'rounded-full' : 'manga-bubble'}`}
    >
      <p className="text-sm font-comic leading-tight">{bubble.text}</p>
    </motion.div>
  );
}