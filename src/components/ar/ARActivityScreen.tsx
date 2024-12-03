import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Camera, 
  Sparkles, 
  Book, 
  Wind, 
  Trophy,
  RefreshCcw
} from 'lucide-react';
import { useCardRecognition } from '../../hooks/useCardRecognition';
import CardRecognitionOverlay from './CardRecognitionOverlay';
import EmotionDescription from './EmotionDescription';
import BreathingExercise from './activities/BreathingExercise';
import type { EmotionCard } from './types';

type Props = {
  onBack: () => void;
  onComplete: () => void;
};

export default function ARActivityScreen({ onBack, onComplete }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showDescription, setShowDescription] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const { initialize, detectedCard, error } = useCardRecognition();

  useEffect(() => {
    if (videoRef.current) {
      initialize(videoRef.current).catch(console.error);
    }
  }, []);

  const handleActivityComplete = () => {
    setShowBreathing(false);
    setShowReward(true);
    setTimeout(() => {
      setShowReward(false);
      onComplete();
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      {/* Header */}
      <div className="sticky top-0 bg-black/20 backdrop-blur-sm z-10">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="ml-4">
              <h1 className="text-lg font-semibold">AR Emotion Explorer</h1>
              <div className="flex items-center gap-1 text-sm text-purple-300">
                <Camera className="w-4 h-4" />
                <span>Scan your emotion card</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Camera Viewfinder */}
      <div className="relative max-w-3xl mx-auto px-4 py-4">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Scanning Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.02, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-12 border-2 border-purple-400/50 rounded-xl"
            />
          </div>

          {/* Instructions Overlay */}
          <AnimatePresence>
            {showInstructions && !detectedCard && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t 
                  from-black/80 to-transparent"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-purple-500/20">
                    <Sparkles className="w-6 h-6 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Scan Your Emotion Card
                    </h3>
                    <p className="text-purple-200">
                      Hold up your emotion card to the camera to unlock today's activity!
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Card Recognition Overlay */}
          {detectedCard && (
            <CardRecognitionOverlay
              card={detectedCard}
              onLearnMore={() => setShowDescription(true)}
              onPractice={() => setShowBreathing(true)}
            />
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-500/20 rounded-xl">
            <div className="flex items-center gap-2">
              <RefreshCcw className="w-5 h-5" />
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button
            onClick={() => setShowDescription(true)}
            disabled={!detectedCard}
            className={`p-4 rounded-xl flex items-center justify-center gap-2
              transition-all ${!detectedCard 
                ? 'bg-white/10 text-white/50 cursor-not-allowed' 
                : 'bg-purple-500 hover:bg-purple-600'
              }`}
          >
            <Book className="w-5 h-5" />
            Learn About This Emotion
          </button>
          <button
            onClick={() => setShowBreathing(true)}
            disabled={!detectedCard}
            className={`p-4 rounded-xl flex items-center justify-center gap-2
              transition-all ${!detectedCard 
                ? 'bg-white/10 text-white/50 cursor-not-allowed' 
                : 'bg-pink-500 hover:bg-pink-600'
              }`}
          >
            <Wind className="w-5 h-5" />
            Practice It
          </button>
        </div>
      </div>

      {/* Emotion Description Modal */}
      <EmotionDescription
        isOpen={showDescription}
        onClose={() => setShowDescription(false)}
        emotion={detectedCard}
      />

      {/* Breathing Exercise Modal */}
      <AnimatePresence>
        {showBreathing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50"
          >
            <BreathingExercise
              duration={30}
              onComplete={handleActivityComplete}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reward Notification */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
              flex items-center justify-center p-4"
          >
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 
              rounded-2xl p-8 text-center max-w-sm mx-auto"
            >
              <div className="mb-4">
                <Trophy className="w-12 h-12 text-yellow-300 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                Activity Complete!
              </h3>
              <p className="text-purple-100">
                Great job exploring and practicing your emotions!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}