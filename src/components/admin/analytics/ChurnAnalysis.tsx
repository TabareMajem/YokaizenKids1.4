import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, TrendingDown, Users } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data - in a real app, this would come from your API
const churnData = [
  { month: 'Jan', churnRate: 2.1, canceledUsers: 5 },
  { month: 'Feb', churnRate: 1.8, canceledUsers: 4 },
  { month: 'Mar', churnRate: 2.5, canceledUsers: 7 },
  { month: 'Apr', churnRate: 1.5, canceledUsers: 4 },
  { month: 'May', churnRate: 1.9, canceledUsers: 6 },
  { month: 'Jun', churnRate: 1.2, canceledUsers: 4 }
];

const reasons = [
  { reason: 'Too expensive', count: 12 },
  { reason: 'Not using enough', count: 8 },
  { reason: 'Missing features', count: 6 },
  { reason: 'Technical issues', count: 4 }
];

export default function ChurnAnalysis() {
  return (
    <div className="space-y-6">
      {/* Churn Rate Overview */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Churn Analysis
              </h3>
              <p className="text-sm text-gray-500">
                Monthly churn rate and trends
              </p>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {churnData[churnData.length - 1].churnRate}%
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={churnData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                formatter={(value: number) => [`${value}%`, 'Churn Rate']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              />
              <Area
                type="monotone"
                dataKey="churnRate"
                stroke="#ef4444"
                fill="url(#colorChurn)"
              />
              <defs>
                <linearGradient id="colorChurn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Churn Reasons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Cancellation Reasons
          </h3>
          <div className="space-y-4">
            {reasons.map((reason, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{reason.reason}</span>
                  <span className="text-sm font-medium text-gray-800">
                    {reason.count} users
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(reason.count / 12) * 100}%` }}
                    className="h-full bg-red-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* At-Risk Customers */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              At-Risk Customers
            </h3>
          </div>

          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-200 rounded-full">
                    <Users className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      Customer {index + 1}
                    </p>
                    <p className="text-sm text-gray-500">
                      Last active: {index + 2} weeks ago
                    </p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-yellow-100 text-yellow-700 
                  rounded-full text-sm">
                  Take Action
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}