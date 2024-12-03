import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Share2, ChevronRight } from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';
import type { QuizSession } from '../../types/quiz';
import type { EIScores } from '../../hooks/useQuizResults';

type Props = {
  session: QuizSession;
  scores: EIScores;
  onRestart: () => void;
  onShare?: () => void;
};

export default function QuizResults({ session, scores, onRestart, onShare }: Props) {
  const chartData = Object.entries(scores).map(([category, score]) => ({
    category: category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' '),
    score
  }));

  const accuracy = Math.round(
    (session.results.filter(r => r.isCorrect).length / session.results.length) * 100
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-block p-4 bg-gradient-to-br from-yellow-400 
          to-orange-500 rounded-full mb-4">
          <Trophy className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Assessment Complete!
        </h2>
        <p className="text-xl text-purple-600">
          You've completed the assessment with {accuracy}% accuracy
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Performance Summary
          </h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Star className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-gray-600">Total Points</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {session.totalPoints}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Radar Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            EI Component Analysis
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar
                  name="EI Score"
                  dataKey="score"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg
            hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Star className="w-5 h-5" />
          Try Another Assessment
        </button>
        {onShare && (
          <button
            onClick={onShare}
            className="px-6 py-3 bg-white border border-purple-200 
              text-purple-600 rounded-lg hover:bg-purple-50 
              transition-colors flex items-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share Results
          </button>
        )}
      </div>
    </div>
  );
}