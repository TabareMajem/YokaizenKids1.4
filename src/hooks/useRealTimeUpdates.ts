import { useEffect, useState } from 'react';
import { useSocket } from '../contexts/SocketContext';
import { useAuth } from '../contexts/AuthContext';

export function useRealTimeUpdates() {
  const { socket } = useSocket();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (!socket || !user) return;

    // Listen for journal updates
    socket.on('journal:update', (data) => {
      if (user.role === 'teacher' || user.role === 'parent') {
        setNotifications(prev => [...prev, {
          type: 'journal',
          data,
          timestamp: new Date()
        }]);
      }
    });

    // Listen for milestone completions
    socket.on('milestone:complete', (data) => {
      setNotifications(prev => [...prev, {
        type: 'milestone',
        data,
        timestamp: new Date()
      }]);
    });

    // Listen for AI companion interactions
    socket.on('companion:interaction', (data) => {
      if (user.role === 'teacher' || user.role === 'parent') {
        setNotifications(prev => [...prev, {
          type: 'companion',
          data,
          timestamp: new Date()
        }]);
      }
    });

    return () => {
      socket.off('journal:update');
      socket.off('milestone:complete');
      socket.off('companion:interaction');
    };
  }, [socket, user]);

  const clearNotifications = () => {
    setNotifications([]);
  };

  const removeNotification = (index: number) => {
    setNotifications(prev => prev.filter((_, i) => i !== index));
  };

  return {
    notifications,
    clearNotifications,
    removeNotification
  };
}