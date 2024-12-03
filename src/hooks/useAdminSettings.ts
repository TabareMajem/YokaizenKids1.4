import { useState } from 'react';
import { api } from '../lib/api';

export type GeneralSettings = {
  siteName: string;
  supportEmail: string;
  defaultLanguage: string;
  maintenanceMode: boolean;
};

export type SecuritySettings = {
  passwordMinLength: number;
  mfaEnabled: boolean;
  sessionTimeout: number;
  loginAttempts: number;
};

export type EmailSettings = {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpSecure: boolean;
  senderName: string;
  senderEmail: string;
};

export type DatabaseSettings = {
  backupSchedule: string;
  retentionDays: number;
  lastBackup?: string;
  compressionEnabled: boolean;
};

export type NotificationSettings = {
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

export type BillingSettings = {
  companyName: string;
  taxId: string;
  billingEmail: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  currency: string;
};

export type AdminSettings = {
  general: GeneralSettings;
  security: SecuritySettings;
  email: EmailSettings;
  database: DatabaseSettings;
  notifications: NotificationSettings;
  billing: BillingSettings;
};

const defaultSettings: AdminSettings = {
  general: {
    siteName: 'Kokoro Quest',
    supportEmail: 'support@kokoroquest.com',
    defaultLanguage: 'en',
    maintenanceMode: false
  },
  security: {
    passwordMinLength: 8,
    mfaEnabled: false,
    sessionTimeout: 60,
    loginAttempts: 5
  },
  email: {
    smtpHost: '',
    smtpPort: 587,
    smtpUser: '',
    smtpSecure: true,
    senderName: 'Kokoro Quest',
    senderEmail: 'noreply@kokoroquest.com'
  },
  database: {
    backupSchedule: 'daily',
    retentionDays: 30,
    compressionEnabled: true
  },
  notifications: {
    emailNotifications: true,
    inAppNotifications: true,
    slackIntegration: false,
    notifyOn: {
      newUser: true,
      newSubscription: true,
      paymentFailed: true,
      contentPublished: true
    }
  },
  billing: {
    companyName: '',
    taxId: '',
    billingEmail: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'JP'
    },
    currency: 'JPY'
  }
};

export function useAdminSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSettings = async (): Promise<AdminSettings> => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get('/api/admin/settings');
      return data.data || defaultSettings;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch settings';
      setError(message);
      return defaultSettings; // Return default settings on error
    } finally {
      setIsLoading(false);
    }
  };

  const updateSettings = async (section: string, settings: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.put(`/api/admin/settings/${section}`, settings);
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update settings';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateGeneralSettings = async (settings: Partial<GeneralSettings>) => {
    return updateSettings('general', settings);
  };

  const updateSecuritySettings = async (settings: Partial<SecuritySettings>) => {
    return updateSettings('security', settings);
  };

  const updateEmailSettings = async (settings: Partial<EmailSettings>) => {
    return updateSettings('email', settings);
  };

  const updateDatabaseSettings = async (settings: Partial<DatabaseSettings>) => {
    return updateSettings('database', settings);
  };

  const updateNotificationSettings = async (settings: Partial<NotificationSettings>) => {
    return updateSettings('notifications', settings);
  };

  const updateBillingSettings = async (settings: Partial<BillingSettings>) => {
    return updateSettings('billing', settings);
  };

  const testEmailSettings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/api/admin/settings/email/test');
      return data.success;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to test email settings';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getSettings,
    updateGeneralSettings,
    updateSecuritySettings,
    updateEmailSettings,
    updateDatabaseSettings,
    updateNotificationSettings,
    updateBillingSettings,
    testEmailSettings,
    isLoading,
    error
  };
}