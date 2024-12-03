import express from 'express';
import { config } from 'dotenv';
import { connectDB } from './config/database';
import { logger } from './config/logger';
import { initializeMonitoring } from './config/monitoring';
import { scheduleBackups } from './cron/backupScheduler';
import { scheduleContentPublisher } from './cron/contentScheduler';
import { errorHandler } from './middleware/errorHandler';
import { securityMiddleware } from './middleware/security';
import { apiLimiter } from './middleware/rateLimiter';

// Load environment variables
config();

// Initialize monitoring
initializeMonitoring();

// Initialize express app
const app = express();

// Apply security middleware
app.use(securityMiddleware);

// Apply rate limiting
app.use('/api/', apiLimiter);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/journals', require('./routes/journals'));
app.use('/api/manga', require('./routes/manga'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/content', require('./routes/content'));
app.use('/api/stripe', require('./routes/stripe'));

// Error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Schedule backups
    scheduleBackups();

    // Initialize content scheduler
    scheduleContentPublisher();
    
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Server startup error:', error);
    process.exit(1);
  }
}

startServer();