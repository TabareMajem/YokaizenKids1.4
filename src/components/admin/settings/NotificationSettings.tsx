import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Mail, MessageSquare, Save, AlertCircle } from 'lucide-react';

type Props = {
  settings: {
    emailNotifications: boolean;
    inAppNotifications: boolean;
    slackIntegration: boolean;
    notifyOn: {
      newUser: boolean;
      newSubscription: boolean;
      paymentFailed: boolean;
      contentPublished: boolean;
    };
  };
  onSave: (settings: any) => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

export default function NotificationSettings({ settings, onSave, isLoading, error }: Props) {
  const [formData, setFormData] = useState(settings);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2"
        >
          <AlertCircle className="w-5 h-5" />
          {error}
        </motion.div>
      )}

      {/* Notification Channels */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Notification Channels
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="emailNotifications"
              checked={formData.emailNotifications}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                emailNotifications: e.target.checked
              }))}
              className="rounded border-gray-300 text-purple-600 
                focus:ring-purple-200"
            />
            <label htmlFor="emailNotifications" className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">Email Notifications</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="inAppNotifications"
              checked={formData.inAppNotifications}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                inAppNotifications: e.target.checked
              }))}
              className="rounded border-gray-300 text-purple-600 
                focus:ring-purple-200"
            />
            <label htmlFor="inAppNotifications" className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">In-App Notifications</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="slackIntegration"
              checked={formData.slackIntegration}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                slackIntegration: e.target.checked
              }))}
              className="rounded border-gray-300 text-purple-600 
                focus:ring-purple-200"
            />
            <label htmlFor="slackIntegration" className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">Slack Integration</span>
            </label>
          </div>
        </div>
      </div>

      {/* Notification Events */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Notification Events
        </h3>
        <div className="space-y-4 bg-gray-50 rounded-lg p-4">
          {Object.entries(formData.notifyOn).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={key}
                checked={value}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  notifyOn: {
                    ...prev.notifyOn,
                    [key]: e.target.checked
                  }
                }))}
                className="rounded border-gray-300 text-purple-600 
                  focus:ring-purple-200"
              />
              <label htmlFor={key} className="text-gray-700">
                {key.split(/(?=[A-Z])/).join(' ')}
              </label>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg
          hover:bg-purple-700 transition-colors disabled:opacity-50
          disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent 
              rounded-full animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="w-5 h-5" />
            Save Changes
          </>
        )}
      </button>
    </form>
  );
}