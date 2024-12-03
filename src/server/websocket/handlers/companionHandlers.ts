import { Socket } from 'socket.io';
import { generateCompanionResponse } from '../../services/ai/companion';
import { logger } from '../../config/logger';

export function setupCompanionHandlers(socket: Socket) {
  socket.on('companion:message', async (data) => {
    try {
      const { text, companionId } = data;
      
      // Generate AI response
      const response = await generateCompanionResponse(text, companionId);

      socket.emit('companion:response', {
        message: response,
        timestamp: new Date()
      });

      // Log interaction for analytics
      socket.emit('companion:interaction', {
        type: 'message',
        companionId,
        timestamp: new Date()
      });
    } catch (error) {
      logger.error('WebSocket companion message error:', error);
      socket.emit('error', { message: 'Failed to process message' });
    }
  });

  socket.on('companion:customize', async (data) => {
    try {
      const { companionId, customization } = data;
      
      // Update companion settings
      // This would be implemented in your database
      
      socket.emit('companion:customized', {
        success: true,
        companionId,
        customization
      });
    } catch (error) {
      logger.error('WebSocket companion customization error:', error);
      socket.emit('error', { message: 'Failed to customize companion' });
    }
  });
}