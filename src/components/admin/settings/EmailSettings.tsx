import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Server, User, Send, AlertCircle, Save } from 'lucide-react';
import type { EmailSettings } from '../../../hooks/useAdminSettings';

type Props = {
  settings: EmailSettings;
  onSave: (settings: Partial<EmailSettings>) => Promise<void>;
  onTest: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

export default function EmailSettings({ settings, onSave, onTest, isLoading, error }: Props) {
  const [formData, setFormData] = useState(settings);
  const [isTesting, setIsTesting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  const handleTest = async () => {
    setIsTesting(true);
    try {
      await onTest();
    } finally {
      setIsTesting(false);
    }
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SMTP Host
          </label>
          <div className="relative">
            <Server className="absolute left-3 top-1/2 transform -translate-y-1/2 
              text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={formData.smtpHost}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                smtpHost: e.target.value 
              }))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SMTP Port
          </label>
          <input
            type="number"
            value={formData.smtpPort}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              smtpPort: parseInt(e.target.value) 
            }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SMTP Username
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 
              text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={formData.smtpUser}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                smtpUser: e.target.value 
              }))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SMTP Password
          </label>
          <input
            type="password"
            value="••••••••"
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              smtpPass: e.target.value 
            }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sender Name
          </label>
          <input
            type="text"
            value={formData.senderName}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              senderName: e.target.value 
            }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sender Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 
              text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={formData.senderEmail}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                senderEmail: e.target.value 
              }))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="smtpSecure"
          checked={formData.smtpSecure}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            smtpSecure: e.target.checked 
          }))}
          className="rounded border-gray-300 text-purple-600 
            focus:ring-purple-200"
        />
        <label htmlFor="smtpSecure" className="text-sm text-gray-700">
          Use SSL/TLS
        </label>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleTest}
          disabled={isTesting}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg
            hover:bg-gray-200 transition-colors disabled:opacity-50
            disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isTesting ? (
            <>
              <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent 
                rounded-full animate-spin" />
              Testing...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Test Settings
            </>
          )}
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-2 bg-purple-600 text-white rounded-lg
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
      </div>
    </form>
  );
}