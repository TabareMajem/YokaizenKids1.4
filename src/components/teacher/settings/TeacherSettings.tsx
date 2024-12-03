import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Mail, Lock, Palette, Calendar, Save } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import type { Language } from '../../../types/language';

export default function TeacherSettings() {
  const { language, setLanguage, languages } = useLanguage();
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    language,
    emailNotifications: true,
    inAppNotifications: true,
    theme: 'system',
    calendarView: 'week'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Save settings
    setLanguage(formData.language as Language);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
        <p className="text-gray-600">Customize your teaching experience</p>
      </div>

      <div className="space-y-6">
        {/* Language Settings */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-gray-500" />
            Language Settings
          </h3>
          <select
            value={formData.language}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              language: e.target.value as Language 
            }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
          >
            {Object.entries(languages).map(([code, { name, nativeName }]) => (
              <option key={code} value={code}>
                {name} ({nativeName})
              </option>
            ))}
          </select>
        </div>

        {/* Other settings sections */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-gray-500" />
            Notification Preferences
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.emailNotifications}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  emailNotifications: e.target.checked
                }))}
                className="rounded border-gray-300 text-purple-600 
                  focus:ring-purple-200"
              />
              <span className="text-gray-700">Email notifications</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.inAppNotifications}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  inAppNotifications: e.target.checked
                }))}
                className="rounded border-gray-300 text-purple-600 
                  focus:ring-purple-200"
              />
              <span className="text-gray-700">In-app notifications</span>
            </label>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5 text-gray-500" />
            Display Settings
          </h3>
          <select
            value={formData.theme}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              theme: e.target.value 
            }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            Calendar Settings
          </h3>
          <select
            value={formData.calendarView}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              calendarView: e.target.value 
            }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
          >
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="day">Day</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg
            hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>
    </div>
  );
}