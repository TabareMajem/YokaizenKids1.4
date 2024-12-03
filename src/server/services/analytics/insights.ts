import { Journal } from '../../models/Journal';
import { startOfWeek, endOfWeek, subWeeks } from 'date-fns';
import { logger } from '../../config/logger';

export type WeeklyInsight = {
  startDate: Date;
  endDate: Date;
  journalCount: number;
  averageMood: number;
  dominantEmotions: string[];
  recommendations: string[];
};

export async function generateWeeklyInsights(userId: string, weeks = 4): Promise<WeeklyInsight[]> {
  try {
    const endDate = endOfWeek(new Date());
    const startDate = startOfWeek(subWeeks(endDate, weeks - 1));

    const journals = await Journal.find({
      userId,
      createdAt: { $gte: startDate, $lte: endDate }
    }).sort({ createdAt: 1 });

    const weeklyJournals = groupJournalsByWeek(journals);
    return generateInsightsForWeeks(weeklyJournals);
  } catch (error) {
    logger.error('Weekly insights generation error:', error);
    throw new Error('Failed to generate weekly insights');
  }
}

function groupJournalsByWeek(journals: any[]): Map<string, any[]> {
  const weeks = new Map<string, any[]>();
  
  journals.forEach(journal => {
    const weekStart = startOfWeek(journal.createdAt);
    const weekKey = weekStart.toISOString();
    
    if (!weeks.has(weekKey)) {
      weeks.set(weekKey, []);
    }
    weeks.get(weekKey)?.push(journal);
  });

  return weeks;
}

function generateInsightsForWeeks(weeklyJournals: Map<string, any[]>): WeeklyInsight[] {
  return Array.from(weeklyJournals.entries()).map(([weekStart, journals]) => {
    const startDate = new Date(weekStart);
    const endDate = endOfWeek(startDate);
    
    const averageMood = journals.reduce((sum, j) => sum + j.mood.value, 0) / journals.length;
    const dominantEmotions = calculateDominantEmotions(journals);
    
    return {
      startDate,
      endDate,
      journalCount: journals.length,
      averageMood,
      dominantEmotions,
      recommendations: generateRecommendations(averageMood, dominantEmotions)
    };
  });
}

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

function generateRecommendations(averageMood: number, emotions: string[]): string[] {
  const recommendations: string[] = [];

  if (averageMood < 0) {
    recommendations.push(
      'Try some calming breathing exercises',
      'Write about things you\'re grateful for'
    );
  } else if (averageMood > 0.5) {
    recommendations.push(
      'Share your positive experiences with others',
      'Create a manga story about what makes you happy'
    );
  }

  if (emotions.includes('anxious') || emotions.includes('stressed')) {
    recommendations.push(
      'Practice mindfulness activities',
      'Talk to your AI companion about your worries'
    );
  }

  return recommendations;
}