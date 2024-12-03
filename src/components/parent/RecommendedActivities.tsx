```typescript
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Star, ChevronRight } from 'lucide-react';
import ActivityDetailsModal from './ActivityDetailsModal';
import type { ParentActivity } from '../../hooks/useParentRecommendations';

type Props = {
  activities: ParentActivity[];
  descriptions: Record<string, string>;
  suggestions: string[];
  onActivitySelect: (activity: ParentActivity) => void;
};

export default function RecommendedActivities({
  activities,
  descriptions,
  suggestions,
  onActivitySelect
}: Props) {
  const [selectedActivity, setSelectedActivity] = useState<ParentActivity | null>(null);

  const getActivityIcon = (focus: string) => {
    switch (focus) {
      case 'emotional-awareness':
      case 'self-regulation':
        return Brain;
      case 'empathy':
      case 'social-skills':
        return Heart;
      default:
        return Star;
    }
  };

  return (
    <>
      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="mb-6 p-4 bg-purple-50 rounded-lg">
          <h4 className="font-medium text-purple-900 mb-2">
            Progress Insights
          </h4>
          <ul className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="text-sm text-purple-700">
                • {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Activities */}
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = getActivityIcon(activity.emotionalFocus[0]);
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedActivity(activity)}
              className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md 
                transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Icon className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 mb-1">
                    {activity.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {descriptions[activity.id]}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-500">
                      {activity.duration}
                    </span>
                    <div className="flex gap-2">
                      {activity.emotionalFocus.map((focus) => (
                        <span
                          key={focus}
                          className="px-2 py-1 bg-purple-50 text-purple-600 
                            rounded-full text-xs"
                        >
                          {focus.split('-').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </motion.div>
          );
        })}
      </div>

      <ActivityDetailsModal
        activity={selectedActivity}
        isOpen={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
      />
    </>
  );
}