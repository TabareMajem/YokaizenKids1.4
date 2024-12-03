import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import type { Puzzle } from './types';

type Props = {
  puzzle: Puzzle;
  onSolve: (answer: string) => void;
  onClose: () => void;
};

export default function ProverbPuzzle({ puzzle, onSolve, onClose }: Props) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswer = () => {
    if (!selectedOption) return;

    const correct = selectedOption === puzzle.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setTimeout(() => {
        onSolve(selectedOption);
      }, 2000);
    } else {
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedOption(null);
      }, 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/50 backdrop-blur-sm p-6"
    >
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Proverb Puzzle
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              {puzzle.situation}
            </h3>
            <p className="text-gray-600">
              Which proverb best applies to this situation?
            </p>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {puzzle.options.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedOption(option)}
                disabled={showFeedback}
                className={`w-full p-4 rounded-lg text-left transition-colors ${
                  selectedOption === option
                    ? 'bg-amber-100 border-2 border-amber-300'
                    : 'bg-white border-2 border-gray-200 hover:border-amber-200'
                } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleAnswer}
            disabled={!selectedOption || showFeedback}
            className="mt-6 w-full py-3 bg-amber-600 text-white rounded-lg
              hover:bg-amber-700 transition-colors disabled:opacity-50
              disabled:cursor-not-allowed"
          >
            Submit Answer
          </button>
        </div>

        {/* Feedback Overlay */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm
                flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className={`p-6 rounded-xl ${
                  isCorrect ? 'bg-green-100' : 'bg-red-100'
                }`}
              >
                {isCorrect ? (
                  <div className="text-center text-green-700">
                    <CheckCircle2 className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-lg font-medium">Correct!</p>
                    <p>You've learned a valuable proverb.</p>
                  </div>
                ) : (
                  <div className="text-center text-red-700">
                    <AlertCircle className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-lg font-medium">Not quite right</p>
                    <p>Try again with a different answer.</p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}