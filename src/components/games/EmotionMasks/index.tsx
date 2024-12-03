import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Star, Heart, RefreshCw } from 'lucide-react';
import AROverlay from './AROverlay';
import MaskSelector from './MaskSelector';
import PromptText from './PromptText';
import { useARMasks } from './useARMasks';
import type { EmotionMask, GamePrompt } from './types';

export default function EmotionMasks() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    currentMask,
    currentPrompt,
    initializeAR,
    selectMask,
    checkAnswer,
    nextPrompt
  } = useARMasks();

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          await initializeAR(videoRef.current);
          setIsInitialized(true);
        }
      } catch (error) {
        console.error('Camera initialization error:', error);
      }
    };

    initCamera();

    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  const handleMaskSelect = async (mask: EmotionMask) => {
    selectMask(mask);
    const isCorrect = checkAnswer(mask);
    
    if (isCorrect) {
      setShowSuccess(true);
      setScore(prev => prev + 10 * (streak + 1));
      setStreak(prev => prev + 1);
      
      setTimeout(() => {
        setShowSuccess(false);
        nextPrompt();
      }, 1500);
    } else {
      setStreak(0);
    }
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white 
        flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Initializing camera...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Emotion Masks</h1>
            <p className="text-gray-600">Match your expression to the prompt!</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-purple-600">
              <Star className="w-5 h-5" />
              <span className="font-medium">{score} points</span>
            </div>
            {streak > 1 && (
              <div className="flex items-center gap-2 text-pink-600">
                <Heart className="w-5 h-5" />
                <span className="font-medium">{streak}x Streak!</span>
              </div>
            )}
          </div>
        </div>

        {/* Game Area */}
        <div className="relative aspect-video bg-black rounded-xl shadow-lg overflow-hidden mb-6">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover mirror"
          />
          <AROverlay mask={currentMask} />
          <PromptText prompt={currentPrompt} />
        </div>

        {/* Mask Selector */}
        <MaskSelector onSelect={handleMaskSelect} currentMask={currentMask} />

        {/* Success Overlay */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-green-500/20 backdrop-blur-sm z-50 
                flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
                className="bg-white rounded-full p-8"
              >
                <Star className="w-16 h-16 text-yellow-500" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}