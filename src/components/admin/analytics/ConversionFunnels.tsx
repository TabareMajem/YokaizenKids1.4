import React from 'react';
import { motion } from 'framer-motion';
import { Users, ArrowDown } from 'lucide-react';

// Mock data - in a real app, this would come from your API
const funnelData = [
  { stage: 'Visitors', count: 10000, color: 'bg-blue-500' },
  { stage: 'Sign Ups', count: 2500, color: 'bg-purple-500' },
  { stage: 'Trial Users', count: 1500, color: 'bg-pink-500' },
  { stage: 'Paid Users', count: 750, color: 'bg-green-500' }
];

export default function ConversionFunnels() {
  const getConversionRate = (index: number) => {
    if (index === 0) return 100;
    const currentCount = funnelData[index].count;
    const previousCount = funnelData[index - 1].count;
    return ((currentCount / previousCount) * 100).toFixed(1);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Users className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Conversion Funnel
          </h3>
          <p className="text-sm text-gray-500">
            User journey from visitor to paid customer
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {funnelData.map((stage, index) => (
          <motion.div
            key={stage.stage}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-700">{stage.stage}</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-900 font-bold">
                  {stage.count.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500">
                  ({getConversionRate(index)}%)
                </span>
              </div>
            </div>
            <div className="relative h-8">
              <div className="absolute inset-0 bg-gray-100 rounded-full" />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(stage.count / funnelData[0].count) * 100}%` }}
                className={`absolute inset-y-0 left-0 ${stage.color} rounded-full`}
              />
            </div>

            {index < funnelData.length - 1 && (
              <div className="flex justify-center my-2">
                <ArrowDown className="w-5 h-5 text-gray-400" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Conversion Insights */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">
            Signup to Trial
          </h4>
          <p className="text-2xl font-bold text-purple-600">
            {((funnelData[2].count / funnelData[1].count) * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Conversion rate
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">
            Trial to Paid
          </h4>
          <p className="text-2xl font-bold text-green-600">
            {((funnelData[3].count / funnelData[2].count) * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Conversion rate
          </p>
        </div>
      </div>
    </div>
  );
}