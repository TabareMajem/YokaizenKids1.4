import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Pencil, 
  Brain, 
  Heart, 
  Medal, 
  Lock,
  Star,
  Trophy,
  Sparkles,
  Book
} from 'lucide-react';
import type { Milestone } from './types';
import type { Content } from '../../types/content';

type Props = {
  milestone: Milestone;
  isOpen: boolean;
  onClose: () => void;
};

export default function MilestoneDetail({ milestone, isOpen, onClose }: Props) {
  if (!milestone) return null;

  const getActivityIcon = () => {
    switch (milestone.activity?.type) {
      case 'activity':
        return <Pencil className="w-6 h-6" />;
      case 'prompt':
        return <Brain className="w-6 h-6" />;
      case 'lesson':
        return <Book className="w-6 h-6" />;
      default:
        return <Star className="w-6 h-6" />;
    }
  };

  const getThemeStyles = () => {
    switch (milestone.theme) {
      case 'star':
        return 'from-amber-100 to-orange-100';
      case 'cloud':
        return 'from-blue-100 to-cyan-100';
      case 'island':
        return 'from-emerald-100 to-teal-100';
      default:
        return 'from-purple-100 to-pink-100';
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
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className={`w-full max-w-lg bg-gradient-to-br ${getThemeStyles()} 
              rounded-2xl shadow-xl overflow-hidden`}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-6 flex items-center gap-4">
              <div className="p-3 bg-white/90 rounded-xl shadow-sm">
                {getActivityIcon()}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800">
                  {milestone.title || milestone.activity?.title}
                </h2>
                <p className="text-gray-600">
                  {milestone.description || milestone.activity?.description}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 pt-0 space-y-6">
              {/* Activity Content */}
              {milestone.activity && (
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Activity Content
                  </h3>
                  <div className="prose prose-sm max-w-none">
                    {milestone.activity.content}
                  </div>
                  {milestone.activity.metadata?.duration && (
                    <div className="mt-4 text-sm text-gray-600">
                      Duration: {milestone.activity.metadata.duration} minutes
                    </div>
                  )}
                </div>
              )}

              {/* Status */}
              {milestone.status === 'completed' ? (
                <div className="flex items-center gap-2 text-green-600 bg-white/50 
                  rounded-lg p-3">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-medium">Activity Completed!</span>
                </div>
              ) : milestone.status === 'current' || milestone.status === 'unlocked' ? (
                <div className="bg-white/50 rounded-lg p-3">
                  <p className="text-gray-700 mb-2">
                    Ready to start your journey of emotional discovery?
                  </p>
                  <div className="h-2 bg-white rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-0" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-gray-500 bg-white/50 
                  rounded-lg p-3">
                  <Lock className="w-5 h-5" />
                  <span>Complete previous milestone to unlock</span>
                </div>
              )}

              {/* Rewards */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Rewards
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 1, name: 'Explorer Badge', icon: Medal, unlocked: milestone.status === 'completed' },
                    { id: 2, name: 'Star Achiever', icon: Star, unlocked: milestone.status === 'completed' },
                    { id: 3, name: 'Master Trophy', icon: Trophy, unlocked: false }
                  ].map(reward => (
                    <div
                      key={reward.id}
                      className={`aspect-square rounded-xl p-3 flex flex-col 
                        items-center justify-center text-center gap-2
                        ${reward.unlocked 
                          ? 'bg-white/90 text-purple-600' 
                          : 'bg-white/50 text-gray-400'
                        }`}
                    >
                      <reward.icon className="w-8 h-8" />
                      <span className="text-sm font-medium">
                        {reward.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                disabled={milestone.status === 'locked'}
                className={`w-full py-3 px-6 rounded-xl font-semibold
                  transform transition-all active:scale-95
                  ${milestone.status === 'locked'
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]'
                  }`}
              >
                {milestone.status === 'locked'
                  ? 'Locked'
                  : milestone.status === 'completed'
                    ? 'Play Again'
                    : 'Start Now'
                }
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}