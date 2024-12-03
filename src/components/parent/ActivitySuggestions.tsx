import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, ChevronRight } from 'lucide-react';
import type { Activity, ChildMilestone } from './types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  activities: Activity[];
  currentMilestone: ChildMilestone;
};

export default function ActivitySuggestions({ 
  isOpen, 
  onClose, 
  activities,
  currentMilestone 
}: Props) {
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
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-2xl bg-white rounded-2xl shadow-xl 
              overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Suggested Activities
                  </h2>
                  <p className="text-purple-600">
                    Supporting: {currentMilestone.title}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Activities List */}
            <div className="p-6">
              <div className="grid gap-4">
                {activities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="bg-purple-50 rounded-xl p-4 hover:bg-purple-100 
                      transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white rounded-xl">
                        <activity.icon className="w-6 h-6 text-purple-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-gray-800">
                            {activity.title}
                          </h3>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>{activity.duration}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {activity.description}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Tips Section */}
              <div className="mt-6 p-4 bg-gradient-to-br from-purple-500 to-pink-500 
                rounded-xl text-white"
              >
                <h3 className="font-semibold mb-2">Tips for Parents</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Choose activities that match your child's energy level</li>
                  <li>• Make it fun and engaging - use positive reinforcement</li>
                  <li>• Be patient and celebrate small progress</li>
                  <li>• Create a regular routine for emotional learning</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}