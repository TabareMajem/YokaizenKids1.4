import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import type { DailyMood } from '../../services/moodAnalysis';

type Props = {
  data: DailyMood[];
  className?: string;
};

export default function MoodTrendChart({ data, className = '' }: Props) {
  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Mood Trends</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => format(new Date(date), 'MMM d')}
              stroke="#94a3b8"
            />
            <YAxis
              domain={[-1, 1]}
              tickFormatter={(value) => value.toFixed(1)}
              stroke="#94a3b8"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
              labelFormatter={(date) => format(new Date(date), 'MMMM d, yyyy')}
              formatter={(value: number) => [value.toFixed(2), 'Mood Score']}
            />
            <Line
              type="monotone"
              dataKey="mood.value"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#8b5cf6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}