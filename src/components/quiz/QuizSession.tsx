import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Clock } from 'lucide-react';
import ImageQuestion from './ImageQuestion';
import QuizMascot from './QuizMascot';
import type { QuizQuestion, QuizResult } from '../../types/quiz';

type Props = {
  questions: QuizQuestion[];
  onComplete: (results: QuizResult[]) => void;
  onExit: () => void;
};

export default function QuizSession({ questions, onComplete, onExit }: Props) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [timeLeft, setTimeLeft] = useState<number | undefined>(
    questions[0].timeLimit
  );
  const [startTime, setStartTime] = useState<Date>(new Date());

  useEffect(() => {
    if (!timeLeft) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === undefined || prev <= 0) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleTimeUp = () => {
    if (selectedAnswerId) {
      handleNextQuestion();
    } else {
      // Auto-submit with no answer if time runs out
      const result: QuizResult = {
        questionId: questions[currentQuestionIndex].id,
        selectedAnswerId: '',
        isCorrect: false,
        timeSpent: questions[currentQuestionIndex].timeLimit || 0,
        points: 0
      };
      handleNextQuestion(result);
    }
  };

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswerId(answerId);
  };

  const handleNextQuestion = (forcedResult?: QuizResult) => {
    const currentQuestion = questions[currentQuestionIndex];
    const timeSpent = Math.round(
      (new Date().getTime() - startTime.getTime()) / 1000
    );

    const result = forcedResult || {
      questionId: currentQuestion.id,
      selectedAnswerId: selectedAnswerId || '',
      isCorrect: currentQuestion.answers.find(
        a => a.id === selectedAnswerId
      )?.isCorrect || false,
      timeSpent,
      points: currentQuestion.answers.find(
        a => a.id === selectedAnswerId
      )?.isCorrect
        ? currentQuestion.points
        : 0
    };

    setResults(prev => [...prev, result]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswerId(null);
      setTimeLeft(questions[currentQuestionIndex + 1].timeLimit);
      setStartTime(new Date());
    } else {
      onComplete([...results, result]);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          {timeLeft !== undefined && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{timeLeft}s</span>
            </div>
          )}
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
            }}
            className="h-full bg-purple-500 rounded-full"
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <ImageQuestion
            question={currentQuestion}
            selectedAnswerId={selectedAnswerId}
            onAnswerSelect={handleAnswerSelect}
            timeLeft={timeLeft}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={onExit}
          className="px-6 py-3 text-gray-600 hover:bg-gray-100 
            rounded-lg transition-colors"
        >
          Exit Quiz
        </button>
        <button
          onClick={() => handleNextQuestion()}
          disabled={!selectedAnswerId}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg
            hover:bg-purple-700 transition-colors disabled:opacity-50
            disabled:cursor-not-allowed flex items-center gap-2"
        >
          {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Mascot */}
      <div className="fixed bottom-8 right-8">
        <QuizMascot
          state={selectedAnswerId ? 'happy' : 'thinking'}
        />
      </div>
    </div>
  );
}