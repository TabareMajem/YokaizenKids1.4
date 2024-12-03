import type { QuizQuestion } from '../types/quiz';

export const bullyingQuestions: QuizQuestion[] = [
  // Victim Category
  {
    id: 'bully_v1',
    text: "How often do you feel left out or excluded by others at school?",
    type: 'likert-scale',
    category: 'victim',
    difficulty: 'beginner',
    points: 5,
    image: {
      url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600",
      alt: "Child sitting alone",
      width: 800,
      height: 600
    },
    answers: [],
    isReversed: false
  },
  {
    id: 'bully_v2',
    text: "Have other students ever made fun of you or called you names?",
    type: 'likert-scale',
    category: 'victim',
    difficulty: 'beginner',
    points: 5,
    image: {
      url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&h=600",
      alt: "Child looking sad",
      width: 800,
      height: 600
    },
    answers: [],
    isReversed: false
  },

  // Bystander Category
  {
    id: 'bully_b1',
    text: "When you see someone being teased, what do you usually do?",
    type: 'multiple-choice',
    category: 'bystander',
    difficulty: 'beginner',
    points: 5,
    image: {
      url: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&h=600",
      alt: "Children in school",
      width: 800,
      height: 600
    },
    answers: [
      {
        id: 'b1_a',
        text: "Tell a teacher or adult",
        score: 1,
        category: 'bystander',
        isCorrect: true
      },
      {
        id: 'b1_b',
        text: "Try to help the person being teased",
        score: 2,
        category: 'bystander',
        isCorrect: false
      },
      {
        id: 'b1_c',
        text: "Watch but don't get involved",
        score: 4,
        category: 'bystander',
        isCorrect: false
      },
      {
        id: 'b1_d',
        text: "Walk away",
        score: 5,
        category: 'bystander',
        isCorrect: false
      }
    ]
  },

  // Perpetrator Category
  {
    id: 'bully_p1',
    text: "Have you ever made fun of someone to make others laugh?",
    type: 'likert-scale',
    category: 'perpetrator',
    difficulty: 'beginner',
    points: 5,
    image: {
      url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600",
      alt: "Group of students",
      width: 800,
      height: 600
    },
    answers: [],
    isReversed: false
  }
];

export function getBullyingCategories(): string[] {
  return ['victim', 'bystander', 'perpetrator'];
}

export function calculateBullyingRisk(
  responses: { questionId: string; value: number }[]
): Record<string, number> {
  const categories = getBullyingCategories();
  const scores: Record<string, number> = {};

  categories.forEach(category => {
    const categoryQuestions = bullyingQuestions.filter(q => q.category === category);
    let totalScore = 0;
    let maxScore = 0;

    categoryQuestions.forEach(question => {
      const response = responses.find(r => r.questionId === question.id);
      if (response) {
        totalScore += response.value;
        maxScore += 5; // Maximum score per question
      }
    });

    scores[category] = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
  });

  return scores;
}

export function generateRecommendations(scores: Record<string, number>): Record<string, string[]> {
  const recommendations: Record<string, string[]> = {};

  Object.entries(scores).forEach(([category, score]) => {
    if (score >= 70) {
      switch (category) {
        case 'victim':
          recommendations[category] = [
            'Schedule regular check-ins with a trusted adult',
            'Join social skills development activities',
            'Practice assertiveness techniques'
          ];
          break;
        case 'bystander':
          recommendations[category] = [
            'Learn safe intervention strategies',
            'Practice reporting incidents to adults',
            'Join anti-bullying initiatives'
          ];
          break;
        case 'perpetrator':
          recommendations[category] = [
            'Participate in empathy-building exercises',
            'Join anger management workshops',
            'Engage in positive social activities'
          ];
          break;
      }
    }
  });

  return recommendations;
}