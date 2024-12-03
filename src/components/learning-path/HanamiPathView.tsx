import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import HanamiMilestone from './HanamiMilestone';
import MilestoneDetail from './MilestoneDetail';
import type { Milestone } from './types';

const milestones: Milestone[] = [
  {
    id: 1,
    title: 'First Steps',
    description: 'Begin your journey of emotional discovery',
    status: 'completed',
    theme: 'sakura',
    position: { x: 50, y: 80 }
  },
  {
    id: 2,
    title: 'Express Yourself',
    description: 'Learn to share your feelings through creative expression',
    status: 'current',
    theme: 'sakura',
    position: { x: 25, y: 60 }
  },
  {
    id: 3,
    title: 'Understanding Others',
    description: 'Develop empathy and connection with others',
    status: 'unlocked',
    theme: 'sakura',
    position: { x: 75, y: 40 }
  },
  {
    id: 4,
    title: 'Inner Harmony',
    description: 'Find balance and peace within yourself',
    status: 'locked',
    theme: 'sakura',
    position: { x: 40, y: 20 }
  }
];

export default function HanamiPathView() {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const completedCount = milestones.filter(m => m.status === 'completed').length;
  const progress = (completedCount / milestones.length) * 100;
  const currentMilestone = milestones.find(m => m.status === 'current');

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-pink-50 via-white to-green-50 overflow-hidden">
      {/* Animated Cherry Blossoms Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -20,
              rotate: 0,
              opacity: 0.8
            }}
            animate={{
              y: window.innerHeight + 20,
              x: `+=${Math.sin(i) * 100}`,
              rotate: 360,
              opacity: 0
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="pink"
              className="w-full h-full opacity-60"
            >
              <path d="M12 2C7.58 2 4 5.58 4 10c0 4.42 7 12 8 12s8-7.58 8-12c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Path Container */}
      <div className="relative max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-pink-800">
          Your Hanami Journey
        </h1>

        {/* Path SVG */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f9a8d4" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 50 80 C 30 70, 20 50, 25 60 S 60 50, 75 40 S 50 30, 40 20"
            fill="none"
            stroke="url(#pathGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>

        {/* Milestones */}
        <div className="relative">
          {milestones.map((milestone) => (
            <HanamiMilestone
              key={milestone.id}
              milestone={milestone}
              onSelect={setSelectedMilestone}
            />
          ))}
        </div>

        {/* Bottom Panel */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg 
            shadow-lg border-t border-pink-100 p-4"
        >
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Progress Bar */}
            <div className="relative h-4 bg-pink-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-pink-500 to-pink-400"
              />
            </div>

            {/* Current Activity Info */}
            {currentMilestone && (
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-pink-900">
                    {currentMilestone.title}
                  </h3>
                  <p className="text-sm text-pink-600">
                    {currentMilestone.description}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedMilestone(currentMilestone)}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-400 
                    text-white font-semibold rounded-full shadow-lg 
                    hover:shadow-xl transform hover:scale-105 transition-all
                    flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Begin Activity
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Milestone Detail Modal */}
      <MilestoneDetail
        milestone={selectedMilestone!}
        isOpen={!!selectedMilestone}
        onClose={() => setSelectedMilestone(null)}
      />
    </div>
  );
}