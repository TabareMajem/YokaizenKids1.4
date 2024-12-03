import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Heart, Brain, Star, ChevronRight, Filter, Clock } from 'lucide-react';
import ActivityDetailsModal from './ActivityDetailsModal';
import type { ParentActivity } from '../../hooks/useParentRecommendations';
import type { EIScores } from '../../hooks/useQuizResults';
import type { BigFiveScores } from '../../hooks/useBigFiveResults';

type Props = {
  activities: ParentActivity[];
  eiScores?: EIScores;
  bigFiveScores?: BigFiveScores;
  onActivitySelect: (activity: ParentActivity) => void;
};

export default function ActivityRecommendations({ 
  activities, 
  eiScores,
  bigFiveScores,
  onActivitySelect 
}: Props) {
  const [filter, setFilter] = useState<'all' | 'ei' | 'personality' | 'recommended'>('recommended');
  const [selectedActivity, setSelectedActivity] = useState<ParentActivity | null>(null);

  const getActivityIcon = (focus: string) => {
    switch (focus) {
      case 'emotional-awareness':
      case 'self-regulation':
        return Brain;
      case 'empathy':
      case 'social-skills':
        return Heart;
      case 'mindfulness':
        return Star;
      default:
        return Book;
    }
  };

  const filteredActivities = activities.filter(activity => {
    switch (filter) {
      case 'ei':
        return activity.emotionalFocus.some(focus => 
          ['emotional-awareness', 'empathy', 'social-skills', 'mindfulness'].includes(focus)
        );
      case 'personality':
        return activity.personalityTraits && activity.personalityTraits.length > 0;
      case 'recommended':
        // Show activities that target low-scoring areas
        if (eiScores) {
          const lowEIScores = Object.entries(eiScores)
            .filter(([_, score]) => score < 70)
            .map(([category]) => category);
          if (activity.emotionalFocus.some(focus => lowEIScores.includes(focus))) {
            return true;
          }
        }
        if (bigFiveScores && activity.personalityTraits) {
          const lowBigFiveScores = Object.entries(bigFiveScores)
            .filter(([_, score]) => score < 70)
            .map(([trait]) => trait);
          if (activity.personalityTraits.some(trait => lowBigFiveScores.includes(trait))) {
            return true;
          }
        }
        return false;
      default:
        return true;
    }
  });

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Recommended Activities
          </h3>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="text-sm border-none focus:ring-0 text-gray-600"
            >
              <option value="all">All Activities</option>
              <option value="ei">EI Focus</option>
              <option value="personality">Personality Focus</option>
              <option value="recommended">Recommended</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredActivities.map((activity, index) => {
            const Icon = getActivityIcon(activity.emotionalFocus[0]);
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedActivity(activity)}
                className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg
                  hover:bg-purple-100 transition-colors cursor-pointer group"
              >
                <div className="p-3 bg-white rounded-xl">
                  <Icon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 mb-1">
                    {activity.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {activity.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{activity.duration}</span>
                    </div>
                    <div className="flex gap-2">
                      {activity.emotionalFocus.map((focus) => (
                        <span
                          key={focus}
                          className="px-2 py-1 bg-purple-100 text-purple-600 
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
                <ChevronRight className="w-5 h-5 text-gray-400 
                  group-hover:text-purple-600 group-hover:translate-x-1 
                  transition-all" />
              </motion.div>
            );
          })}

          {filteredActivities.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No activities found for the selected filter.
            </div>
          )}
        </div>
      </div>

      <ActivityDetailsModal
        activity={selectedActivity}
        isOpen={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
      />
    </>
  );
}