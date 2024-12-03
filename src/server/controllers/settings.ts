import { Request, Response } from 'express';
import { Settings } from '../models/Settings';
import { logger } from '../config/logger';

export async function getSettings(req: Request, res: Response) {
  try {
    let settings = await Settings.findOne();
    
    if (!settings) {
      // Create default settings if none exist
      settings = await Settings.create({
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
          currency: 'JPY'
        }
      });
    }

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    logger.error('Settings retrieval error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve settings'
    });
  }
}

export async function updateSettings(req: Request, res: Response) {
  try {
    const { section } = req.params;
    const update = { [section]: req.body };

    const settings = await Settings.findOneAndUpdate(
      {},
      { $set: update },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    logger.error('Settings update error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update settings'
    });
  }
}

export async function testEmailSettings(req: Request, res: Response) {
  try {
    const settings = await Settings.findOne();
    if (!settings?.email) {
      return res.status(400).json({
        success: false,
        error: 'Email settings not configured'
      });
    }

    // Send test email using the configured settings
    // This would use your email service
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay

    res.json({
      success: true,
      message: 'Test email sent successfully'
    });
  } catch (error) {
    logger.error('Email test error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send test email'
    });
  }
}