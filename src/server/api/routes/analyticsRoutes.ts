import { Router } from 'express';
import { param, query } from 'express-validator';
import { validateRequest } from '../middleware/validation';
import { ObjectId } from 'mongodb';
import { getCollections } from '../../../lib/db/collections';
import { startOfWeek, endOfWeek, subWeeks } from 'date-fns';

const router = Router();

// GET /api/analytics/user/:userId
router.get('/user/:userId',
  [
    param('userId').isString().notEmpty().withMessage('User ID is required'),
    query('weeks').optional().isInt({ min: 1, max: 52 }).toInt()
  ],
  validateRequest,
  async (req, res) => {
    try {
      const userId = new ObjectId(req.params.userId);
      const weeks = parseInt(req.query.weeks as string) || 4;
      
      const { journals } = await getCollections();
      
      const endDate = endOfWeek(new Date());
      const startDate = startOfWeek(subWeeks(endDate, weeks - 1));

      const entries = await journals
        .find({
          userId,
          createdAt: {
            $gte: startDate,
            $lte: endDate
          }
        })
        .sort({ createdAt: 1 })
        .toArray();

      // Process entries into weekly analytics
      const weeklyAnalytics = processWeeklyAnalytics(entries, weeks);

      res.json({
        success: true,
        data: weeklyAnalytics
      });
    } catch (error) {
      console.error('Analytics retrieval error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve user analytics'
      });
    }
  }
);

// GET /api/analytics/class/:classId
router.get('/class/:classId',
  [
    param('classId').isString().notEmpty().withMessage('Class ID is required'),
    query('weeks').optional().isInt({ min: 1, max: 52 }).toInt()
  ],
  validateRequest,
  async (req, res) => {
    try {
      const classId = new ObjectId(req.params.classId);
      const weeks = parseInt(req.query.weeks as string) || 4;
      
      const { users, journals } = await getCollections();
      
      // Get all students in the class
      const students = await users
        .find({ classId })
        .toArray();

      const studentIds = students.map(s => s._id);

      // Get journal entries for all students
      const endDate = endOfWeek(new Date());
      const startDate = startOfWeek(subWeeks(endDate, weeks - 1));

      const entries = await journals
        .find({
          userId: { $in: studentIds },
          createdAt: {
            $gte: startDate,
            $lte: endDate
          }
        })
        .sort({ createdAt: 1 })
        .toArray();

      // Process entries into class analytics
      const classAnalytics = processClassAnalytics(entries, students, weeks);

      res.json({
        success: true,
        data: classAnalytics
      });
    } catch (error) {
      console.error('Class analytics retrieval error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve class analytics'
      });
    }
  }
);

function processWeeklyAnalytics(entries: any[], weeks: number) {
  // Group entries by week and calculate metrics
  const weeklyData = Array.from({ length: weeks }, (_, i) => {
    const weekStart = startOfWeek(subWeeks(new Date(), i));
    const weekEnd = endOfWeek(weekStart);
    
    const weekEntries = entries.filter(entry => 
      entry.createdAt >= weekStart && entry.createdAt <= weekEnd
    );

    return {
      weekStart,
      weekEnd,
      entryCount: weekEntries.length,
      averageMood: weekEntries.reduce((sum, entry) => sum + entry.mood.value, 0) / weekEntries.length || 0,
      dominantEmotions: getDominantEmotions(weekEntries),
      engagementScore: calculateEngagementScore(weekEntries)
    };
  });

  return weeklyData.reverse();
}

function processClassAnalytics(entries: any[], students: any[], weeks: number) {
  const classData = processWeeklyAnalytics(entries, weeks);
  
  // Add class-specific metrics
  return {
    weeklyData: classData,
    totalStudents: students.length,
    activeStudents: new Set(entries.map(e => e.userId.toString())).size,
    overallEngagement: classData.reduce((sum, week) => sum + week.engagementScore, 0) / weeks,
    emotionalTrends: getClassEmotionalTrends(entries)
  };
}

function getDominantEmotions(entries: any[]) {
  const emotions: { [key: string]: number } = {};
  
  entries.forEach(entry => {
    emotions[entry.mood.dominantEmotion] = (emotions[entry.mood.dominantEmotion] || 0) + 1;
  });

  return Object.entries(emotions)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([emotion]) => emotion);
}

function calculateEngagementScore(entries: any[]) {
  // Calculate engagement based on entry frequency and length
  const baseScore = entries.length * 10;
  const contentScore = entries.reduce((sum, entry) => sum + Math.min(entry.text.length / 100, 10), 0);
  
  return Math.min((baseScore + contentScore) / 20, 10);
}

function getClassEmotionalTrends(entries: any[]) {
  const emotions = entries.reduce((acc: { [key: string]: number }, entry) => {
    acc[entry.mood.dominantEmotion] = (acc[entry.mood.dominantEmotion] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(emotions)
    .sort(([,a], [,b]) => b - a)
    .map(([emotion, count]) => ({
      emotion,
      count,
      percentage: (count / entries.length) * 100
    }));
}

export default router;