import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Users, Clock } from 'lucide-react';

type Activity = {
  id: number;
  type: 'subscription' | 'user' | 'content';
  message: string;
  timestamp: Date;
};

type Props = {
  activities: Activity[];
};

export default function RecentActivityList({ activities }: Props) {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'subscription':
        return CreditCard;
      case 'user':
        return Users;
      default:
        return Clock;
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => {
        const Icon = getActivityIcon(activity.type);
        return (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
          >
            <div className="p-2 bg-purple-100 rounded-lg">
              <Icon className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-800">{activity.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                {activity.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}