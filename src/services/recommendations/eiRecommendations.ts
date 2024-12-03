```typescript
import type { EIScores } from '../../hooks/useQuizResults';
import type { ParentActivity } from '../../hooks/useParentRecommendations';

type ScoreCategory = 'high' | 'moderate' | 'low';
type CulturalContext = 'jp' | 'us';

// Activity database - in a real app, this would come from your backend
const activityDatabase: Record<string, ParentActivity[]> = {
  'emotional-awareness': {
    high: [
      {
        id: 'ea_h1',
        title: 'Emotion Story Creation',
        description: 'Help your child create stories about different emotions',
        duration: '30 minutes',
        type: 'activity',
        emotionalFocus: ['emotional-awareness'],
        steps: [
          { text: 'Choose an emotion to explore' },
          { text: 'Create characters experiencing that emotion' },
          { text: 'Draw or write the story together' },
          { text: 'Discuss different ways to express the emotion' }
        ]
      }
    ],
    moderate: [
      {
        id: 'ea_m1',
        title: 'Emotion Mirror Game',
        description: 'Practice recognizing emotions through facial expressions',
        duration: '15 minutes',
        type: 'activity',
        emotionalFocus: ['emotional-awareness'],
        steps: [
          { text: 'Take turns making different emotional expressions' },
          { text: 'Guess the emotion being shown' },
          { text: 'Discuss what makes each emotion recognizable' }
        ]
      }
    ],
    low: [
      {
        id: 'ea_l1',
        title: 'Basic Emotion Cards',
        description: 'Learn to identify basic emotions using picture cards',
        duration: '20 minutes',
        type: 'activity',
        emotionalFocus: ['emotional-awareness'],
        steps: [
          { text: 'Look at emotion cards together' },
          { text: 'Name each emotion' },
          { text: 'Share examples of when you feel each emotion' }
        ]
      }
    ]
  },
  // Add similar structures for other EI components
};

// Cultural variations of activities
const culturalActivities: Record<CulturalContext, Record<string, ParentActivity[]>> = {
  jp: {
    'emotional-awareness': [
      {
        id: 'ea_jp_1',
        title: '感情日記 (Emotion Diary)',
        description: 'Use traditional Japanese concepts to explore emotions',
        duration: '20 minutes',
        type: 'activity',
        emotionalFocus: ['emotional-awareness'],
        steps: [
          { text: 'Write emotions using kanji characters' },
          { text: 'Draw seasonal elements that represent feelings' },
          { text: 'Practice mindful reflection' }
        ]
      }
    ]
  },
  us: {
    'emotional-awareness': [
      {
        id: 'ea_us_1',
        title: 'Emotion Show and Tell',
        description: 'Share and discuss emotions through personal objects',
        duration: '25 minutes',
        type: 'activity',
        emotionalFocus: ['emotional-awareness'],
        steps: [
          { text: 'Choose objects that represent different feelings' },
          { text: 'Share stories about the objects' },
          { text: 'Discuss emotional connections' }
        ]
      }
    ]
  }
};

function getScoreCategory(score: number): ScoreCategory {
  if (score >= 80) return 'high';
  if (score >= 50) return 'moderate';
  return 'low';
}

export function generateRecommendations(
  scores: EIScores,
  culturalContext: CulturalContext = 'us'
): ParentActivity[] {
  const recommendations: ParentActivity[] = [];

  // Process each EI component
  Object.entries(scores).forEach(([component, score]) => {
    const category = getScoreCategory(score);
    
    // Get general activities for the component and category
    const generalActivities = activityDatabase[component]?.[category] || [];
    
    // Get culture-specific activities
    const culturalSpecificActivities = culturalActivities[culturalContext][component] || [];

    // Combine and filter activities
    const componentActivities = [...generalActivities, ...culturalSpecificActivities]
      // Ensure we don't have duplicates
      .filter((activity, index, self) => 
        index === self.findIndex(a => a.id === activity.id)
      )
      // Prioritize activities based on score category
      .sort((a, b) => {
        if (category === 'low') {
          // For low scores, prioritize basic activities
          return a.type === 'activity' ? -1 : 1;
        }
        // For high scores, prioritize more challenging activities
        return a.type === 'exercise' ? -1 : 1;
      });

    // Add top activities to recommendations
    recommendations.push(...componentActivities.slice(0, 2));
  });

  // Sort recommendations by priority (low scores first)
  return recommendations.sort((a, b) => {
    const aScore = scores[a.emotionalFocus[0] as keyof EIScores];
    const bScore = scores[b.emotionalFocus[0] as keyof EIScores];
    return aScore - bScore;
  });
}

export function getActivityDescription(
  activity: ParentActivity,
  scores: EIScores
): string {
  const relevantScore = scores[activity.emotionalFocus[0] as keyof EIScores];
  const category = getScoreCategory(relevantScore);

  const descriptions = {
    high: 'This activity will help maintain and enhance your child\'s strong emotional skills.',
    moderate: 'This activity will help your child further develop their emotional understanding.',
    low: 'This foundational activity will help your child build essential emotional skills.'
  };

  return descriptions[category];
}

export function getProgressSuggestions(
  currentScores: EIScores,
  previousScores?: EIScores
): string[] {
  const suggestions: string[] = [];

  Object.entries(currentScores).forEach(([component, score]) => {
    const previousScore = previousScores?.[component as keyof EIScores];
    const improvement = previousScore ? score - previousScore : 0;

    if (improvement > 5) {
      suggestions.push(
        `Great progress in ${component}! Keep practicing the activities to maintain this growth.`
      );
    } else if (improvement < -5) {
      suggestions.push(
        `We noticed a slight decrease in ${component}. Let's focus on activities that strengthen this area.`
      );
    } else if (score < 60) {
      suggestions.push(
        `Regular practice of ${component} activities will help build confidence in this area.`
      );
    }
  });

  return suggestions;
}