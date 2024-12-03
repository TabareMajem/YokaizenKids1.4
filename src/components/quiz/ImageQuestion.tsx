import React from 'react';
import { motion } from 'framer-motion';
import AudioButton from './AudioButton';
import type { QuizQuestion } from '../../types/quiz';

type Props = {
  question: QuizQuestion;
  selectedAnswerId: string | null;
  onAnswerSelect: (answerId: string) => void;
  timeLeft?: number;
};

export default function ImageQuestion({
  question,
  selectedAnswerId,
  onAnswerSelect,
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

      {/* Answer Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.answers.map((answer) => (
          <div
            key={answer.id}
            onClick={() => onAnswerSelect(answer.id)}
            className={`p-4 rounded-xl text-left transition-all cursor-pointer
              ${selectedAnswerId === answer.id
                ? 'bg-purple-100 border-2 border-purple-400'
                : 'bg-white border-2 border-gray-200 hover:border-purple-200'
              }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="font-medium text-gray-800">{answer.text}</p>
              </div>
              <div className="flex-shrink-0">
                <AudioButton text={answer.text} language={question.audio?.language} />
              </div>
            </div>
            {answer.image && (
              <div className="mt-3">
                <img
                  src={answer.image.url}
                  alt={answer.image.alt}
                  className="w-full rounded-lg"
                  width={answer.image.width}
                  height={answer.image.height}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}