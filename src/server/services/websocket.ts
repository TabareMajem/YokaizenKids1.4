import { Server } from 'socket.io';
import { Server as HTTPServer } from 'http';
import jwt from 'jsonwebtoken';
import { logger } from '../config/logger';

export const initializeWebSocket = (server: HTTPServer) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ['GET', 'POST']
    }
  });

  // Authentication middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    
    if (!token) {
      return next(new Error('Authentication error'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      socket.data.user = decoded;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  // Connection handler
  io.on('connection', (socket) => {
    logger.info(`User connected: ${socket.data.user.id}`);

    // Join user to their personal room
    socket.join(`user:${socket.data.user.id}`);

    // Handle real-time journal updates
    socket.on('journal:update', (data) => {
      // Broadcast to teachers/parents
      if (data.teacherId) {
        io.to(`user:${data.teacherId}`).emit('student:journal-update', data);
      }
      if (data.parentId) {
        io.to(`user:${data.parentId}`).emit('student:journal-update', data);
      }
    });

    // Handle AI companion interactions
    socket.on('companion:message', async (data) => {
      try {
        // Process message with AI service
        // Emit response back to user
        socket.emit('companion:response', {
          message: 'AI response',
          timestamp: new Date()
        });
      } catch (error) {
        logger.error('AI companion error:', error);
        socket.emit('error', { message: 'Error processing message' });
      }
    });

    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${socket.data.user.id}`);
    });
  });

  return io;
};