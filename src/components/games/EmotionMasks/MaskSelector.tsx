import React from 'react';
import { motion } from 'framer-motion';
import type { EmotionMask } from './types';

type Props = {
  onSelect: (mask: EmotionMask) => void;
  currentMask: EmotionMask | null;
};

const masks: EmotionMask[] = [
  {
    id: 'happy',
    emotion: 'happy',
    overlayUrl: 'https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?w=400&h=400',
    features: [
      {
        position: { x: 45, y: 45 },
        size: 10,
        animation: {
          rotate: [0, 10, 0],
          transition: { duration: 2, repeat: Infinity }
        }
      }
    ]
  },
  {
    id: 'sad',
    emotion: 'sad',
    overlayUrl: 'https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?w=400&h=400',
    features: [
      {
        position: { x: 45, y: 55 },
        size: 10,
        animation: {
          y: [0, 5, 0],
          transition: { duration: 2, repeat: Infinity }
        }
      }
    ]
  }
  // Add more masks
];

export default function MaskSelector({ onSelect, currentMask }: Props) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
      {masks.map((mask) => (
        <motion.button
          key={mask.id}
          onClick={() => onSelect(mask)}
          className={`aspect-square rounded-xl p-2 transition-colors ${
            currentMask?.id === mask.id
              ? 'bg-purple-100 ring-2 ring-purple-400'
              : 'bg-white hover:bg-purple-50'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src={mask.overlayUrl}
            alt={mask.emotion}
            className="w-full h-full object-contain"
          />
        </motion.button>
      ))}
    </div>
  );
}