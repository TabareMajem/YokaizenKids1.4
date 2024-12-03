import OpenAI from 'openai';
import { z } from 'zod';
import { startOfWeek, eachDayOfInterval, subWeeks, format } from 'date-fns';
import { validateEnv } from '../config/env';

const env = validateEnv();

const openai = new OpenAI({
  apiKey: env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export type MoodScore = {
  value: number;
  dominantEmotion: string;
  confidence: number;
};

export type DailyMood = {
  date: string;
  mood: MoodScore;
  journalCount: number;
};

export type WeeklyInsight = {
  startDate: string;
  endDate: string;
  averageMood: number;
  moodTrend: 'improving' | 'declining' | 'stable';
  dominantEmotions: string[];
  journalCount: number;
  recommendations: string[];
};

const MoodScoreSchema = z.object({
  value: z.number().min(-1).max(1),
  dominantEmotion: z.string(),
  confidence: z.number().min(0).max(1)
});

export async function analyzeMood(text: string): Promise<MoodScore> {
  if (!env.VITE_OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured');
  }

  const prompt = `Analyze the emotional content and sentiment of this journal entry. Return a JSON object with:
  - value: a number from -1 (very negative) to 1 (very positive)
  - dominantEmotion: the primary emotion expressed
  - confidence: confidence score from 0 to 1

  Journal Entry: "${text}"

  Return only valid JSON in this format:
  { "value": 0.8, "dominantEmotion": "joy", "confidence": 0.9 }`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    const result = response.choices[0].message.content;
    if (!result) throw new Error('No response from OpenAI');

    return MoodScoreSchema.parse(JSON.parse(result));
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to analyze mood. Please check your API key configuration.');
  }
}

export function aggregateWeeklyMoods(dailyMoods: DailyMood[]): WeeklyInsight[] {
  const weeks: { [key: string]: DailyMood[] } = {};
  
  dailyMoods.forEach(mood => {
    const weekStart = format(startOfWeek(new Date(mood.date)), 'yyyy-MM-dd');
    if (!weeks[weekStart]) {
      weeks[weekStart] = [];
    }
    weeks[weekStart].push(mood);
  });

  return Object.entries(weeks).map(([weekStart, moods]) => {
    const averageMood = moods.reduce((sum, m) => sum + m.mood.value, 0) / moods.length;
    const prevWeekMoods = dailyMoods.filter(m => {
      const date = new Date(m.date);
      const weekBefore = subWeeks(new Date(weekStart), 1);
      return date >= weekBefore && date < new Date(weekStart);
    });
    const prevAvgMood = prevWeekMoods.length > 0
      ? prevWeekMoods.reduce((sum, m) => sum + m.mood.value, 0) / prevWeekMoods.length
      : averageMood;

    const moodTrend = averageMood > prevAvgMood + 0.1 
      ? 'improving' 
      : averageMood < prevAvgMood - 0.1 
        ? 'declining' 
        : 'stable';

    const emotionCounts: { [key: string]: number } = {};
    moods.forEach(m => {
      emotionCounts[m.mood.dominantEmotion] = (emotionCounts[m.mood.dominantEmotion] || 0) + 1;
    });

    const dominantEmotions = Object.entries(emotionCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([emotion]) => emotion);

    return {
      startDate: weekStart,
      endDate: format(
        eachDayOfInterval({
          start: new Date(weekStart),
          end: new Date(weekStart)
        })[6],
        'yyyy-MM-dd'
      ),
      averageMood,
      moodTrend,
      dominantEmotions,
      journalCount: moods.reduce((sum, m) => sum + m.journalCount, 0),
      recommendations: generateRecommendations(moodTrend, dominantEmotions[0])
    };
  });
}

function generateRecommendations(trend: string, dominantEmotion: string): string[] {
  const recommendations: { [key: string]: string[] } = {
    improving: [
      'Continue the positive momentum with creative writing exercises',
      'Share your success stories through manga creation',
      'Try new journaling prompts to maintain engagement'
    ],
    declining: [
      'Schedule a one-on-one check-in',
      'Introduce mood-lifting activities like collaborative storytelling',
      'Suggest calming drawing exercises'
    ],
    stable: [
      'Explore new emotional expression techniques',
      'Try themed journaling weeks',
      'Experiment with different manga styles'
    ]
  };

  return recommendations[trend] || recommendations.stable;
}