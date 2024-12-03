import express from 'express';
import { getUserAnalytics, getClassAnalytics } from '../controllers/analytics';
import { protect, authorize } from '../middleware/auth';
import { apiLimiter } from '../middleware/rateLimiter';

const router = express.Router();

router.use(protect);
router.use(apiLimiter);

// User analytics
router.get('/user/:userId?', getUserAnalytics);

// Class analytics (teachers only)
router.get('/class/:classId', 
  authorize('teacher', 'admin'),
  getClassAnalytics
);

export default router;