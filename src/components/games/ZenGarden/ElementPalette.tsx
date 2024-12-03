import React from 'react';
import { motion } from 'framer-motion';
import { Mountain, Flower, Lamp } from 'lucide-react';

type Props = {
  onElementSelect: (type: string) => void;
};

const elements = [
  { type: 'rock', icon: Mountain, label: 'Rock' },
  { type: 'plant', icon: Flower, label: 'Plant' },
  { type: 'lantern', icon: Lamp, label: 'Lantern' }
];

export default function ElementPalette({ onElementSelect }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="grid grid-cols-3 gap-4">
        {elements.map(({ type, icon: Icon, label }) => (
          <motion.button
            key={type}
            onClick={() => onElementSelect(type)}
            className="p-4 rounded-lg bg-stone-50 hover:bg-stone-100 
              transition-colors text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className="w-6 h-6 text-stone-600 mx-auto mb-2" />
            <span className="text-sm text-stone-600">{label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}