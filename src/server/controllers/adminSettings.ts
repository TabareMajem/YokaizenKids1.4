import { Request, Response } from 'express';
import { getDb } from '../../lib/db/client';
import { sendEmail } from '../../services/email/sender';
import { logger } from '../config/logger';

export async function getSettings(req: Request, res: Response) {
  try {
    const db = await getDb();
    const settings = await db.collection('settings').findOne({});

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

export async function updateGeneralSettings(req: Request, res: Response) {
  try {
    const db = await getDb();
    
    await db.collection('settings').updateOne(
      {},
      { $set: { general: req.body } },
      { upsert: true }
    );

    res.json({
      success: true,
      message: 'General settings updated successfully'
    });
  } catch (error) {
    logger.error('General settings update error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update general settings'
    });
  }
}

export async function updateSecuritySettings(req: Request, res: Response) {
  try {
    const db = await getDb();
    
    await db.collection('settings').updateOne(
      {},
      { $set: { security: req.body } },
      { upsert: true }
    );

    res.json({
      success: true,
      message: 'Security settings updated successfully'
    });
  } catch (error) {
    logger.error('Security settings update error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update security settings'
    });
  }
}

export async function updateEmailSettings(req: Request, res: Response) {
  try {
    const db = await getDb();
    
    // Don't store password if it's masked
    const emailSettings = { ...req.body };
    if (emailSettings.smtpPass === '••••••••') {
      delete emailSettings.smtpPass;
    }

    await db.collection('settings').updateOne(
      {},
      { $set: { email: emailSettings } },
      { upsert: true }
    );

    res.json({
      success: true,
      message: 'Email settings updated successfully'
    });
  } catch (error) {
    logger.error('Email settings update error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update email settings'
    });
  }
}

export async function testEmailSettings(req: Request, res: Response) {
  try {
    const db = await getDb();
    const settings = await db.collection('settings').findOne({});
    
    if (!settings?.email) {
      return res.status(400).json({
        success: false,
        error: 'Email settings not configured'
      });
    }

    // Send test email
    await sendEmail(
      settings.email.senderEmail,
      'testEmail',
      { timestamp: new Date().toISOString() }
    );

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