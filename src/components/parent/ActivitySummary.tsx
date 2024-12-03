import React from 'react';
import { motion } from 'framer-motion';
import { Book, Brain, Star } from 'lucide-react';
import type { ChildProgress } from '../../hooks/useParentDashboard';

type Props = {
  children: ChildProgress[];
};

export default function ActivitySummary({ children }: Props) {
  const totalActivities = children.reduce(
    (sum, child) => sum + child.weeklyActivity.completedActivities,
    0
  );

  const totalTime = children.reduce(
    (sum, child) => sum + child.weeklyActivity.totalTime,
    0
  );

  const averageProgress = Math.round(
    children.reduce(
      (sum, child) => 
        sum + (child.milestones.completed / child.milestones.total) * 100,
      0
    ) / children.length
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        Weekly Activity Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-purple-50 rounded-lg p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Book className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-800">Activities Completed</h3>
          </div>
          <p className="text-2xl font-bold text-purple-600">{totalActivities}</p>
          <p className="text-sm text-gray-600 mt-1">
            {Math.round(totalTime / 60)} hours total
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-pink-50 rounded-lg p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-pink-100 rounded-lg">
              <Brain className="w-5 h-5 text-pink-600" />
            </div>
            <h3 className="font-medium text-gray-800">Average Progress</h3>
          </div>
          <p className="text-2xl font-bold text-pink-600">{averageProgress}%</p>
          <p className="text-sm text-gray-600 mt-1">
            Across all milestones
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-yellow-50 rounded-lg p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <h3 className="font-medium text-gray-800">Skills Developed</h3>
          </div>
          <p className="text-2xl font-bold text-yellow-600">
            {children.reduce((sum, child) => sum + child.skills.length, 0)}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            New abilities unlocked
          </p>
        </motion.div>
      </div>
    </div>
  );
}