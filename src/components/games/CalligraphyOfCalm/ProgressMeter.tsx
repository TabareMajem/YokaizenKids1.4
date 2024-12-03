import React from 'react';
import { motion } from 'framer-motion';

type Props = {
  progress: number;
};

export default function ProgressMeter({ progress }: Props) {
  return (
    <div className="absolute bottom-0 inset-x-0 p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          className="h-full bg-gradient-to-r from-amber-500 to-purple-500"
        />
      </div>
    </div>
  );
}