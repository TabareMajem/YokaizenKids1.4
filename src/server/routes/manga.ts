import express from 'express';
import { createManga, getManga } from '../controllers/manga';
import { protect } from '../middleware/auth';
import { apiLimiter } from '../middleware/rateLimiter';

const router = express.Router();

router.use(protect);
router.use(apiLimiter);

router.post('/', createManga);
router.get('/:id', getManga);

export default router;