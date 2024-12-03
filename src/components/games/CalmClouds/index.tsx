import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Heart, Star } from 'lucide-react';
import InteractiveCanvas from './InteractiveCanvas';
import WorryCloud from './WorryCloud';
import CompletionScreen from './CompletionScreen';
import { useGameState } from './useGameState';

export default function CalmClouds() {
  const {
    worries,
    score,
    addWorry,
    removeWorry,
    isComplete,
    setIsComplete
  } = useGameState();

  const [showInput, setShowInput] = useState(false);
  const [newWorry, setNewWorry] = useState('');

  const handleAddWorry = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWorry.trim()) {
      addWorry(newWorry);
      setNewWorry('');
      setShowInput(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Calm Clouds</h1>
            <p className="text-gray-600">Release your worries into the sky</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-purple-600">
              <Star className="w-5 h-5" />
              <span className="font-medium">{score} released</span>
            </div>
            <div className="flex items-center gap-2 text-pink-600">
              <Heart className="w-5 h-5" />
              <span className="font-medium">{worries.length} remaining</span>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="relative aspect-video bg-gradient-to-b from-blue-200 to-blue-100 
          rounded-xl shadow-lg overflow-hidden mb-6">
          <InteractiveCanvas>
            {worries.map(worry => (
              <WorryCloud
                key={worry.id}
                worry={worry}
                onRelease={removeWorry}
              />
            ))}
          </InteractiveCanvas>

          {/* Add Worry Button */}
          <button
            onClick={() => setShowInput(true)}
            className="absolute bottom-6 right-6 px-4 py-2 bg-white/90 backdrop-blur-sm
              text-blue-600 rounded-lg hover:bg-white transition-colors
              flex items-center gap-2 shadow-lg"
          >
            <Cloud className="w-5 h-5" />
            Add Worry
          </button>
        </div>

        {/* Add Worry Form */}
        <AnimatePresence>
          {showInput && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onSubmit={handleAddWorry}
              className="bg-white rounded-xl shadow-sm p-6 mb-6"
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What's on your mind?
              </label>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={newWorry}
                  onChange={(e) => setNewWorry(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                  placeholder="Type your worry here..."
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg
                    hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowInput(false)}
                  className="px-6 py-2 text-gray-600 hover:bg-gray-100
                    rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Completion Screen */}
        <AnimatePresence>
          {isComplete && (
            <CompletionScreen
              score={score}
              onClose={() => setIsComplete(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}