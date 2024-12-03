import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Wand2, AlertCircle } from 'lucide-react';
import { useJournalProcessor } from '../hooks/useJournalProcessor';

type Props = {
  content: string;
  onContentChange: (content: string) => void;
  onGenerateManga: (content: string) => void;
};

export default function JournalEntry({ content, onContentChange, onGenerateManga }: Props) {
  const { processEntry, isProcessing, error } = useJournalProcessor();
  const [showError, setShowError] = useState(false);

  const handleGenerateManga = async () => {
    if (!content.trim()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    const processed = await processEntry(content);
    if (processed) {
      onGenerateManga(content);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-start pt-3">
          <BookOpen className="w-5 h-5 text-gray-400" />
        </div>
        <textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="What's on your mind today? Share your thoughts, feelings, or an amazing story!"
          className="w-full min-h-[200px] pl-10 pr-4 py-3 rounded-lg border-2 
            border-purple-200 focus:border-purple-400 focus:ring 
            focus:ring-purple-200 focus:ring-opacity-50 placeholder-gray-400 
            resize-none"
        />
      </div>
      
      {(showError || error) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center gap-2 text-red-600"
        >
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm">
            {error || 'Please write something before generating a manga story.'}
          </p>
        </motion.div>
      )}

      <button
        onClick={handleGenerateManga}
        disabled={!content.trim() || isProcessing}
        className={`w-full py-3 px-6 rounded-lg flex items-center justify-center 
          gap-2 text-white font-medium transition-all transform hover:scale-[1.02]
          ${content.trim() && !isProcessing
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' 
            : 'bg-gray-300 cursor-not-allowed'
          }`}
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent 
              rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Wand2 className="w-5 h-5" />
            Generate Manga Story
          </>
        )}
      </button>
    </div>
  );
}