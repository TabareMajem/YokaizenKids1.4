import { Request, Response, NextFunction } from 'express';
import { getDb } from '../../lib/db/client';
import { ObjectId } from 'mongodb';
import { logger } from '../config/logger';

export interface SubscriptionGuardRequest extends Request {
  user?: any;
}

export function requireActiveSubscription(requiredPlan?: string) {
  return async (req: SubscriptionGuardRequest, res: Response, next: NextFunction) => {
    try {
      const db = await getDb();
      const user = await db.collection('users').findOne({
        _id: new ObjectId(req.user._id)
      });

      if (!user?.subscription) {
        return res.status(402).json({
          success: false,
          error: 'Active subscription required'
        });
      }

      if (user.subscription.status !== 'active') {
        return res.status(402).json({
          success: false,
          error: 'Subscription is not active'
        });
      }

      if (requiredPlan && user.subscription.planId !== requiredPlan) {
        return res.status(403).json({
          success: false,
          error: 'This feature requires a different subscription plan'
        });
      }

      next();
    } catch (error) {
      logger.error('Subscription guard error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to verify subscription'
      });
    }
  };
}