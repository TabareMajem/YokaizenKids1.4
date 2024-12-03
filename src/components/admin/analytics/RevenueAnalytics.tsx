import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Mock data - in a real app, this would come from your API
const revenueData = [
  { month: 'Jan', mrr: 850000, customers: 120 },
  { month: 'Feb', mrr: 950000, customers: 135 },
  { month: 'Mar', mrr: 1250000, customers: 158 },
  { month: 'Apr', mrr: 1150000, customers: 172 },
  { month: 'May', mrr: 1500000, customers: 195 },
  { month: 'Jun', mrr: 1750000, customers: 210 }
];

export default function RevenueAnalytics() {
  const currentMRR = revenueData[revenueData.length - 1].mrr;
  const previousMRR = revenueData[revenueData.length - 2].mrr;
  const mrrGrowth = ((currentMRR - previousMRR) / previousMRR) * 100;

  const currentCustomers = revenueData[revenueData.length - 1].customers;
  const previousCustomers = revenueData[revenueData.length - 2].customers;
  const customerGrowth = ((currentCustomers - previousCustomers) / previousCustomers) * 100;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* MRR Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Monthly Recurring Revenue
                </h3>
                <p className="text-2xl font-bold text-gray-900">
                  ¥{currentMRR.toLocaleString()}
                </p>
              </div>
            </div>
            <div className={`flex items-center gap-1 ${
              mrrGrowth >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {mrrGrowth >= 0 ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span>{Math.abs(mrrGrowth).toFixed(1)}%</span>
            </div>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
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
        </motion.div>

        {/* Customer Growth Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Total Customers
                </h3>
                <p className="text-2xl font-bold text-gray-900">
                  {currentCustomers}
                </p>
              </div>
            </div>
            <div className={`flex items-center gap-1 ${
              customerGrowth >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {customerGrowth >= 0 ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span>{Math.abs(customerGrowth).toFixed(1)}%</span>
            </div>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  formatter={(value: number) => [value, 'Customers']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="customers"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Revenue Metrics */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Revenue Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">
              Average Revenue Per User
            </h4>
            <p className="text-2xl font-bold text-gray-900">
              ¥{(currentMRR / currentCustomers).toFixed(0)}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">
              Customer Lifetime Value
            </h4>
            <p className="text-2xl font-bold text-gray-900">
              ¥{(currentMRR / currentCustomers * 24).toFixed(0)}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">
              Net Revenue Retention
            </h4>
            <p className="text-2xl font-bold text-gray-900">
              {((currentMRR / previousMRR) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}