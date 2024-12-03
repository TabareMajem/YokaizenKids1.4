import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Heart, Brain } from 'lucide-react';

type Props = {
  companion: {
    name: string;
    level: number;
    experience: number;
  };
};

export default function CompanionProgress({ companion }: Props) {
  const achievements = [
    {
      id: 1,
      title: 'Emotional Expert',
      description: 'Identified 50 different emotions',
      icon: Heart,
      progress: 75
    },
    {
      id: 2,
      title: 'Mindfulness Master',
      description: 'Completed 20 mindfulness exercises',
      icon: Brain,
      progress: 60
    },
    {
      id: 3,
      title: 'Story Creator',
      description: 'Created 10 emotional stories',
      icon: Star,
      progress: 90
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <Trophy className="w-6 h-6 text-purple-500" />
        Progress & Achievements
      </h2>

      {/* Level Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">Level {companion.level}</span>
          <span className="text-sm text-purple-600">
            {companion.experience}/100 XP
          </span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${companion.experience}%` }}
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          />
        </div>
      </div>

      {/* Achievements */}
      <div className="space-y-6">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <achievement.icon className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">
                  {achievement.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {achievement.description}
                </p>
              </div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${achievement.progress}%` }}
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}