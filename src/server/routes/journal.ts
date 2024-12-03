import express from 'express';
import { createJournal, getJournals } from '../controllers/journal';
import { protect, authorize } from '../middleware/auth';
import { apiLimiter } from '../middleware/rateLimiter';

const router = express.Router();

router.use(protect);
router.use(apiLimiter);

router.route('/')
  .post(createJournal)
  .get(getJournals);

router.get('/student/:studentId', 
  authorize('teacher', 'parent'),
  getJournals
);

export default router;