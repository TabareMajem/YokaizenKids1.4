import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Star, Users, TrendingUp } from 'lucide-react';
import type { BigFiveScores } from '../../hooks/useBigFiveResults';

type Props = {
  scores: BigFiveScores;
  previousScores?: BigFiveScores;
};

const traitDetails = {
  'openness': {
    icon: Brain,
    description: 'Curiosity, creativity, and openness to new experiences'
  },
  'conscientiousness': {
    icon: Star,
    description: 'Organization, responsibility, and goal-oriented behavior'
  },
  'extraversion': {
    icon: Users,
    description: 'Sociability, energy, and outgoing nature'
  },
  'agreeableness': {
    icon: Heart,
    description: 'Kindness, cooperation, and consideration for others'
  },
  'emotional-stability': {
    icon: TrendingUp,
    description: 'Ability to handle stress and maintain emotional balance'
  }
};

export default function BigFiveResultsCard({ scores, previousScores }: Props) {
  const getImprovement = (current: number, previous?: number) => {
    if (!previous) return null;
    return ((current - previous) / previous) * 100;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Big Five Personality Assessment
      </h3>

      <div className="space-y-6">
        {(Object.entries(scores) as [keyof BigFiveScores, number][]).map(([trait, score]) => {
          const details = traitDetails[trait];
          const Icon = details.icon;
          const improvement = previousScores ? getImprovement(score, previousScores[trait]) : null;

          return (
            <motion.div
              key={trait}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-4"
            >
              <div className="p-3 bg-purple-100 rounded-xl">
                <Icon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-800">
                    {trait.charAt(0).toUpperCase() + trait.slice(1)}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-800">
                      {Math.round(score)}%
                    </span>
                    {improvement !== null && (
                      <span className={`text-sm ${
                        improvement >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {improvement >= 0 ? '↑' : '↓'} 
                        {Math.abs(Math.round(improvement))}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    className="h-full bg-purple-500 rounded-full"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  {details.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}