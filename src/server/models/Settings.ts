import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  general: {
    siteName: string;
    supportEmail: string;
    defaultLanguage: string;
    maintenanceMode: boolean;
  };
  security: {
    passwordMinLength: number;
    mfaEnabled: boolean;
    sessionTimeout: number;
    loginAttempts: number;
  };
  email: {
    smtpHost: string;
    smtpPort: number;
    smtpUser: string;
    smtpSecure: boolean;
    senderName: string;
    senderEmail: string;
  };
  database: {
    backupSchedule: string;
    retentionDays: number;
    lastBackup?: Date;
    compressionEnabled: boolean;
  };
  notifications: {
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
  billing: {
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
  createdAt: Date;
  updatedAt: Date;
}

const settingsSchema = new Schema<ISettings>({
  general: {
    siteName: { type: String, required: true },
    supportEmail: { type: String, required: true },
    defaultLanguage: { type: String, default: 'en' },
    maintenanceMode: { type: Boolean, default: false }
  },
  security: {
    passwordMinLength: { type: Number, default: 8 },
    mfaEnabled: { type: Boolean, default: false },
    sessionTimeout: { type: Number, default: 60 },
    loginAttempts: { type: Number, default: 5 }
  },
  email: {
    smtpHost: String,
    smtpPort: Number,
    smtpUser: String,
    smtpSecure: { type: Boolean, default: true },
    senderName: String,
    senderEmail: String
  },
  database: {
    backupSchedule: { type: String, default: 'daily' },
    retentionDays: { type: Number, default: 30 },
    lastBackup: Date,
    compressionEnabled: { type: Boolean, default: true }
  },
  notifications: {
    emailNotifications: { type: Boolean <boltAction type="file" filePath="src/server/models/Settings.ts">    emailNotifications: { type: Boolean, default: true },
    inAppNotifications: { type: Boolean, default: true },
    slackIntegration: { type: Boolean, default: false },
    notifyOn: {
      newUser: { type: Boolean, default: true },
      newSubscription: { type: Boolean, default: true },
      paymentFailed: { type: Boolean, default: true },
      contentPublished: { type: Boolean, default: true }
    }
  },
  billing: {
    companyName: String,
    taxId: String,
    billingEmail: String,
    billingAddress: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String
    },
    currency: { type: String, default: 'JPY' }
  }
}, {
  timestamps: true
});

export const Settings = mongoose.model<ISettings>('Settings', settingsSchema);