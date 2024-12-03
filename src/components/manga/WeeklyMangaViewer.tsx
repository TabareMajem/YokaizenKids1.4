import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { ProcessedJournal } from '../../services/types';

type Props = {
  story: ProcessedJournal;
  onClose: () => void;
};

export default function WeeklyMangaViewer({ story, onClose }: Props) {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <div className="relative max-w-4xl w-full h-full">
        {/* Navigation Controls */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 
          bg-white/90 backdrop-blur-sm rounded-full shadow-lg p-2 z-10 flex items-center gap-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className="p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <span className="text-sm font-medium">
            {currentPage + 1} / {story.storyArc.scenes.length}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => 
              Math.min(story.storyArc.scenes.length - 1, prev + 1)
            )}
            disabled={currentPage === story.storyArc.scenes.length - 1}
            className="p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm 
            rounded-full shadow-lg z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Manga Pages */}
        <AnimatePresence mode="wait">
          {story.storyArc.scenes.map((scene, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: currentPage === index ? 1 : 0 }}
              exit={{ opacity: 0 }}
              className={`absolute inset-0 ${
                currentPage === index ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
            >
              {/* Image */}
              <img
                src={scene.imageUrl}
                alt={scene.description}
                className="w-full h-full object-contain"
              />

              {/* Dialogue Bubbles */}
              {scene.dialogues.map((dialogue, i) => (
                <div
                  key={i}
                  className="absolute manga-bubble bg-white/90 backdrop-blur-sm p-4 
                    max-w-[200px] text-center"
                  style={{
                    left: `${20 + (i * 30)}%`,
                    top: `${20 + (i * 20)}%`
                  }}
                >
                  <p className="text-sm font-comic">{dialogue}</p>
                </div>
              ))}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}