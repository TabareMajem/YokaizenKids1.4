import React from 'react';
import { motion } from 'framer-motion';
import type { GameBalloon } from './types';

type Props = {
  balloon: GameBalloon;
  onPop: () => void;
  disabled?: boolean;
};

const balloonColors = {
  happy: 'bg-yellow-400',
  sad: 'bg-blue-400',
  angry: 'bg-red-400',
  surprised: 'bg-purple-400',
  scared: 'bg-green-400'
};

export default function Balloon({ balloon, onPop, disabled }: Props) {
  return (
    <motion.button
      initial={{ y: '120%', scale: 0.8, opacity: 0 }}
      animate={{
        y: '-120%',
        scale: 1,
        opacity: 1,
        x: balloon.x,
        transition: {
          duration: balloon.speed,
          ease: 'linear'
        }
      }}
      exit={{ scale: 1.5, opacity: 0 }}
      onClick={disabled ? undefined : onPop}
      className={`absolute left-0 w-20 h-24 ${balloonColors[balloon.emotion as keyof typeof balloonColors]} 
        rounded-full cursor-pointer transform hover:scale-110 transition-transform
        disabled:cursor-not-allowed disabled:opacity-50`}
      style={{ bottom: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="absolute inset-0 flex items-center justify-center text-2xl">
        {getEmoji(balloon.emotion)}
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full
        w-1 h-12 bg-gray-400" />
    </motion.button>
  );
}

function getEmoji(emotion: string): string {
  switch (emotion) {
    case 'happy':
      return '😊';
    case 'sad':
      return '😢';
    case 'angry':
      return '😠';
    case 'surprised':
      return '😮';
    case 'scared':
      return '😨';
    default:
      return '😐';
  }
}