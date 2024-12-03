import React from 'react';

type Props = {
  category: string;
  score: number;
};

export default function RiskIndicator({ category, score }: Props) {
  const getRiskLevel = (score: number) => {
    if (score >= 70) return { level: 'High', color: 'text-red-600 bg-red-100' };
    if (score >= 40) return { level: 'Moderate', color: 'text-yellow-600 bg-yellow-100' };
    return { level: 'Low', color: 'text-green-600 bg-green-100' };
  };

  const { level, color } = getRiskLevel(score);

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-gray-700 capitalize">{category}</h4>
        <span className={`px-2 py-1 rounded-full text-sm ${color}`}>
          {level}
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-purple-500 rounded-full"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}