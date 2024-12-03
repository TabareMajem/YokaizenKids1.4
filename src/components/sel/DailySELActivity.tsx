import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Users, Star } from 'lucide-react';

type Props = {
  mood: string;
};

export default function DailySELActivity({ mood }: Props) {
  const activities = [
    {
      id: 1,
      title: 'Mindful Breathing',
      description: 'Take a moment to center yourself with guided breathing.',
      icon: Brain,
      duration: '5 mins'
    },
    {
      id: 2,
      title: 'Gratitude Journal',
      description: 'Write down three things you are grateful for today.',
      icon: Heart,
      duration: '10 mins'
    },
    {
      id: 3,
      title: 'Empathy Exercise',
      description: 'Practice understanding others\' perspectives.',
      icon: Users,
      duration: '15 mins'
    }
  ];

  const getRecommendedActivity = () => {
    if (!mood) return activities[0];
    
    switch (mood.toLowerCase()) {
      case 'sad':
      case 'anxious':
        return activities[0]; // Mindful Breathing
      case 'happy':
      case 'excited':
        return activities[1]; // Gratitude Journal
      default:
        return activities[2]; // Empathy Exercise
    }
  };

  const recommendedActivity = getRecommendedActivity();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Star className="w-5 h-5 text-purple-500" />
        Today's SEL Activity
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-purple-50 rounded-lg p-4 mb-6"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-xl">
            <recommendedActivity.icon className="w-6 h-6 text-purple-500" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-800">
                {recommendedActivity.title}
              </h3>
              <span className="text-sm text-purple-600">
                {recommendedActivity.duration}
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              {recommendedActivity.description}
            </p>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg 
              hover:bg-purple-600 transition-colors">
              Start Activity
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activities
          .filter(a => a.id !== recommendedActivity.id)
          .map((activity) => (
            <button
              key={activity.id}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg 
                hover:bg-gray-100 transition-colors text-left"
            >
              <div className="p-2 bg-white rounded-lg">
                <activity.icon className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{activity.title}</h3>
                <p className="text-sm text-gray-500">{activity.duration}</p>
              </div>
            </button>
          ))}
      </div>
    </div>
  );
}