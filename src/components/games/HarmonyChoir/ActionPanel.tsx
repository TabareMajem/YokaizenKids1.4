import React from 'react';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';
import type { VoicePart } from './types';

type Props = {
  currentRole: VoicePart;
  onAction: () => void;
  disabled?: boolean;
};

export default function ActionPanel({ currentRole, onAction, disabled }: Props) {
  return (
    <div className="absolute inset-0">
      {/* Background Scene */}
      <img
        src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1920&h=1080"
        alt="Concert hall"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Game Elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative"
        >
          {/* Voice Indicator */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              {currentRole}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <Music className="w-5 h-5 text-white" />
              <span className="text-white">Follow the rhythm!</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={onAction}
            disabled={disabled}
            className="px-8 py-4 bg-white/90 backdrop-blur-sm text-purple-600 
              rounded-xl hover:bg-white transition-colors shadow-lg
              disabled:opacity-50 disabled:cursor-not-allowed
              transform hover:scale-105 active:scale-95"
          >
            Sing!
          </button>
        </motion.div>
      </div>
    </div>
  );
}