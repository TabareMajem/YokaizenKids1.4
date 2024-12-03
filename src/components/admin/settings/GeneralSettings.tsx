import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Mail, AlertCircle, Save } from 'lucide-react';
import type { GeneralSettings } from '../../../hooks/useAdminSettings';

type Props = {
  settings: GeneralSettings;
  onSave: (settings: Partial<GeneralSettings>) => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

export default function GeneralSettings({ settings, onSave, isLoading, error }: Props) {
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
          Site Name
        </label>
        <input
          type="text"
          value={formData.siteName}
          onChange={(e) => setFormData(prev => ({ ...prev, siteName: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Support Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 
            text-gray-400 w-5 h-5" />
          <input
            type="email"
            value={formData.supportEmail}
            onChange={(e) => setFormData(prev => ({ ...prev, supportEmail: e.target.value }))}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Default Language
        </label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 
            text-gray-400 w-5 h-5" />
          <select
            value={formData.defaultLanguage}
            onChange={(e) => setFormData(prev => ({ ...prev, defaultLanguage: e.target.value }))}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
          >
            <option value="en">English</option>
            <option value="ja">Japanese</option>
            <option value="es">Spanish</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="maintenanceMode"
          checked={formData.maintenanceMode}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            maintenanceMode: e.target.checked 
          }))}
          className="rounded border-gray-300 text-purple-600 
            focus:ring-purple-200"
        />
        <label htmlFor="maintenanceMode" className="text-sm text-gray-700">
          Enable Maintenance Mode
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