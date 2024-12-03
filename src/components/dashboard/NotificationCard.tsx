import React from 'react';
import { Bell, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

type NotificationType = 'positive' | 'negative' | 'neutral' | 'alert';

type Props = {
  type: NotificationType;
  title: string;
  message: string;
  date: string;
};

export default function NotificationCard({ type, title, message, date }: Props) {
  const getTypeStyles = () => {
    switch (type) {
      case 'positive':
        return {
          icon: TrendingUp,
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-700',
          iconBg: 'bg-green-100'
        };
      case 'negative':
        return {
          icon: TrendingDown,
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-700',
          iconBg: 'bg-red-100'
        };
      case 'alert':
        return {
          icon: AlertCircle,
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-700',
          iconBg: 'bg-yellow-100'
        };
      default:
        return {
          icon: Bell,
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-700',
          iconBg: 'bg-blue-100'
        };
    }
  };

  const styles = getTypeStyles();
  const Icon = styles.icon;

  return (
    <div className={`${styles.bg} ${styles.border} border rounded-lg p-4`}>
      <div className="flex items-start gap-4">
        <div className={`${styles.iconBg} p-2 rounded-full`}>
          <Icon className={`w-5 h-5 ${styles.text}`} />
        </div>
        <div className="flex-1">
          <h4 className={`font-medium ${styles.text}`}>{title}</h4>
          <p className="text-gray-600 mt-1">{message}</p>
          <span className="text-sm text-gray-500 mt-2 block">{date}</span>
        </div>
      </div>
    </div>
  );
}