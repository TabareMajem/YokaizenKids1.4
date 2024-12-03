import mongoose from 'mongoose';
import { logger } from './logger';

export async function connectDB() {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }

    await mongoose.connect(mongoURI);
    logger.info('MongoDB Connected Successfully');
  } catch (error) {
    logger.error('MongoDB Connection Error:', error);
    process.exit(1);
  }
}

export async function closeDB() {
  try {
    await mongoose.connection.close();
    logger.info('MongoDB Connection Closed');
  } catch (error) {
    logger.error('Error closing MongoDB connection:', error);
    process.exit(1);
  }
}