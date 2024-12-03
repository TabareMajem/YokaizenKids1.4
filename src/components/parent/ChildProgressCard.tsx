import React from 'react';
import { motion } from 'framer-motion';
import { Star, Book, Clock, ChevronRight } from 'lucide-react';
import type { ChildProgress } from '../../hooks/useParentDashboard';

type Props = {
  child: ChildProgress;
};

export default function ChildProgressCard({ child }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{child.name}</h3>
            <p className="text-purple-600">
              Latest Mood: {child.recentMood.dominantEmotion}
            </p>
          </div>
          <div className="flex -space-x-2">
            {child.skills.slice(0, 3).map((skill, index) => (
              <div
                key={skill.name}
                className="w-8 h-8 rounded-full bg-purple-100 flex items-center 
                  justify-center border-2 border-white"
                title={skill.name}
              >
                <Star className="w-4 h-4 text-purple-600" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {child.weeklyActivity.journalEntries}
            </div>
            <div className="text-sm text-gray-500">Journal Entries</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {child.weeklyActivity.completedActivities}
            </div>
            <div className="text-sm text-gray-500">Activities</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {Math.round(child.weeklyActivity.totalTime / 60)}h
            </div>
            <div className="text-sm text-gray-500">Time Spent</div>
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600">Milestones</span>
              <span className="text-sm font-medium text-gray-800">
                {child.milestones.completed}/{child.milestones.total}
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 rounded-full"
                style={{
                  width: `${(child.milestones.completed / child.milestones.total) * 100}%`
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600">Weekly Goals</span>
              <span className="text-sm font-medium text-gray-800">
                {child.weeklyActivity.completedActivities}/10
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{
                  width: `${(child.weeklyActivity.completedActivities / 10) * 100}%`
                }}
              />
            </div>
          </div>
        </div>

        <button
          className="w-full mt-4 py-2 px-4 bg-purple-50 text-purple-600 
            rounded-lg hover:bg-purple-100 transition-colors flex items-center 
            justify-center gap-2"
        >
          View Details
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}