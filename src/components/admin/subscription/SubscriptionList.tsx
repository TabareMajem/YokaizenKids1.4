import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, CreditCard, Clock, AlertCircle } from 'lucide-react';
import type { Subscription } from '../../../types/subscription';

type Props = {
  subscriptions: Subscription[];
  onStatusChange: (subscriptionId: string, status: string) => void;
};

export default function SubscriptionList({ subscriptions, onStatusChange }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || sub.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'past_due':
        return 'bg-yellow-100 text-yellow-700';
      case 'canceled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return CreditCard;
      case 'past_due':
        return Clock;
      case 'canceled':
        return AlertCircle;
      default:
        return CreditCard;
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 
            text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subscriptions..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          {['active', 'past_due', 'canceled'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(selectedStatus === status ? null : status)}
              className={`px-3 py-1 rounded-full text-sm transition-colors
                ${selectedStatus === status
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Download className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Plan
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Next Billing
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredSubscriptions.map((subscription) => {
              const StatusIcon = getStatusIcon(subscription.status);
              return (
                <motion.tr
                  key={subscription.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {subscription.customerName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {subscription.customerEmail}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {subscription.planName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 
                      rounded-full text-sm ${getStatusColor(subscription.status)}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="capitalize">
                        {subscription.status.replace('_', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    ¥{subscription.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {new Date(subscription.nextBillingDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={subscription.status}
                      onChange={(e) => onStatusChange(subscription.id, e.target.value)}
                      className="rounded-lg border-gray-300 text-sm focus:ring-purple-500 
                        focus:border-purple-500"
                    >
                      <option value="active">Active</option>
                      <option value="past_due">Past Due</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}