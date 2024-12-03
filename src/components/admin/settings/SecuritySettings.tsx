import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Key, Clock, AlertCircle, Save } from 'lucide-react';
import type { SecuritySettings } from '../../../hooks/useAdminSettings';

type Props = {
  settings: SecuritySettings;
  onSave: (settings: Partial<SecuritySettings>) => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

export default function SecuritySettings({ settings, onSave, isLoading, error }: Props) {
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Minimum Password Length
        </label>
        <div className="relative">
          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 
            text-gray-400 w-5 h-5" />
          <input
            type="number"
            min="6"
            max="32"
            value={formData.passwordMinLength}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              passwordMinLength: parseInt(e.target.value) 
            }))}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Session Timeout (minutes)
        </label>
        <div className="relative">
          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 
            text-gray-400 w-5 h-5" />
          <input
            type="number"
            min="5"
            max="1440"
            value={formData.sessionTimeout}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              sessionTimeout: parseInt(e.target.value) 
            }))}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Max Login Attempts
        </label>
        <div className="relative">
          <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 
            text-gray-400 w-5 h-5" />
          <input
            type="number"
            min="3"
            max="10"
            value={formData.loginAttempts}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              loginAttempts: parseInt(e.target.value) 
            }))}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="mfaEnabled"
          checked={formData.mfaEnabled}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            mfaEnabled: e.target.checked 
          }))}
          className="rounded border-gray-300 text-purple-600 
            focus:ring-purple-200"
        />
        <label htmlFor="mfaEnabled" className="text-sm text-gray-700">
          Enable Two-Factor Authentication
        </label>
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