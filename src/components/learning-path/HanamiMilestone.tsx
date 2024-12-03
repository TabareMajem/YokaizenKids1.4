import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle2 } from 'lucide-react';
import type { Milestone } from './types';

type Props = {
  milestone: Milestone;
  onSelect: (milestone: Milestone) => void;
};

export default function HanamiMilestone({ milestone, onSelect }: Props) {
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
        return 'bg-pink-100 border-pink-300 text-pink-700';
      case 'unlocked':
        return 'bg-pink-50 border-pink-200 text-pink-600';
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
      {/* Cherry Blossom Node */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect(milestone)}
        className={`w-20 h-20 rounded-full ${getNodeStyles()} 
          border-2 shadow-lg transition-colors relative overflow-hidden
          flex items-center justify-center`}
      >
        {/* Petal Animation */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8 bg-pink-200/30"
              style={{
                borderRadius: '50% 50% 50% 0',
                left: '50%',
                top: '50%',
                transform: `rotate(${i * 72}deg) translateY(-12px)`
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>

        {/* Center */}
        <div className="relative w-6 h-6 rounded-full bg-current" />
      </motion.button>

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
          milestone.status === 'locked' ? 'text-gray-400' : 'text-pink-900'
        }`}>
          {milestone.title}
        </p>
      </div>
    </motion.div>
  );
}