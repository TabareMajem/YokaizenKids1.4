import React from 'react';
import { motion } from 'framer-motion';
import { Star, Lock, CheckCircle2, CloudSun, Leaf, Sparkles } from 'lucide-react';
import type { Milestone } from './types';

type Props = {
  milestone: Milestone;
};

export default function PathNode({ milestone }: Props) {
  const getThemeIcon = () => {
    switch (milestone.theme) {
      case 'star':
        return <Star className="w-6 h-6" />;
      case 'cloud':
        return <CloudSun className="w-6 h-6" />;
      case 'island':
        return <Leaf className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  const getStatusIcon = () => {
    switch (milestone.status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'locked':
        return <Lock className="w-5 h-5 text-gray-400" />;
      default:
        return null;
    }
  };

  const getNodeStyles = () => {
    switch (milestone.status) {
      case 'completed':
        return 'bg-green-100 border-green-300 text-green-700';
      case 'current':
        return 'bg-purple-100 border-purple-300 text-purple-700';
      case 'unlocked':
        return 'bg-blue-100 border-blue-300 text-blue-700';
      case 'locked':
        return 'bg-gray-100 border-gray-300 text-gray-500';
    }
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
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-20 h-20 rounded-2xl ${getNodeStyles()} 
          border-2 shadow-lg flex items-center justify-center
          cursor-pointer transition-colors relative`}
      >
        {milestone.status === 'current' && (
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-purple-300 rounded-2xl -z-10"
          />
        )}
        {getThemeIcon()}
      </motion.div>

      {/* Status Badge */}
      {getStatusIcon() && (
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white 
          shadow-md flex items-center justify-center">
          {getStatusIcon()}
        </div>
      )}

      {/* Title */}
      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 
        whitespace-nowrap text-center">
        <p className={`font-medium ${
          milestone.status === 'locked' ? 'text-gray-400' : 'text-purple-900'
        }`}>
          {milestone.title}
        </p>
      </div>
    </motion.div>
  );
}