import React from 'react';
import { motion } from 'framer-motion';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { Brain, Heart, Users, Star } from 'lucide-react';

type CategoryScore = {
  category: string;
  score: number;
  icon: typeof Brain;
  description: string;
};

type Props = {
  scores: CategoryScore[];
  className?: string;
};

const categoryIcons = {
  'emotional-awareness': Brain,
  'empathy': Heart,
  'social-skills': Users,
  'mindfulness': Star
};

export default function QuizResultsChart({ scores, className = '' }: Props) {
  const chartData = scores.map(score => ({
    subject: score.category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' '),
    score: score.score
  }));

  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Assessment Results
      </h3>

      {/* Radar Chart */}
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.6}
            />
            <Tooltip
              formatter={(value: number) => [`${value}%`, 'Score']}
              contentStyle={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Details */}
      <div className="grid grid-cols-2 gap-4">
        {scores.map((score) => {
          const Icon = categoryIcons[score.category as keyof typeof categoryIcons] || Star;
          return (
            <motion.div
              key={score.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Icon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">
                    {score.category.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-gray-200 rounded-full">
                      <div 
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: `${score.score}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      {score.score}%
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {score.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}