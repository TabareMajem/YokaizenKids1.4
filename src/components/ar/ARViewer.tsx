import React, { useEffect, useRef, useState } from 'react';
import { Camera, Sparkles, Pause, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { EmotionCard } from './types';

type Props = {
  onCardDetected?: (card: EmotionCard) => void;
  onActivityTriggered?: (activity: string) => void;
};

export default function ARViewer({ onCardDetected, onActivityTriggered }: Props) {
  const unityContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [detectedCard, setDetectedCard] = useState<EmotionCard | null>(null);

  useEffect(() => {
    // Unity WebGL initialization would go here in a real implementation
    const unityInstance = {
      // Mock Unity instance for demonstration
      SendMessage: (obj: string, method: string, param: string) => {
        console.log(`Unity SendMessage: ${obj}.${method}(${param})`);
      }
    };

    // Cleanup
    return () => {
      // Unity cleanup code would go here
    };
  }, []);

  const handleActivityClick = (activity: string) => {
    onActivityTriggered?.(activity);
  };

  return (
    <div className="relative w-full h-[600px] bg-gray-900 rounded-xl overflow-hidden">
      {/* Unity WebGL Container */}
      <div 
        ref={unityContainerRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Controls Overlay */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm 
            hover:bg-white/20 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white" />
          )}
        </button>
        <button
          onClick={() => {/* Toggle camera */}}
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm 
            hover:bg-white/20 transition-colors"
        >
          <Camera className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Detected Card Info */}
      <AnimatePresence>
        {detectedCard && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t 
              from-black/80 to-transparent"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-purple-500/20 backdrop-blur-sm">
                <Sparkles className="w-6 h-6 text-purple-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {detectedCard.emotion}
                </h3>
                <p className="text-gray-300 mb-4">{detectedCard.description}</p>
                <div className="flex flex-wrap gap-2">
                  {detectedCard.activities.map((activity, index) => (
                    <button
                      key={index}
                      onClick={() => handleActivityClick(activity)}
                      className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm
                        text-white text-sm hover:bg-white/20 transition-colors"
                    >
                      {activity}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}