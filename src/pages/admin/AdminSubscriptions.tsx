import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/admin/AdminLayout';
import SubscriptionList from '../../components/admin/subscription/SubscriptionList';
import SubscriptionStats from '../../components/admin/subscription/SubscriptionStats';
import type { Subscription } from '../../types/subscription';

// Mock data - in a real app, this would come from your API
const mockSubscriptions: Subscription[] = [
  {
    id: 'sub_1',
    customerName: 'Tokyo Elementary School',
    customerEmail: 'admin@tokyo-elementary.jp',
    planName: 'School Premium',
    status: 'active',
    amount: 250000,
    nextBillingDate: '2024-04-01'
  },
  {
    id: 'sub_2',
    customerName: 'John Parent',
    customerEmail: 'john@example.com',
    planName: 'Family Plus',
    status: 'active',
    amount: 2000,
    nextBillingDate: '2024-04-01'
  }
];

const mockStats = {
  totalSubscriptions: 1250,
  activeSubscriptions: 1150,
  monthlyRevenue: 2500000,
  churnRate: 2.5
};

export default function AdminSubscriptions() {
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);

  const handleStatusChange = async (subscriptionId: string, newStatus: string) => {
    // In a real app, this would make an API call
    setSubscriptions(prev => prev.map(sub => 
      sub.id === subscriptionId ? { ...sub, status: newStatus } : sub
    ));
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Subscriptions</h1>
          <p className="text-gray-600">Manage customer subscriptions and billing</p>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <SubscriptionStats stats={mockStats} />
        </div>

        {/* Subscription List */}
        <SubscriptionList
          subscriptions={subscriptions}
          onStatusChange={handleStatusChange}
        />
      </div>
    </AdminLayout>
  );
}