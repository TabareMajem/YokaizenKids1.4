import { Socket } from 'socket.io';
import { Journal } from '../../models/Journal';
import { logger } from '../../config/logger';

export function setupJournalHandlers(socket: Socket) {
  socket.on('journal:create', async (data) => {
    try {
      const { userId, text } = data;
      const journal = await Journal.create({
        userId,
        text,
        mood: { value: 0, dominantEmotion: 'neutral', confidence: 1 }
      });

      // Notify teachers and parents
      if (data.teacherId) {
        socket.to(`user:${data.teacherId}`).emit('journal:update', {
          type: 'new',
          journal
        });
      }

      if (data.parentId) {
        socket.to(`user:${data.parentId}`).emit('journal:update', {
          type: 'new',
          journal
        });
      }

      socket.emit('journal:created', { success: true, journal });
    } catch (error) {
      logger.error('WebSocket journal creation error:', error);
      socket.emit('error', { message: 'Failed to create journal entry' });
    }
  });

  socket.on('journal:update', async (data) => {
    try {
      const { journalId, updates } = data;
      const journal = await Journal.findByIdAndUpdate(
        journalId,
        { $set: updates },
        { new: true }
      );

      if (!journal) {
        throw new Error('Journal not found');
      }

      socket.emit('journal:updated', { success: true, journal });
    } catch (error) {
      logger.error('WebSocket journal update error:', error);
      socket.emit('error', { message: 'Failed to update journal entry' });
    }
  });
}