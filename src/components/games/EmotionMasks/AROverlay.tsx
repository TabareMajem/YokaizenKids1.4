import React from 'react';
import { motion } from 'framer-motion';
import type { EmotionMask } from './types';

type Props = {
  mask: EmotionMask | null;
};

export default function AROverlay({ mask }: Props) {
  if (!mask) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Face tracking markers */}
      <motion.div
        className="absolute w-64 h-64 border-2 border-purple-500/50 rounded-full"
        initial={false}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Mask Overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="relative w-64 h-64">
          <img
            src={mask.overlayUrl}
            alt={mask.emotion}
            className="w-full h-full object-contain"
          />
          {mask.features.map((feature, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: `${feature.position.x}%`,
                top: `${feature.position.y}%`,
                width: `${feature.size}%`,
                height: `${feature.size}%`
              }}
              animate={feature.animation}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}