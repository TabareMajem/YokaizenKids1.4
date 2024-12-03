import React from 'react';
import MoodTrendChart from './MoodTrendChart';
import ActivityChart from './ActivityChart';
import NotificationCard from './NotificationCard';
import RecommendationCard from './RecommendationCard';

// Example data - in a real app, this would come from an API
const moodData = [
  { date: '2024-03-01', mood: 8 },
  { date: '2024-03-02', mood: 7 },
  { date: '2024-03-03', mood: 9 },
  { date: '2024-03-04', mood: 6 },
  { date: '2024-03-05', mood: 8 },
  { date: '2024-03-06', mood: 9 },
  { date: '2024-03-07', mood: 8 },
];

const activityData = [
  { date: '2024-03-01', entries: 3 },
  { date: '2024-03-02', entries: 2 },
  { date: '2024-03-03', entries: 4 },
  { date: '2024-03-04', entries: 1 },
  { date: '2024-03-05', entries: 3 },
  { date: '2024-03-06', entries: 2 },
  { date: '2024-03-07', entries: 3 },
];

const notifications = [
  {
    type: 'positive' as const,
    title: 'Improved Mood Trend',
    message: 'Sarah has shown a positive mood pattern over the last week!',
    date: 'Today'
  },
  {
    type: 'alert' as const,
    title: 'Low Activity Alert',
    message: 'No journal entries recorded in the last 2 days.',
    date: 'Yesterday'
  }
];

const recommendations = [
  {
    title: 'Create a Manga Together',
    description: 'Bond with your child by creating a fun manga story about their day.',
    imageUrl: 'https://images.unsplash.com/photo-1515041219749-89347f83291a?w=800&h=400'
  },
  {
    title: 'Emotion Exploration Game',
    description: 'Play a fun game to help identify and express different emotions.',
    imageUrl: 'https://images.unsplash.com/photo-1536337005238-94b997371b40?w=800&h=400'
  }
];

export default function ParentDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Sarah's Progress Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <MoodTrendChart data={moodData} />
          <ActivityChart data={activityData} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <NotificationCard key={index} {...notification} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recommended Activities</h2>
            <div className="space-y-4">
              {recommendations.map((recommendation, index) => (
                <RecommendationCard
                  key={index}
                  {...recommendation}
                  onClick={() => console.log('Recommendation clicked:', recommendation.title)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}