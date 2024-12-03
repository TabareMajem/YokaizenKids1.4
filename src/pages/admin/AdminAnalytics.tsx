import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Brain, 
  Heart,
  Download,
  Calendar,
  Filter
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import EngagementChart from '../../components/admin/analytics/EngagementChart';
import EmotionDistribution from '../../components/admin/analytics/EmotionDistribution';
import UserGrowthChart from '../../components/admin/analytics/UserGrowthChart';

export default function AdminAnalytics() {
  // Mock data - in a real app, this would come from your API
  const stats = {
    totalUsers: 1250,
    activeUsers: 892,
    averageEngagement: 78,
    emotionalGrowth: 15.3
  };

  const timeRanges = ['Last 7 days', 'Last 30 days', 'Last 3 months', 'Last year'];
  const [selectedRange, setSelectedRange] = React.useState(timeRanges[1]);

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600">Monitor platform performance and user engagement</p>
          </div>
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-lg
              hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Export Report
          </button>
        </div>

        {/* Time Range Filter */}
        <div className="mb-6 flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`px-3 py-1 rounded-full text-sm transition-colors
                ${selectedRange === range
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-700">Total Users</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            <p className="text-sm text-green-600 mt-1">↑ 12% from last month</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-700">Active Users</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
            <p className="text-sm text-green-600 mt-1">↑ 8% from last month</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Brain className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-700">Avg. Engagement</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.averageEngagement}%</p>
            <p className="text-sm text-green-600 mt-1">↑ 5% from last month</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Heart className="w-5 h-5 text-pink-600" />
              </div>
              <h3 className="font-medium text-gray-700">Emotional Growth</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.emotionalGrowth}%</p>
            <p className="text-sm text-green-600 mt-1">↑ 3% from last month</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Engagement Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              User Engagement
            </h2>
            <EngagementChart />
          </div>

          {/* Emotion Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Emotion Distribution
            </h2>
            <EmotionDistribution />
          </div>
        </div>

        {/* User Growth Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            User Growth
          </h2>
          <UserGrowthChart />
        </div>
      </div>
    </AdminLayout>
  );
}