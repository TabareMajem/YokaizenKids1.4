import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Star, Users, RefreshCw } from 'lucide-react';
import ActionPanel from './ActionPanel';
import RoleSwitch from './RoleSwitch';
import Timer from './Timer';
import { useGameState } from './useGameState';

export default function HarmonyChoir() {
  const {
    score,
    combo,
    timeLeft,
    currentRole,
    switchRole,
    checkTiming,
    isGameOver,
    startGame,
    resetGame
  } = useGameState();

  const [showTutorial, setShowTutorial] = useState(true);

  useEffect(() => {
    if (!showTutorial) {
      startGame();
    }
  }, [showTutorial]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Harmony Choir</h1>
            <p className="text-gray-600">Create beautiful music together!</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-purple-600">
              <Star className="w-5 h-5" />
              <span className="font-medium">{score} points</span>
            </div>
            {combo > 1 && (
              <div className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full">
                {combo}x Combo!
              </div>
            )}
            <Timer timeLeft={timeLeft} />
          </div>
        </div>

        {/* Game Area */}
        <div className="relative aspect-video bg-gradient-to-b from-purple-100 
          to-purple-50 rounded-xl shadow-lg overflow-hidden">
          <ActionPanel
            currentRole={currentRole}
            onAction={checkTiming}
            disabled={isGameOver}
          />
          
          <RoleSwitch
            currentRole={currentRole}
            onSwitch={switchRole}
            disabled={isGameOver}
          />
        </div>

        {/* Tutorial Modal */}
        <AnimatePresence>
          {showTutorial && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
                flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-2xl p-8 max-w-md text-center"
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center 
                  justify-center mx-auto mb-4">
                  <Music className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Welcome to Harmony Choir!
                </h2>
                <p className="text-gray-600 mb-6">
                  Take turns as different voice parts to create beautiful harmony.
                  Match the rhythm and timing to build your combo score!
                </p>
                <button
                  onClick={() => setShowTutorial(false)}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg
                    hover:bg-purple-700 transition-colors"
                >
                  Start Singing
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Over Modal */}
        <AnimatePresence>
          {isGameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
                flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-2xl p-8 max-w-md text-center"
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center 
                  justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Performance Complete!
                </h2>
                <p className="text-gray-600 mb-6">
                  You scored {score} points with a max combo of {combo}!
                </p>
                <button
                  onClick={resetGame}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg
                    hover:bg-purple-700 transition-colors flex items-center gap-2
                    mx-auto"
                >
                  <RefreshCw className="w-5 h-5" />
                  Perform Again
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}