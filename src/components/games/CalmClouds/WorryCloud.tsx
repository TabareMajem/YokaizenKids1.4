import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Cloud } from 'lucide-react';
import type { Worry } from './types';

type Props = {
  worry: Worry;
  onRelease: (id: string) => void;
};

export default function WorryCloud({ worry, onRelease }: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, -100], [1, 0]);

  const handleDragEnd = () => {
    if (y.get() < -50) {
      onRelease(worry.id);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
      style={{ x, y, opacity }}
      className="absolute bottom-6 left-1/2 transform -translate-x-1/2
        bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4
        cursor-grab active:cursor-grabbing w-64"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center gap-3">
        <Cloud className="w-5 h-5 text-blue-500" />
        <p className="text-gray-700">{worry.text}</p>
      </div>
    </motion.div>
  );
}