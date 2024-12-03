import { getDb } from '../../lib/db/client';
import { ObjectId } from 'mongodb';
import { logger } from '../../server/config/logger';

export async function scheduleContent(
  contentId: string,
  publishAt: Date,
  timezone: string
) {
  try {
    const db = await getDb();
    
    await db.collection('scheduledContent').insertOne({
      contentId: new ObjectId(contentId),
      publishAt,
      timezone,
      status: 'scheduled',
      createdAt: new Date()
    });

    logger.info(`Content ${contentId} scheduled for publication at ${publishAt}`);
  } catch (error) {
    logger.error('Content scheduling error:', error);
    throw new Error('Failed to schedule content');
  }
}

export async function cancelScheduledContent(scheduleId: string) {
  try {
    const db = await getDb();
    
    await db.collection('scheduledContent').deleteOne({
      _id: new ObjectId(scheduleId)
    });

    logger.info(`Scheduled content ${scheduleId} cancelled`);
  } catch (error) {
    logger.error('Content schedule cancellation error:', error);
    throw new Error('Failed to cancel scheduled content');
  }
}

export async function getScheduledContent(contentId: string) {
  try {
    const db = await getDb();
    
    return await db.collection('scheduledContent')
      .find({
        contentId: new ObjectId(contentId),
        status: 'scheduled'
      })
      .toArray();
  } catch (error) {
    logger.error('Scheduled content retrieval error:', error);
    throw new Error('Failed to retrieve scheduled content');
  }
}

export async function publishScheduledContent() {
  try {
    const db = await getDb();
    const now = new Date();

    // Find content scheduled for publication
    const scheduledContent = await db.collection('scheduledContent')
      .find({
        publishAt: { $lte: now },
        status: 'scheduled'
      })
      .toArray();

    // Publish each piece of content
    for (const schedule of scheduledContent) {
      try {
        await db.collection('content').updateOne(
          { _id: schedule.contentId },
          { 
            $set: { 
              status: 'published',
              publishedAt: now
            } 
          }
        );

        await db.collection('scheduledContent').updateOne(
          { _id: schedule._id },
          { $set: { status: 'published' } }
        );

        logger.info(`Content ${schedule.contentId} published successfully`);
      } catch (error) {
        logger.error(`Failed to publish content ${schedule.contentId}:`, error);
        await db.collection('scheduledContent').updateOne(
          { _id: schedule._id },
          { $set: { status: 'failed' } }
        );
      }
    }
  } catch (error) {
    logger.error('Scheduled content publication error:', error);
    throw new Error('Failed to publish scheduled content');
  }
}