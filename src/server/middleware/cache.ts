import { Request, Response, NextFunction } from 'express';
import { createClient } from 'redis';
import { logger } from '../config/logger';

const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.on('error', (err) => logger.error('Redis Client Error:', err));

export const cache = (duration: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }

    const key = `cache:${req.originalUrl}`;

    try {
      const cachedData = await redisClient.get(key);
      
      if (cachedData) {
        return res.json(JSON.parse(cachedData));
      }

      const originalJson = res.json;
      res.json = ((data: any) => {
        redisClient.setEx(key, duration, JSON.stringify(data));
        return originalJson.call(res, data);
      }) as any;

      next();
    } catch (error) {
      logger.error('Cache middleware error:', error);
      next();
    }
  };
};