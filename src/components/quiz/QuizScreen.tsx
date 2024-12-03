import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Clock } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import ImageQuestion from './ImageQuestion';
import LikertQuestion from './LikertQuestion';
import QuizMascot from './QuizMascot';
import QuizResults from './QuizResults';
import { useQuizResults } from '../../hooks/useQuizResults';
import { useBigFiveResults } from '../../hooks/useBigFiveResults';
import { useBullyingAssessment } from '../../hooks/useBullyingAssessment';
import { eiQuestions } from '../../data/eiQuestions';
import { bigFiveQuestions } from '../../data/bigFiveQuestions';
import { bullyingQuestions } from '../../data/bullyingQuestions';
import type { QuizQuestion, QuizResult } from '../../types/quiz';

type Props = {
  assessmentType: 'ei' | 'big-five' | 'bullying';
  onBack: () => void;
  onComplete: (score: number) => void;
};

export default function QuizScreen({ assessmentType, onBack, onComplete }: Props) {
  const { language, t } = useLanguage();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { processResults: processEIResults } = useQuizResults();
  const { processResults: processBigFiveResults } = useBigFiveResults();
  const { processResults: processBullyingResults } = useBullyingAssessment();

  const questions = assessmentType === 'ei' 
    ? eiQuestions 
    : assessmentType === 'big-five'
      ? bigFiveQuestions
      : bullyingQuestions;

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answerId: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answerId
    }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    try {
      let processedResults;
      if (assessmentType === 'ei') {
        processedResults = await processEIResults(
          Object.entries(answers).map(([questionId, answerId]) => ({
            questionId,
            selectedAnswerId: answerId as string
          }))
        );
      } else if (assessmentType === 'big-five') {
        processedResults = await processBigFiveResults(
          Object.entries(answers).map(([questionId, value]) => ({
            questionId,
            value: value as number
          }))
        );
      } else {
        processedResults = await processBullyingResults(
          Object.entries(answers).map(([questionId, value]) => ({
            questionId,
            value: value as number
          }))
        );
      }
      setResults(processedResults);
      setShowResults(true);
    } catch (err) {
      console.error('Failed to process results:', err);
    }
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (showResults && results) {
    return (
      <QuizResults
        session={{
          id: Date.now().toString(),
          startedAt: new Date(),
          completedAt: new Date(),
          results: [],
          totalPoints: 0,
          averageTime: 0,
          skillScores: {}
        }}
        scores={results}
        onRestart={onBack}
        onShare={() => {}}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-purple-100 z-10">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="p-2 hover:bg-purple-50 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-purple-600" />
            </button>
            <div className="ml-4">
              <h1 className="text-lg font-semibold text-purple-900">
                {assessmentType === 'ei' 
                  ? t('assessment.ei.title')
                  : assessmentType === 'big-five'
                    ? t('assessment.bigFive.title')
                    : 'Social Dynamics Assessment'
                }
              </h1>
              <div className="flex items-center gap-1 text-sm text-purple-600">
                <Clock className="w-4 h-4" />
                <span>
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-purple-100">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {currentQuestion.type === 'likert-scale' ? (
          <LikertQuestion
            question={currentQuestion}
            selectedValue={answers[currentQuestion.id] as number}
            onSelect={handleAnswer}
          />
        ) : (
          <ImageQuestion
            question={currentQuestion}
            selectedAnswerId={answers[currentQuestion.id] as string}
            onAnswerSelect={handleAnswer}
          />
        )}
      </div>
    </div>
  );
}