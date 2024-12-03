import React from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Plus, Book, Brain, Sparkles } from 'lucide-react';

type Activity = {
  id: string;
  title: string;
  type: 'journal' | 'quiz' | 'ar';
  date: string;
  assignedTo: 'all' | string[];
  status: 'scheduled' | 'in_progress' | 'completed';
};

// Mock data
const mockActivities: Activity[] = [
  {
    id: '1',
    title: 'Daily Journal: Emotions',
    type: 'journal',
    date: '2024-03-15',
    assignedTo: 'all',
    status: 'scheduled'
  },
  {
    id: '2',
    title: 'Empathy Quiz',
    type: 'quiz',
    date: '2024-03-16',
    assignedTo: ['student-1', 'student-2'],
    status: 'scheduled'
  },
  {
    id: '3',
    title: 'AR Emotion Cards',
    type: 'ar',
    date: '2024-03-14',
    assignedTo: 'all',
    status: 'completed'
  }
];

export default function ActivityCalendar() {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'journal':
        return Book;
      case 'quiz':
        return Brain;
      case 'ar':
        return Sparkles;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Activities</h2>
          <p className="text-sm text-gray-600">
            {mockActivities.filter(a => a.status === 'scheduled').length} upcoming activities
          </p>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg 
          hover:bg-purple-700 transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          New Activity
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        {/* Calendar header and grid would go here */}
        <div className="text-center text-gray-500 mb-8">
          Calendar component would be integrated here
        </div>

        {/* Activity List */}
        <div className="space-y-4">
          {mockActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className="p-3 bg-purple-100 rounded-lg">
                {React.createElement(getActivityIcon(activity.type), {
                  className: "w-5 h-5 text-purple-600"
                })}
              </div>

              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{activity.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{new Date(activity.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>
                    {activity.assignedTo === 'all' 
                      ? 'All Students' 
                      : `${activity.assignedTo.length} Students`}
                  </span>
                </div>
              </div>

              <div className={`px-3 py-1 rounded-full text-sm
                ${activity.status === 'completed'
                  ? 'bg-green-100 text-green-700'
                  : activity.status === 'in_progress'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-purple-100 text-purple-700'
                }`}
              >
                {activity.status.replace('_', ' ')}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}