import { transporter } from './config';
import { emailTemplates } from './templates';
import { logger } from '../../server/config/logger';

export async function sendEmail(
  to: string,
  template: keyof typeof emailTemplates,
  data: any
) {
  try {
    const { subject, html } = emailTemplates[template](data);

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html
    });

    logger.info(`Email sent successfully to ${to}`);
  } catch (error) {
    logger.error('Email sending error:', error);
    throw new Error('Failed to send email');
  }
}