import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data - in a real app, this would come from your API
const clvData = [
  { month: 'Jan', clv: 25000, retention: 95 },
  { month: 'Feb', clv: 27500, retention: 94 },
  { month: 'Mar', clv: 30000, retention: 96 },
  { month: 'Apr', clv: 32500, retention: 93 },
  { month: 'May', clv: 35000, retention: 95 },
  { month: 'Jun', clv: 37500, retention: 97 }
];

export default function CustomerLifetimeValue() {
  const currentCLV = clvData[clvData.length - 1].clv;
  const previousCLV = clvData[clvData.length - 2].clv;
  const clvGrowth = ((currentCLV - previousCLV) / previousCLV) * 100;

  return (
    <div className="space-y-6">
      {/* CLV Overview */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Customer Lifetime Value
              </h3>
              <p className="text-sm text-gray-500">
                Average revenue per customer over time
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ¥{currentCLV.toLocaleString()}
            </span>
            <div className={`flex items-center gap-1 text-sm ${
              clvGrowth >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className="w-4 h-4" />
              {Math.abs(clvGrowth).toFixed(1)}%
            </div>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={clvData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis 
                stroke="#94a3b8"
                tickFormatter={(value) => `¥${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value: number) => [`¥${value.toLocaleString()}`, 'CLV']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              />
              <Line
                type="monotone"
                dataKey="clv"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ fill: '#22c55e', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CLV Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-700">Average Customer Age</h4>
          </div>
          <p className="text-2xl font-bold text-gray-900">8.5 months</p>
          <p className="text-sm text-green-600 mt-1">↑ 2.1 months from last quarter</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-700">Expansion Revenue</h4>
          </div>
          <p className="text-2xl font-bold text-gray-900">¥450,000</p>
          <p className="text-sm text-green-600 mt-1">↑ 15% from last month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-700">Revenue per User</h4>
          </div>
          <p className="text-2xl font-bold text-gray-900">¥2,500</p>
          <p className="text-sm text-green-600 mt-1">↑ 8% from last month</p>
        </motion.div>
      </div>
    </div>
  );
}