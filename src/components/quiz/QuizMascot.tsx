import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type MascotState = 'thinking' | 'happy' | 'sad';

type Props = {
  state: MascotState;
};

export default function QuizMascot({ state }: Props) {
  const getExpression = () => {
    switch (state) {
      case 'thinking':
        return (
          <motion.div
            key="thinking"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="relative"
          >
            <div className="w-32 h-32 bg-yellow-400 rounded-full">
              <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-black rounded-full">
                <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full" />
              </div>
              <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-black rounded-full">
                <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full" />
              </div>
              <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2">
                <motion.div
                  animate={{
                    scaleX: [1, 0.8, 1],
                    translateY: [0, -2, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-12 h-2 bg-black rounded-full"
                />
              </div>
            </div>
            <motion.div
              animate={{
                rotate: [0, 10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-4 w-8 h-8 text-gray-400"
            >
              ?
            </motion.div>
          </motion.div>
        );
      
      case 'happy':
        return (
          <motion.div
            key="happy"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="relative"
          >
            <motion.div
              animate={{
                y: [0, -10, 0]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-32 h-32 bg-yellow-400 rounded-full"
            >
              <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-black rounded-full">
                <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full" />
              </div>
              <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-black rounded-full">
                <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full" />
              </div>
              <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-16 h-8 border-b-4 border-black rounded-full" />
            </motion.div>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-4 text-yellow-500"
            >
              ✨
            </motion.div>
          </motion.div>
        );
      
      case 'sad':
        return (
          <motion.div
            key="sad"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="relative"
          >
            <div className="w-32 h-32 bg-yellow-400 rounded-full">
              <motion.div
                animate={{
                  y: [0, 2, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-black rounded-full opacity-70">
                  <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full" />
                </div>
                <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-black rounded-full opacity-70">
                  <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full" />
                </div>
              </motion.div>
              <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-16 h-8 border-t-4 border-black rounded-full" />
            </div>
            <motion.div
              animate={{
                y: [0, 10, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-blue-500"
            >
              💧
            </motion.div>
          </motion.div>
        );
    }
  };

  return (
    <div className="relative w-32 h-32">
      <AnimatePresence mode="wait">
        {getExpression()}
      </AnimatePresence>
    </div>
  );
}