import React from 'react';
import { motion } from 'framer-motion';
import type { GameRole } from './types';

type Props = {
  currentRole: GameRole;
  onAction: () => void;
  disabled?: boolean;
};

export default function ActionPanel({ currentRole, onAction, disabled }: Props) {
  return (
    <div className="absolute inset-0">
      {/* Background Scene */}
      <img
        src="https://images.unsplash.com/photo-1528844713977-c47e1fd8de54?w=1920&h=1080"
        alt="Traditional Japanese kitchen"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Game Elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            y: currentRole === 'pounder' ? [0, -50, 0] : 0
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            repeat: Infinity
          }}
          className="relative"
        >
          {/* Mochi */}
          <motion.div
            animate={{
              scale: currentRole === 'turner' ? [1, 1.2, 1] : 1
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut"
            }}
            className="w-32 h-32 bg-white rounded-full shadow-lg"
          />

          {/* Action Button */}
          <button
            onClick={onAction}
            disabled={disabled}
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2
              px-6 py-3 bg-amber-600 text-white rounded-lg
              hover:bg-amber-700 transition-colors disabled:opacity-50
              disabled:cursor-not-allowed"
          >
            {currentRole === 'pounder' ? 'Pound!' : 'Turn!'}
          </button>
        </motion.div>
      </div>
    </div>
  );
}