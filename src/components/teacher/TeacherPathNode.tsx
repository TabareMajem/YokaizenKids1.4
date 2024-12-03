import React from 'react';
import { motion } from 'framer-motion';
import { Star, CloudSun, Leaf, Users } from 'lucide-react';
import type { TeacherMilestone } from './types';

type Props = {
  milestone: TeacherMilestone;
  totalStudents: number;
  onSelect: () => void;
};

export default function TeacherPathNode({ milestone, totalStudents, onSelect }: Props) {
  const getThemeIcon = () => {
    switch (milestone.theme) {
      case 'star':
        return <Star className="w-6 h-6" />;
      case 'cloud':
        return <CloudSun className="w-6 h-6" />;
      case 'island':
        return <Leaf className="w-6 h-6" />;
    }
  };

  const getCompletionColor = () => {
    const completionRate = milestone.studentProgress.completed / totalStudents;
    if (completionRate >= 0.7) return 'bg-green-100 border-green-300 text-green-700';
    if (completionRate >= 0.3) return 'bg-yellow-100 border-yellow-300 text-yellow-700';
    return 'bg-red-100 border-red-300 text-red-700';
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
      style={{
        position: 'absolute',
        left: `${milestone.position.x}%`,
        top: `${milestone.position.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      className="relative"
    >
      {/* Node */}
      <motion.button
        onClick={onSelect}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-24 h-24 rounded-2xl ${getCompletionColor()} 
          border-2 shadow-lg flex flex-col items-center justify-center
          cursor-pointer transition-colors relative gap-2`}
      >
        {getThemeIcon()}
        
        <div className="flex items-center gap-1 text-sm">
          <Users className="w-4 h-4" />
          <span>{milestone.studentProgress.completed}/{totalStudents}</span>
        </div>
      </motion.button>

      {/* Progress Ring */}
      <svg
        className="absolute -top-2 -right-2 w-8 h-8 transform rotate-[-90deg]"
        viewBox="0 0 32 32"
      >
        <circle
          cx="16"
          cy="16"
          r="14"
          fill="white"
          stroke="#e2e8f0"
          strokeWidth="2"
        />
        <circle
          cx="16"
          cy="16"
          r="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray={88}
          strokeDashoffset={88 - (88 * milestone.studentProgress.completed / totalStudents)}
          className={milestone.studentProgress.completed === totalStudents 
            ? 'text-green-500' 
            : 'text-purple-500'
          }
        />
      </svg>

      {/* Title */}
      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 
        whitespace-nowrap text-center">
        <p className="font-medium text-gray-800">
          {milestone.title}
        </p>
      </div>
    </motion.div>
  );
}