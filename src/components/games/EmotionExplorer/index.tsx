import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Trophy } from 'lucide-react';
import Scene from './Scene';
import OptionButtons from './OptionButtons';
import FeedbackOverlay from './FeedbackOverlay';
import type { GameScene, GameOption } from './types';

export default function EmotionExplorer() {
  const [currentScene, setCurrentScene] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const scenes: GameScene[] = [
    {
      id: 1,
      character: 'Sarah',
      emotion: 'sad',
      background: 'playground',
      dialogue: "Sarah sees her friend playing with someone else at recess.",
      options: [
        {
          id: 'a',
          text: "It's okay to feel sad. Maybe I can join them or find another friend to play with.",
          isCorrect: true,
          feedback: "Great job! Recognizing your feelings and thinking of positive solutions is very mature!"
        },
        {
          id: 'b',
          text: "I'll never have any friends.",
          isCorrect: false,
          feedback: "It's natural to feel sad, but remember that one moment doesn't define all your friendships."
        },
        {
          id: 'c',
          text: "I'm going to tell the teacher they're being mean.",
          isCorrect: false,
          feedback: "While it's good to talk to teachers, they aren't doing anything wrong by playing together."
        }
      ]
    }
    // Add more scenes here
  ];

  const handleOptionSelect = (option: GameOption) => {
    setIsCorrect(option.isCorrect);
    setShowFeedback(true);
    
    if (option.isCorrect) {
      setScore(prev => prev + 10);
    }

    // Progress to next scene after feedback
    setTimeout(() => {
      setShowFeedback(false);
      if (currentScene < scenes.length - 1) {
        setCurrentScene(prev => prev + 1);
      } else {
        setGameComplete(true);
      }
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Emotion Explorer</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-purple-600">
              <Star className="w-5 h-5" />
              <span className="font-medium">{score} points</span>
            </div>
            <div className="flex items-center gap-2 text-pink-600">
              <Heart className="w-5 h-5" />
              <span className="font-medium">Scene {currentScene + 1}/{scenes.length}</span>
            </div>
          </div>
        </div>

        {/* Game Content */}
        <div className="relative">
          <Scene scene={scenes[currentScene]} />
          <OptionButtons 
            options={scenes[currentScene].options}
            onSelect={handleOptionSelect}
            disabled={showFeedback}
          />

          {/* Feedback Overlay */}
          <AnimatePresence>
            {showFeedback && (
              <FeedbackOverlay
                isCorrect={isCorrect}
                message={scenes[currentScene].options.find(o => o.isCorrect === isCorrect)?.feedback || ''}
              />
            )}
          </AnimatePresence>

          {/* Game Complete Screen */}
          <AnimatePresence>
            {gameComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center 
                  justify-center"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white rounded-2xl p-8 text-center max-w-md"
                >
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center 
                    justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Game Complete!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    You scored {score} points and learned valuable emotional skills!
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg
                      hover:bg-purple-700 transition-colors"
                  >
                    Play Again
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}