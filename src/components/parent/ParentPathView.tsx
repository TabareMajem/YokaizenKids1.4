import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Medal, Book } from 'lucide-react';
import ChildProgress from './ChildProgress';
import BadgeCollection from './BadgeCollection';
import ActivitySuggestions from './ActivitySuggestions';
import type { ChildMilestone, Badge, Activity } from './types';

const childMilestones: ChildMilestone[] = [
  {
    id: 1,
    title: 'Understanding Emotions',
    description: 'Learning to identify and name different emotions.',
    status: 'completed',
    completedAt: '2024-03-01',
    badges: ['emotion_expert', 'quick_learner']
  },
  {
    id: 2,
    title: 'Building Empathy',
    description: 'Understanding and responding to others\' feelings.',
    status: 'current',
    progress: 65,
    startedAt: '2024-03-05'
  },
  {
    id: 3,
    title: 'Emotional Expression',
    description: 'Learning healthy ways to express feelings.',
    status: 'upcoming'
  }
];

const earnedBadges: Badge[] = [
  {
    id: 'emotion_expert',
    name: 'Emotion Expert',
    description: 'Successfully identified all basic emotions',
    icon: Heart,
    earnedAt: '2024-03-01'
  },
  {
    id: 'quick_learner',
    name: 'Quick Learner',
    description: 'Completed milestone ahead of schedule',
    icon: Sparkles,
    earnedAt: '2024-03-01'
  },
  {
    id: 'helper_badge',
    name: 'Helper Badge',
    description: 'Helped others understand their feelings',
    icon: Medal,
    earnedAt: '2024-03-03'
  }
];

const suggestedActivities: Activity[] = [
  {
    id: 1,
    title: 'Emotion Story Time',
    description: 'Read stories together and discuss how characters feel',
    duration: '15 mins',
    type: 'reading',
    icon: Book
  },
  {
    id: 2,
    title: 'Feelings Check-In',
    description: 'Daily conversations about emotions using the mood chart',
    duration: '10 mins',
    type: 'discussion',
    icon: Heart
  },
  {
    id: 3,
    title: 'Empathy Role Play',
    description: 'Act out scenarios to practice understanding others',
    duration: '20 mins',
    type: 'interactive',
    icon: Sparkles
  }
];

export default function ParentPathView() {
  const [showActivities, setShowActivities] = useState(false);
  const currentMilestone = childMilestones.find(m => m.status === 'current');

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-purple-100">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Sarah's Journey</h1>
              <p className="text-purple-600">Supporting emotional growth together</p>
            </div>
            <button
              onClick={() => setShowActivities(true)}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 
                text-white rounded-lg shadow-md hover:shadow-lg transition-all
                transform hover:scale-[1.02] flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Suggested Activities
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Progress Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Progress */}
            <ChildProgress
              milestones={childMilestones}
              currentMilestone={currentMilestone!}
            />

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {childMilestones
                  .filter(m => m.status === 'completed')
                  .map(milestone => (
                    <div
                      key={milestone.id}
                      className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg"
                    >
                      <Medal className="w-5 h-5 text-purple-500" />
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {milestone.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Completed on {new Date(milestone.completedAt!).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Badges Collection */}
            <BadgeCollection badges={earnedBadges} />

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 
              rounded-xl shadow-lg p-6 text-white"
            >
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => setShowActivities(true)}
                  className="w-full py-2 px-4 bg-white/10 rounded-lg hover:bg-white/20 
                    transition-colors flex items-center gap-2"
                >
                  <Book className="w-5 h-5" />
                  View Activity Ideas
                </button>
                <button
                  className="w-full py-2 px-4 bg-white/10 rounded-lg hover:bg-white/20 
                    transition-colors flex items-center gap-2"
                >
                  <Heart className="w-5 h-5" />
                  Schedule Check-in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Suggestions Modal */}
      <ActivitySuggestions
        isOpen={showActivities}
        onClose={() => setShowActivities(false)}
        activities={suggestedActivities}
        currentMilestone={currentMilestone!}
      />
    </div>
  );
}