import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/admin/AdminLayout';
import SubscriptionList from '../../components/admin/subscription/SubscriptionList';
import SubscriptionStats from '../../components/admin/subscription/SubscriptionStats';
import type { Subscription } from '../../types/subscription';

export default function SubscriptionManagement() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const handleStatusChange = async (subscriptionId: string, newStatus: string) => {
    // In a real app, this would make an API call
    setSubscriptions(prev => prev.map(sub => 
      sub.id === subscriptionId ? { ...sub, status: newStatus as any } : sub
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
          <SubscriptionStats stats={{
            totalSubscriptions: subscriptions.length,
            activeSubscriptions: subscriptions.filter(s => s.status === 'active').length,
            monthlyRevenue: subscriptions.reduce((sum, s) => sum + s.amount, 0),
            churnRate: 2.5
          }} />
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