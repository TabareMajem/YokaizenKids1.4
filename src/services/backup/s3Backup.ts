import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getCollections } from '../../lib/db/collections';
import { logger } from '../../server/config/logger';

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
});

export async function backupDatabase() {
  try {
    const { users, journals, mangas, contents } = await getCollections();

    // Backup each collection
    const collections = {
      users: await users.find().toArray(),
      journals: await journals.find().toArray(),
      mangas: await mangas.find().toArray(),
      contents: await contents.find().toArray()
    };

    const timestamp = new Date().toISOString();
    const backupKey = `backups/${timestamp}/database-backup.json`;

    await s3Client.send(new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: backupKey,
      Body: JSON.stringify(collections),
      ContentType: 'application/json'
    }));

    logger.info(`Database backup completed: ${backupKey}`);
    return backupKey;
  } catch (error) {
    logger.error('Database backup error:', error);
    throw new Error('Failed to backup database');
  }
}