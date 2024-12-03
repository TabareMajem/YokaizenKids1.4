import React from 'react';
import { TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react';
import type { WeeklyInsight } from '../../services/moodAnalysis';

type Props = {
  insight: WeeklyInsight;
  className?: string;
};

export default function WeeklyInsightCard({ insight, className = '' }: Props) {
  const getTrendIcon = () => {
    switch (insight.moodTrend) {
      case 'improving':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'declining':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      default:
        return <Minus className="w-5 h-5 text-blue-500" />;
    }
  };

  const getTrendColor = () => {
    switch (insight.moodTrend) {
      case 'improving':
        return 'text-green-600';
      case 'declining':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Weekly Insights</h3>
        <div className="flex items-center gap-2">
          {getTrendIcon()}
          <span className={`text-sm font-medium ${getTrendColor()}`}>
            {insight.moodTrend.charAt(0).toUpperCase() + insight.moodTrend.slice(1)}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Dominant Emotions</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {insight.dominantEmotions.map((emotion) => (
              <span
                key={emotion}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
              >
                {emotion}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500">Journal Entries</p>
          <p className="text-lg font-medium text-gray-800">{insight.journalCount}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-2">Recommendations</p>
          <div className="space-y-2">
            {insight.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}