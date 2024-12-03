import React from 'react';
import { Edit3, Palette, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

type Props = {
  onEditStory: () => void;
  onCustomizeVisuals: () => void;
  onShare: () => void;
};

export default function Toolbar({ onEditStory, onCustomizeVisuals, onShare }: Props) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", bounce: 0.2 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 
        bg-white/90 backdrop-blur-sm rounded-full shadow-lg p-2 
        flex items-center gap-2 z-50"
    >
      <button
        onClick={onEditStory}
        className="p-3 rounded-full hover:bg-purple-100 transition-colors
          text-purple-600 flex items-center gap-2 group"
      >
        <Edit3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="text-sm font-medium">Edit Story</span>
      </button>
      
      <div className="w-px h-6 bg-gray-200" />
      
      <button
        onClick={onCustomizeVisuals}
        className="p-3 rounded-full hover:bg-purple-100 transition-colors
          text-purple-600 flex items-center gap-2 group"
      >
        <Palette className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="text-sm font-medium">Customize</span>
      </button>
      
      <div className="w-px h-6 bg-gray-200" />
      
      <button
        onClick={onShare}
        className="p-3 rounded-full hover:bg-purple-100 transition-colors
          text-purple-600 flex items-center gap-2 group"
      >
        <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="text-sm font-medium">Share</span>
      </button>
    </motion.div>
  );
}