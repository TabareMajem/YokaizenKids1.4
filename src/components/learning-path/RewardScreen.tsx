import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Share2, ChevronRight, Sparkles, Medal } from 'lucide-react';
import Confetti from './Confetti';
import type { Milestone } from './types';

type Props = {
  milestone: Milestone;
  xpEarned: number;
  isOpen: boolean;
  onClose: () => void;
  onShare: () => void;
};

export default function RewardScreen({ milestone, xpEarned, isOpen, onClose, onShare }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
            flex items-center justify-center p-4"
        >
          <Confetti />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Badge Section */}
            <div className="relative pt-12 pb-8 text-center">
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 
                to-pink-500/10 pointer-events-none" />
              
              {/* Badge Icon */}
              <div className="relative">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="relative mx-auto"
                >
                  {/* Outer Glow */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-purple-500 rounded-full blur-xl"
                  />
                  
                  {/* Badge Circle */}
                  <div className="relative w-32 h-32 bg-gradient-to-br from-purple-500 
                    to-pink-500 rounded-full flex items-center justify-center 
                    shadow-xl"
                  >
                    <Medal className="w-16 h-16 text-white" />
                    
                    {/* Sparkles */}
                    <motion.div
                      animate={{
                        rotate: 360
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="absolute inset-0"
                    >
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            delay: i * 0.2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="absolute w-3 h-3"
                          style={{
                            left: '50%',
                            top: '50%',
                            transform: `rotate(${i * 45}deg) translate(60px, -50%)`
                          }}
                        >
                          <Sparkles className="w-full h-full text-yellow-400" />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Congratulations Text */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8 space-y-2"
              >
                <h2 className="text-3xl font-bold text-gray-800">
                  Congratulations!
                </h2>
                <p className="text-lg text-purple-600">
                  You've unlocked the {milestone.title} Badge!
                </p>
              </motion.div>
            </div>

            {/* XP and Stats */}
            <div className="px-8 pb-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 
                  rounded-xl p-6 mb-8"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium text-gray-600">XP Earned</span>
                  </div>
                  <span className="text-2xl font-bold text-purple-600">
                    +{xpEarned}
                  </span>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={onShare}
                  className="px-6 py-3 bg-purple-100 text-purple-600 
                    font-semibold rounded-xl hover:bg-purple-200 
                    transition-colors flex items-center justify-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  Share Progress
                </motion.button>
                
                <motion.button
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={onClose}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 
                    to-pink-500 text-white font-semibold rounded-xl 
                    shadow-lg hover:shadow-xl transform hover:scale-[1.02] 
                    transition-all flex items-center justify-center gap-2"
                >
                  Continue Path
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}