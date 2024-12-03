import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Star, Users, TrendingUp } from 'lucide-react';
import type { AssessmentData } from '../../types/assessment';
import type { BullyingScores } from '../../hooks/useBullyingAssessment';

type Props = {
  data: AssessmentData[];
};

const getRiskLevel = (score: number) => {
  if (score >= 70) return { level: 'High', color: 'text-red-600 bg-red-100' };
  if (score >= 40) return { level: 'Moderate', color: 'text-yellow-600 bg-yellow-100' };
  return { level: 'Low', color: 'text-green-600 bg-green-100' };
};

export default function AssessmentProgress({ data }: Props) {
  const latestAssessment = data[0];

  if (!latestAssessment) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Assessment Results</h3>
        <p className="text-gray-600 text-center py-8">No assessment data available yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Assessment Results</h3>

      {/* EI Assessment Section */}
      <div className="mb-8">
        <h4 className="text-md font-medium text-gray-700 mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-500" />
          Emotional Intelligence Assessment
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(latestAssessment.eiScores).map(([category, score]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 rounded-lg p-4"
            >
              <h5 className="font-medium text-gray-800 capitalize mb-2">
                {category.split('-').join(' ')}
              </h5>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">{score}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: `${score}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Big Five Assessment Section */}
      <div className="mb-8">
        <h4 className="text-md font-medium text-gray-700 mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          Big Five Personality Assessment
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(latestAssessment.bigFiveScores).map(([trait, score]) => (
            <motion.div
              key={trait}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 rounded-lg p-4"
            >
              <h5 className="font-medium text-gray-800 capitalize mb-2">
                {trait.split('-').join(' ')}
              </h5>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">{score}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-yellow-500 rounded-full"
                  style={{ width: `${score}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Social Dynamics Assessment Section */}
      <div>
        <h4 className="text-md font-medium text-gray-700 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-500" />
          Social Dynamics Assessment
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(latestAssessment.bullyingScores).map(([category, score]) => {
            const { level, color } = getRiskLevel(score);
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-800 capitalize">
                    {category.replace('_', ' ')}
                  </h5>
                  <span className={`px-2 py-1 rounded-full text-sm ${color}`}>
                    {level} Risk
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Assessment Date */}
      <div className="mt-6 text-sm text-gray-500 text-right">
        Last assessed: {new Date(latestAssessment.date).toLocaleDateString()}
      </div>
    </div>
  );
}