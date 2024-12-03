import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Sparkles, ChevronRight, Medal, Crown } from 'lucide-react';
import Confetti from './Confetti';
import type { Milestone } from './types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  completedMilestones: Milestone[];
  upcomingMilestones: Milestone[];
  totalXP: number;
  badges: Array<{
    id: string;
    name: string;
    icon: 'trophy' | 'star' | 'medal' | 'crown';
  }>;
};

export default function CheckpointView({
  isOpen,
  onClose,
  completedMilestones,
  upcomingMilestones,
  totalXP,
  badges
}: Props) {
  const getMotivationalMessage = (count: number) => {
    if (count >= 10) return "Amazing journey! You're a true emotion master!";
    if (count >= 5) return "Incredible progress! Keep shining bright!";
    return "Great job! You're learning so much!";
  };

  const getBadgeIcon = (type: string) => {
    switch (type) {
      case 'trophy': return Trophy;
      case 'star': return Star;
      case 'medal': return Medal;
      default: return Crown;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
            flex items-center justify-center p-4"
        >
          <Confetti />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-2xl bg-white rounded-2xl shadow-xl 
              overflow-hidden relative"
          >
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 
              to-pink-500/10 pointer-events-none" />

            {/* Header Section */}
            <div className="relative p-8 text-center">
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="inline-block p-4 bg-gradient-to-br from-yellow-400 
                  to-orange-500 rounded-full mb-4"
              >
                <Trophy className="w-8 h-8 text-white" />
              </motion.div>
              
              <motion.h2
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="text-3xl font-bold text-gray-800 mb-2"
              >
                Checkpoint Reached!
              </motion.h2>
              
              <motion.p
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="text-lg text-purple-600 font-medium"
              >
                {getMotivationalMessage(completedMilestones.length)}
              </motion.p>
            </div>

            {/* Progress Summary */}
            <div className="px-8 pb-6">
              <div className="grid grid-cols-3 gap-4 mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-purple-50 to-purple-100 
                    rounded-xl p-4 text-center"
                >
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    {completedMilestones.length}
                  </div>
                  <div className="text-sm text-purple-600">
                    Milestones Complete
                  </div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-pink-50 to-pink-100 
                    rounded-xl p-4 text-center"
                >
                  <div className="text-3xl font-bold text-pink-600 mb-1">
                    {totalXP}
                  </div>
                  <div className="text-sm text-pink-600">
                    XP Earned
                  </div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-yellow-50 to-yellow-100 
                    rounded-xl p-4 text-center"
                >
                  <div className="text-3xl font-bold text-yellow-600 mb-1">
                    {badges.length}
                  </div>
                  <div className="text-sm text-yellow-600">
                    Badges Earned
                  </div>
                </motion.div>
              </div>

              {/* Badges */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Badges Earned
                </h3>
                <div className="flex flex-wrap gap-3">
                  {badges.map((badge) => {
                    const Icon = getBadgeIcon(badge.icon);
                    return (
                      <motion.div
                        key={badge.id}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", delay: 0.5 }}
                        className="flex flex-col items-center gap-1"
                      >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br 
                          from-purple-500 to-pink-500 flex items-center 
                          justify-center text-white shadow-lg"
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-medium text-gray-600">
                          {badge.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Upcoming Milestones */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Coming Up Next
                </h3>
                <div className="space-y-3">
                  {upcomingMilestones.slice(0, 2).map((milestone) => (
                    <motion.div
                      key={milestone.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="flex items-center gap-3 p-3 bg-gray-50 
                        rounded-lg"
                    >
                      <Sparkles className="w-5 h-5 text-purple-500" />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">
                          {milestone.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {milestone.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Continue Button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                onClick={onClose}
                className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 
                  to-pink-500 text-white font-semibold rounded-xl shadow-lg 
                  hover:shadow-xl transform hover:scale-[1.02] transition-all
                  flex items-center justify-center gap-2"
              >
                Continue the Path
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}