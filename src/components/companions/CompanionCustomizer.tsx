import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Palette, Wand2, Save } from 'lucide-react';

type Props = {
  companion: any;
  onClose: () => void;
  onSave: (updatedCompanion: any) => void;
};

export default function CompanionCustomizer({ companion, onClose, onSave }: Props) {
  const [name, setName] = useState(companion.name);
  const [personality, setPersonality] = useState(companion.personality);

  const personalities = [
    { id: 'cheerful', label: 'Cheerful', description: 'Always happy and encouraging' },
    { id: 'wise', label: 'Wise', description: 'Thoughtful and insightful' },
    { id: 'playful', label: 'Playful', description: 'Fun and energetic' },
    { id: 'calm', label: 'Calm', description: 'Peaceful and soothing' }
  ];

  const handleSave = () => {
    onSave({
      ...companion,
      name,
      personality
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
          flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-lg bg-white rounded-xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                Customize {companion.name}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                  focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
              />
            </div>

            {/* Personality */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Personality
              </label>
              <div className="grid grid-cols-2 gap-3">
                {personalities.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPersonality(p.id)}
                    className={`p-3 rounded-lg text-left transition-colors ${
                      personality === p.id
                        ? 'bg-purple-50 border-2 border-purple-200'
                        : 'border-2 border-gray-200 hover:border-purple-200'
                    }`}
                  >
                    <h3 className="font-medium text-gray-800">{p.label}</h3>
                    <p className="text-sm text-gray-600">{p.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Appearance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Appearance
              </label>
              <button className="w-full py-3 px-4 bg-purple-50 text-purple-700 
                rounded-lg hover:bg-purple-100 transition-colors flex items-center 
                justify-center gap-2"
              >
                <Palette className="w-5 h-5" />
                Customize Appearance
              </button>
            </div>

            {/* Voice */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Voice & Speech
              </label>
              <button className="w-full py-3 px-4 bg-purple-50 text-purple-700 
                rounded-lg hover:bg-purple-100 transition-colors flex items-center 
                justify-center gap-2"
              >
                <Wand2 className="w-5 h-5" />
                Customize Voice
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 
                  rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg
                  hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}