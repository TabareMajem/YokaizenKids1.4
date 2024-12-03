import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data - in a real app, this would come from your API
const data = [
  { date: '2024-03-01', engagement: 75 },
  { date: '2024-03-02', engagement: 78 },
  { date: '2024-03-03', engagement: 82 },
  { date: '2024-03-04', engagement: 80 },
  { date: '2024-03-05', engagement: 85 },
  { date: '2024-03-06', engagement: 88 },
  { date: '2024-03-07', engagement: 92 }
];

export default function EngagementChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date"
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
            stroke="#94a3b8"
          />
          <YAxis
            stroke="#94a3b8"
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            formatter={(value: number) => [`${value}%`, 'Engagement']}
            contentStyle={{
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          />
          <Line
            type="monotone"
            dataKey="engagement"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}