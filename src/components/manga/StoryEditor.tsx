import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

type Props = {
  content: string;
  onContentChange: (content: string) => void;
  onClose: () => void;
};

export default function StoryEditor({ content, onContentChange, onClose }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-4 md:inset-10 bg-white rounded-2xl shadow-2xl z-50 
        flex flex-col overflow-hidden"
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Edit Your Story</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        className="flex-1 w-full p-6 text-lg resize-none focus:outline-none"
        placeholder="Start writing your story..."
        style={{ minHeight: '300px' }}
      />

      <div className="p-4 border-t bg-gray-50 flex justify-end">
        <button
          onClick={onClose}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg
            hover:bg-purple-700 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </motion.div>
  );
}