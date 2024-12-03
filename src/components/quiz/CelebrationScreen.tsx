import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, ArrowLeft, Heart } from 'lucide-react';
import Confetti from '../learning-path/Confetti';

type Props = {
  score: number;
  totalQuestions: number;
  onBack: () => void;
};

export default function CelebrationScreen({ score, totalQuestions, onBack }: Props) {
  const percentage = (score / totalQuestions) * 100;
  
  const getMessage = () => {
    if (percentage === 100) return "Perfect Score! You're Amazing! 🌟";
    if (percentage >= 80) return "Great Job! You're a Star! ⭐";
    if (percentage >= 60) return "Well Done! Keep Learning! 📚";
    return "Good Try! Let's Practice More! 💪";
  };

  const getRewards = () => {
    const rewards = [];
    if (percentage >= 60) rewards.push({ icon: Star, label: 'Quiz Star' });
    if (percentage >= 80) rewards.push({ icon: Heart, label: 'Emotion Expert' });
    if (percentage === 100) rewards.push({ icon: Trophy, label: 'Perfect Score' });
    return rewards;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-blue-100 to-pink-100 
      flex items-center justify-center p-4">
      <Confetti />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8 text-center">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="inline-block p-4 bg-gradient-to-br from-yellow-400 
              to-orange-500 rounded-full mb-6"
          >
            <Trophy className="w-8 h-8 text-white" />
          </motion.div>

          <motion.h2
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-3xl font-bold text-gray-800 mb-2"
          >
            {getMessage()}
          </motion.h2>

          <motion.p
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-lg text-gray-600 mb-8"
          >
            You got {score} out of {totalQuestions} questions right!
          </motion.p>

          {/* Score Circle */}
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="relative w-32 h-32"
            >
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="10"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="10"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: percentage / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  style={{
                    transform: "rotate(-90deg)",
                    transformOrigin: "50% 50%",
                    strokeDasharray: "283",
                    strokeDashoffset: "283"
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-purple-600">
                  {percentage}%
                </span>
              </div>
            </motion.div>
          </div>

          {/* Rewards */}
          <div className="flex justify-center gap-4 mb-8">
            {getRewards().map((reward, index) => (
              <motion.div
                key={reward.label}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  delay: 0.2 + index * 0.1
                }}
                className="flex flex-col items-center gap-2"
              >
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 
                  rounded-full text-white shadow-lg">
                  <reward.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {reward.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Back Button */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            onClick={onBack}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 
              text-white font-semibold rounded-full shadow-lg 
              hover:shadow-xl transform hover:scale-105 transition-all
              flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Learning Path
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}