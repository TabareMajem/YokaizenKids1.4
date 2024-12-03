import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  CreditCard, 
  BookOpen, 
  BarChart2, 
  Settings,
  TrendingUp,
  AlertCircle,
  DollarSign
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import StatsCard from '../../components/admin/StatsCard';
import RevenueChart from '../../components/admin/RevenueChart';
import RecentActivityList from '../../components/admin/RecentActivityList';

export default function AdminDashboard() {
  // Mock data - in a real app, this would come from your API
  const stats = {
    totalUsers: 1250,
    activeSubscriptions: 850,
    monthlyRevenue: 125000,
    contentItems: 324
  };

  const recentActivity = [
    {
      id: 1,
      type: 'subscription',
      message: 'New school subscription from Tokyo Elementary',
      timestamp: new Date()
    },
    {
      id: 2,
      type: 'user',
      message: '15 new student accounts created',
      timestamp: new Date(Date.now() - 3600000)
    }
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Overview of your platform's performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Users"
            value={stats.totalUsers}
            icon={Users}
            trend={+12.5}
          />
          <StatsCard
            title="Active Subscriptions"
            value={stats.activeSubscriptions}
            icon={CreditCard}
            trend={+8.2}
          />
          <StatsCard
            title="Monthly Revenue"
            value={`¥${stats.monthlyRevenue.toLocaleString()}`}
            icon={DollarSign}
            trend={+15.3}
          />
          <StatsCard
            title="Content Items"
            value={stats.contentItems}
            icon={BookOpen}
            trend={+5.8}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Revenue Overview
              </h2>
              <RevenueChart />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Activity
            </h2>
            <RecentActivityList activities={recentActivity} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}