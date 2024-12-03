import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send } from 'lucide-react';

type Props = {
  onSubmit: (text: string) => void;
  onClose: () => void;
};

export default function ReflectionBox({ onSubmit, onClose }: Props) {
  const [reflection, setReflection] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reflection.trim()) {
      onSubmit(reflection);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
        flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-lg bg-white rounded-xl shadow-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Reflect on Your Garden
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="block text-sm text-gray-600 mb-2">
            What emotions does your garden represent?
          </label>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-stone-200 focus:border-stone-400
              resize-none mb-4"
            rows={4}
            placeholder="Share your thoughts..."
            required
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-stone-600 text-white rounded-lg
                hover:bg-stone-700 transition-colors flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              Submit Reflection
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}