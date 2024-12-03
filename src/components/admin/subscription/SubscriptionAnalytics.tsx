import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, CreditCard, AlertCircle } from 'lucide-react';

// Mock data - in a real app, this would come from your API
const analyticsData = [
  { month: 'Jan', mrr: 850000, subscribers: 120 },
  { month: 'Feb', mrr: 950000, subscribers: 135 },
  { month: 'Mar', mrr: 1250000, subscribers: 158 },
  { month: 'Apr', mrr: 1150000, subscribers: 172 },
  { month: 'May', mrr: 1500000, subscribers: 195 },
  { month: 'Jun', mrr: 1750000, subscribers: 210 }
];

export default function SubscriptionAnalytics() {
  return (
    <div className="space-y-6">
      {/* MRR Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Monthly Recurring Revenue
              </h3>
              <p className="text-sm text-gray-500">
                Last 6 months
              </p>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ¥{analyticsData[analyticsData.length - 1].mrr.toLocaleString()}
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis 
                stroke="#94a3b8"
                tickFormatter={(value) => `¥${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip
                formatter={(value: number) => [`¥${value.toLocaleString()}`, 'MRR']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              />
              <Line
                type="monotone"
                dataKey="mrr"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Subscriber Growth */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Subscriber Growth
              </h3>
              <p className="text-sm text-gray-500">
                Total active subscribers over time
              </p>
            </div>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                formatter={(value: number) => [value, 'Subscribers']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              />
              <Line
                type="monotone"
                dataKey="subscribers"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}