import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Mail, 
  Lock, 
  Palette, 
  Globe,
  Calendar,
  Users,
  Save,
  AlertCircle 
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import GeneralSettings from '../../components/admin/settings/GeneralSettings';
import SecuritySettings from '../../components/admin/settings/SecuritySettings';
import EmailSettings from '../../components/admin/settings/EmailSettings';
import DatabaseSettings from '../../components/admin/settings/DatabaseSettings';
import NotificationSettings from '../../components/admin/settings/NotificationSettings';
import BillingSettings from '../../components/admin/settings/BillingSettings';
import APISettings from '../../components/admin/settings/APISettings';
import TranslationSettings from '../../components/admin/settings/TranslationSettings';
import { useAdminSettings } from '../../hooks/useAdminSettings';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const { 
    getSettings, 
    updateGeneralSettings,
    updateSecuritySettings,
    updateEmailSettings,
    updateDatabaseSettings,
    updateNotificationSettings,
    updateBillingSettings,
    isLoading,
    error 
  } = useAdminSettings();

  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const result = await getSettings();
      setSettings(result);
    };

    fetchSettings();
  }, []);

  const handleSave = async (section: string, data: any) => {
    try {
      switch (section) {
        case 'general':
          await updateGeneralSettings(data);
          break;
        case 'security':
          await updateSecuritySettings(data);
          break;
        case 'email':
          await updateEmailSettings(data);
          break;
        case 'database':
          await updateDatabaseSettings(data);
          break;
        case 'notifications':
          await updateNotificationSettings(data);
          break;
        case 'billing':
          await updateBillingSettings(data);
          break;
      }

      // Refresh settings
      const updatedSettings = await getSettings();
      setSettings(updatedSettings);
    } catch (err) {
      console.error(`Failed to update ${section} settings:`, err);
    }
  };

  const renderContent = () => {
    if (!settings) return null;

    switch (activeTab) {
      case 'general':
        return (
          <GeneralSettings
            settings={settings.general}
            onSave={(data) => handleSave('general', data)}
            isLoading={isLoading}
            error={error}
          />
        );
      case 'security':
        return (
          <SecuritySettings
            settings={settings.security}
            onSave={(data) => handleSave('security', data)}
            isLoading={isLoading}
            error={error}
          />
        );
      case 'email':
        return (
          <EmailSettings
            settings={settings.email}
            onSave={(data) => handleSave('email', data)}
            onTest={() => {}}
            isLoading={isLoading}
            error={error}
          />
        );
      case 'database':
        return (
          <DatabaseSettings
            settings={settings.database}
            onSave={(data) => handleSave('database', data)}
            isLoading={isLoading}
            error={error}
          />
        );
      case 'notifications':
        return (
          <NotificationSettings
            settings={settings.notifications}
            onSave={(data) => handleSave('notifications', data)}
            isLoading={isLoading}
            error={error}
          />
        );
      case 'billing':
        return (
          <BillingSettings
            settings={settings.billing}
            onSave={(data) => handleSave('billing', data)}
            isLoading={isLoading}
            error={error}
          />
        );
      case 'api':
        return (
          <APISettings
            settings={{
              openai: settings.openai || {},
              stripe: settings.stripe || {},
              stability: settings.stability || {},
              aws: settings.aws || {}
            }}
            onSave={(data) => handleSave('api', data)}
            isLoading={isLoading}
            error={error}
          />
        );
      case 'translations':
        return (
          <TranslationSettings
            settings={settings.translations || { translations: {} }}
            onSave={(data) => handleSave('translations', data)}
            isLoading={isLoading}
            error={error}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure system settings and preferences</p>
        </div>

        {/* Settings Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-4 p-4">
              {[
                { id: 'general', label: 'General' },
                { id: 'api', label: 'API Keys' },
                { id: 'security', label: 'Security' },
                { id: 'email', label: 'Email' },
                { id: 'database', label: 'Database' },
                { id: 'notifications', label: 'Notifications' },
                { id: 'billing', label: 'Billing' },
                { id: 'translations', label: 'Translations' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          {settings ? (
            renderContent()
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent 
                rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}