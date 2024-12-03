import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import type { AssessmentData } from '../../types/assessment';

type Props = {
  history: AssessmentData[];
  activeTab: 'ei' | 'big-five';
};

export default function AssessmentHistory({ history, activeTab }: Props) {
  const getAverageScore = (scores: Record<string, number>) => {
    const values = Object.values(scores);
    return values.reduce((sum, score) => sum + score, 0) / values.length;
  };

  const chartData = history.map(entry => ({
    date: new Date(entry.date).toLocaleDateString(),
    score: activeTab === 'ei' 
      ? getAverageScore(entry.eiScores)
      : getAverageScore(entry.bigFiveScores)
  }));

  const getScoreChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(Math.round(change)),
      direction: change >= 0 ? 'up' : 'down'
    };
  };

  return (
    <div>
      <h4 className="text-lg font-medium text-gray-800 mb-4">Progress History</h4>

      {/* Progress Chart */}
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
              formatter={(value: number) => [Math.round(value) + '%', 'Score']}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke={activeTab === 'ei' ? '#8b5cf6' : '#ec4899'}
              strokeWidth={2}
              dot={{ fill: activeTab === 'ei' ? '#8b5cf6' : '#ec4899', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Assessments */}
      <div className="space-y-4">
        {history.slice(0, 3).map((entry, index) => {
          const prevEntry = history[index + 1];
          const currentScore = activeTab === 'ei'
            ? getAverageScore(entry.eiScores)
            : getAverageScore(entry.bigFiveScores);
          const previousScore = prevEntry
            ? (activeTab === 'ei'
                ? getAverageScore(prevEntry.eiScores)
                : getAverageScore(prevEntry.bigFiveScores))
            : currentScore;
          const change = getScoreChange(currentScore, previousScore);

          return (
            <motion.div
              key={entry.date}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {new Date(entry.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Assessment completed
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-800">
                  {Math.round(currentScore)}%
                </span>
                {change.value > 0 && (
                  <div className="flex items-center gap-1">
                    {change.direction === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={change.direction === 'up' ? 'text-green-600' : 'text-red-600'}>
                      {change.value}%
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}