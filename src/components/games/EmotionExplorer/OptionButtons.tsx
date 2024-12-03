import React from 'react';
import { motion } from 'framer-motion';
import type { GameOption } from './types';

type Props = {
  options: GameOption[];
  onSelect: (option: GameOption) => void;
  disabled?: boolean;
};

export default function OptionButtons({ options, onSelect, disabled }: Props) {
  return (
    <div className="space-y-4">
      {options.map((option, index) => (
        <motion.button
          key={option.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelect(option)}
          disabled={disabled}
          className={`w-full p-4 text-left bg-white rounded-xl shadow-sm
            transition-all transform hover:scale-[1.02] hover:shadow-md
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <p className="text-gray-800">{option.text}</p>
        </motion.button>
      ))}
    </div>
  );
}