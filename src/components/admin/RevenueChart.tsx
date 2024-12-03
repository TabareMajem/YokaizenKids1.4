import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data - in a real app, this would come from your API
const data = [
  { month: 'Jan', revenue: 85000 },
  { month: 'Feb', revenue: 95000 },
  { month: 'Mar', revenue: 125000 },
  { month: 'Apr', revenue: 115000 },
  { month: 'May', revenue: 150000 },
  { month: 'Jun', revenue: 175000 }
];

export default function RevenueChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="month"
            stroke="#94a3b8"
          />
          <YAxis
            stroke="#94a3b8"
            tickFormatter={(value) => `¥${value.toLocaleString()}`}
          />
          <Tooltip
            formatter={(value: number) => [`¥${value.toLocaleString()}`, 'Revenue']}
            contentStyle={{
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}