import cron from 'node-cron';
import { backupDatabase } from '../../services/backup/s3Backup';
import { logger } from '../config/logger';

// Schedule daily backups at 2 AM
export function scheduleBackups() {
  cron.schedule('0 2 * * *', async () => {
    try {
      await backupDatabase();
      logger.info('Scheduled backup completed successfully');
    } catch (error) {
      logger.error('Scheduled backup failed:', error);
    }
  });

  logger.info('Backup scheduler initialized');
}