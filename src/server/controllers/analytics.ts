import { Request, Response } from 'express';
import { Analytics } from '../models/Analytics';
import { Journal } from '../models/Journal';
import { startOfWeek, endOfWeek, subWeeks } from 'date-fns';
import { logger } from '../config/logger';
import { cache } from '../middleware/cache';

export const getUserAnalytics = [
  cache(300), // Cache for 5 minutes
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId || req.user._id;
      const weeks = parseInt(req.query.weeks as string) || 4;

      const endDate = endOfWeek(new Date());
      const startDate = startOfWeek(subWeeks(endDate, weeks - 1));

      // Get journal entries for the period
      const journals = await Journal.find({
        userId,
        createdAt: { $gte: startDate, $lte: endDate }
      });

      // Calculate metrics
      const metrics = {
        journalCount: journals.length,
        averageMood: journals.reduce((sum, j) => sum + j.mood.value, 0) / journals.length || 0,
        dominantEmotions: calculateDominantEmotions(journals),
        engagementScore: calculateEngagementScore(journals),
        improvementRate: calculateImprovementRate(journals)
      };

      // Save analytics
      await Analytics.create({
        userId,
        type: 'user',
        period: { start: startDate, end: endDate },
        metrics
      });

      res.json({
        success: true,
        data: {
          period: { start: startDate, end: endDate },
          metrics
        }
      });
    } catch (error) {
      logger.error('User analytics error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to generate user analytics'
      });
    }
  }
];

export const getClassAnalytics = [
  cache(300),
  async (req: Request, res: Response) => {
    try {
      const { classId } = req.params;
      const weeks = parseInt(req.query.weeks as string) || 4;

      const endDate = endOfWeek(new Date());
      const startDate = startOfWeek(subWeeks(endDate, weeks - 1));

      // Get all journals for the class
      const journals = await Journal.find({
        classId,
        createdAt: { $gte: startDate, $lte: endDate }
      });

      // Group journals by student
      const studentJournals = groupJournalsByStudent(journals);

      // Calculate class-wide metrics
      const metrics = {
        totalStudents: Object.keys(studentJournals).length,
        activeStudents: calculateActiveStudents(studentJournals),
        averageMood: calculateClassAverageMood(journals),
        dominantEmotions: calculateDominantEmotions(journals),
        engagementScore: calculateClassEngagement(studentJournals)
      };

      // Save class analytics
      await Analytics.create({
        classId,
        type: 'class',
        period: { start: startDate, end: endDate },
        metrics
      });

      res.json({
        success: true,
        data: {
          period: { start: startDate, end: endDate },
          metrics,
          studentMetrics: calculateStudentMetrics(studentJournals)
        }
      });
    } catch (error) {
      logger.error('Class analytics error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to generate class analytics'
      });
    }
  }
];

// Helper functions
function calculateDominantEmotions(journals: any[]): string[] {
  const emotions: { [key: string]: number } = {};
  journals.forEach(journal => {
    emotions[journal.mood.dominantEmotion] = 
      (emotions[journal.mood.dominantEmotion] || 0) + 1;
  });

  return Object.entries(emotions)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([emotion]) => emotion);
}

function calculateEngagementScore(journals: any[]): number {
  if (journals.length === 0) return 0;
  
  const journalsPerWeek = journals.length / 4; // Assuming 4 weeks
  const consistencyScore = Math.min(journalsPerWeek / 3, 1); // Target: 3 journals per week
  
  const averageLength = journals.reduce((sum, j) => sum + j.text.length, 0) / journals.length;
  const lengthScore = Math.min(averageLength / 200, 1); // Target: 200 characters per entry
  
  return (consistencyScore * 0.6 + lengthScore * 0.4) * 100;
}

function calculateImprovementRate(journals: any[]): number {
  if (journals.length < 2) return 0;
  
  const sortedJournals = journals.sort((a, b) => 
    a.createdAt.getTime() - b.createdAt.getTime()
  );
  
  const firstWeekMood = sortedJournals.slice(0, 7)
    .reduce((sum, j) => sum + j.mood.value, 0) / 7;
  const lastWeekMood = sortedJournals.slice(-7)
    .reduce((sum, j) => sum + j.mood.value, 0) / 7;
  
  return ((lastWeekMood - firstWeekMood) / Math.abs(firstWeekMood)) * 100;
}

function groupJournalsByStudent(journals: any[]): { [key: string]: any[] } {
  return journals.reduce((acc, journal) => {
    acc[journal.userId] = acc[journal.userId] || [];
    acc[journal.userId].push(journal);
    return acc;
  }, {});
}

function calculateActiveStudents(studentJournals: { [key: string]: any[] }): number {
  return Object.values(studentJournals)
    .filter(journals => journals.length >= 3).length; // Active = 3+ journals
}

function calculateClassAverageMood(journals: any[]): number {
  return journals.reduce((sum, j) => sum + j.mood.value, 0) / journals.length || 0;
}

function calculateClassEngagement(studentJournals: { [key: string]: any[] }): number {
  const studentScores = Object.values(studentJournals)
    .map(journals => calculateEngagementScore(journals));
  return studentScores.reduce((sum, score) => sum + score, 0) / studentScores.length || 0;
}

function calculateStudentMetrics(studentJournals: { [key: string]: any[] }) {
  return Object.entries(studentJournals).map(([userId, journals]) => ({
    userId,
    journalCount: journals.length,
    averageMood: journals.reduce((sum, j) => sum + j.mood.value, 0) / journals.length,
    engagementScore: calculateEngagementScore(journals),
    improvementRate: calculateImprovementRate(journals)
  }));
}