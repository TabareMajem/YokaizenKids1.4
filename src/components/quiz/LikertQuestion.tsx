import React from 'react';
import { motion } from 'framer-motion';
import AudioButton from './AudioButton';
import type { QuizQuestion } from '../../types/quiz';

type Props = {
  question: QuizQuestion;
  selectedValue: number | null;
  onSelect: (value: number) => void;
  timeLeft?: number;
};

const likertOptions = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' }
];

export default function LikertQuestion({ 
  question, 
  selectedValue, 
  onSelect,
  timeLeft 
}: Props) {
  return (
    <div className="space-y-6">
      {/* Question Header */}
      <div className="relative">
        {/* Timer */}
        {timeLeft !== undefined && (
          <div className="absolute top-0 right-0 w-12 h-12 rounded-full 
            bg-purple-100 flex items-center justify-center text-purple-600 
            font-bold">
            {timeLeft}
          </div>
        )}

        {/* Question Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-4"
        >
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">
              {question.text}
            </h2>
          </div>
          <div className="flex-shrink-0">
            <AudioButton text={question.text} language={question.audio?.language} />
          </div>
        </motion.div>

        {/* Question Image */}
        {question.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4"
          >
            <img
              src={question.image.url}
              alt={question.image.alt}
              className="w-full max-w-2xl mx-auto rounded-xl shadow-lg"
              width={question.image.width}
              height={question.image.height}
            />
          </motion.div>
        )}
      </div>

      {/* Likert Scale */}
      <div className="grid grid-cols-5 gap-4">
        {likertOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`p-4 rounded-xl text-center transition-all transform
              hover:scale-105 ${
                selectedValue === option.value
                  ? 'bg-purple-100 border-2 border-purple-400'
                  : 'bg-white border-2 border-gray-200 hover:border-purple-200'
              }`}
          >
            <div className="text-2xl font-bold text-gray-800 mb-2">
              {option.value}
            </div>
            <div className="text-sm text-gray-600">
              {option.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}