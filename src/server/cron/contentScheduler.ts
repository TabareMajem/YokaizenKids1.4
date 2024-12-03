import cron from 'node-cron';
import { publishScheduledContent } from '../../services/content/scheduler';
import { logger } from '../config/logger';

// Run every minute to check for content that needs to be published
export function scheduleContentPublisher() {
  cron.schedule('* * * * *', async () => {
    try {
      await publishScheduledContent();
    } catch (error) {
      logger.error('Content scheduler error:', error);
    }
  });

  logger.info('Content scheduler initialized');
}