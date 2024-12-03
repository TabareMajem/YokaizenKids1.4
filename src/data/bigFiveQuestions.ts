import type { QuizQuestion } from '../types/quiz';

export const bigFiveQuestions: QuizQuestion[] = [
  // Openness Questions
  {
    id: 'bf_o1',
    text: "I love trying new activities and learning about different things.",
    type: 'likert-scale',
    category: 'openness',
    difficulty: 'beginner',
    points: 5,
    image: {
      url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600",
      alt: "Child exploring nature with magnifying glass",
      width: 800,
      height: 600
    },
    answers: [],
    isReversed: false
  },
  {
    id: 'bf_o2',
    text: "I enjoy using my imagination to create stories or drawings.",
    type: 'likert-scale',
    category: 'openness',
    difficulty: 'beginner',
    points: 5,
    image: {
      url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=600",
      alt: "Child drawing creatively",
      width: 800,
      height: 600
    },
    answers: [],
    isReversed: false
  },
  {
    id: 'bf_o3',
    text: "I prefer to do the same activities every day without change.",
    type: 'likert-scale',
    category: 'openness',
    difficulty: 'beginner',
    points: 5,
    image: {
      url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&h=600",
      alt: "Child doing repetitive activity",
      width: 800,
      height: 600
    },
    answers: [],
    isReversed: true
  },
  {
    id: 'bf_o4',
    text: "I like asking questions to learn more about the world.",
    type: 'likert-scale',
    category: 'openness',
    difficulty: 'beginner',
    points: 5,
    image: {
      url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600",
      alt: "Child asking questions",
      width: 800,
      height: 600
    },
    answers: [],
    isReversed: false
  },

  // Conscientiousness Questions
  {
    id: 'bf_c1',
    text: "I always finish my homework and chores on time.",
    type: 'likert-scale',
    category: 'conscientiousness',
    difficulty: 'beginner',
    points: 5,
    image: {
      url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600",
      alt: "Child doing homework",
      width: 800,
      height: 600
    },
    answers: [],
    isReversed: false
  },
  {
    id: 'bf_c2',
    text: "I keep my room clean and organized.",
    type: 'likert-scale',
    category: 'conscientiousness',
    difficulty: 'beginner',
    points: 5,
    image: {
      url: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&h=600",
      alt: "Child with organized room",
      width: 800,
      height: 600
    },
    answers: [],
    isReversed: false
  },
  {
    id: 'bf_c3',
    text: "I often forget to do things I'm supposed to do.",
    type: 'likert-scale',
    category: 'conscientiousness',
    difficulty: 'beginner',
    points: 5,
    image: {
      url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&h=600",
      alt: "Child looking forgetful",
      width: 800,
      height: 600
    },
    answers: [],
    isReversed: true
  },
  {
    id: 'bf_c4',
    text: "I like to plan ahead for activities or projects.",
    type: 'likert-scale',
    category: 'conscientiousness',
    difficulty: 'beginner',
    points: 5,
    image: {
      url: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600",
      alt: "Child planning activity",
      width: 800,
      height: 600
    },
    answers: [],
    isReversed: false
  },

  // Extraversion Questions
  {
    id: 'bf_e1',
    text: "I enjoy being around lots of people and making new friends.",
    type: 'likert-scale',
    category: 'extraversion',
    difficulty: 'beginner',
    points: 5,
    image: {
      url: "https://images.unsplash.com/photo-1556484687-30636164638b?w=800&h=600",
      alt: "Child playing with friends",
      width: 800,
      height: 600
    },
    answers: [],
    isReversed: false
  },
  {
    id: 'bf_e2',
    text: "I like to talk and share my ideas with others.",
    type: 'likert-scale',
    category: 'extraversion',
    difficulty: 'beginner',
    points: 5,
    image: {
      url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=600",
      alt: "Child sharing ideas",
      width: 800,
      height: 600
    },
    answers: [],
    isReversed: false
  },
  {
    id: 'bf_e3',
    text: "I prefer to play by myself rather than with others.",
    type: 'likert-scale',
    category: 'extraversion',
    difficulty: 'beginner',
    points: 5,
    image: {
      url: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=800&h=600",
      alt: "Child playing alone",
      width: 800,
      height: 600
    },
    answers: [],
    isReversed: true
  },
  {
    id: 'bf_e4',
    text: "I feel comfortable starting conversations with new people.",
    type: 'likert-scale',
    category: 'extraversion',
    difficulty: 'beginner',
    points: 5,
    image: {
      url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600",
      alt: "Child meeting new people",
      width: 800,
      height: 600
    },
    answers: [],
    isReversed: false
  },

  // Agreeableness Questions
  {
    id: 'bf_a1',
    text: "I like helping others when they need it.",
    type: 'likert-scale',
    category: 'agreeableness',
    difficulty: 'beginner',
    points: 5,
    image: {
      url: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&h=600",
      alt: "Child helping others",
      width: 800,
      height: 600
    },
    answers: [],
    isReversed: false
  },
  {
    id: 'bf_a2',
    text: "I care about other people's feelings.",
    type: 'likert-scale',
    category: 'agreeableness',
    difficulty: 'beginner',
    points: 5,
    image: {
      url: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&h=600",
      alt: "Child showing empathy",
      width: 800,
      height: 600
    },
    answers: [],
    isReversed: false
  },
  {
    id: 'bf_a3',
    text: "I get angry easily when things don't go my way.",
    type: 'likert-scale',
    category: 'agreeableness',
    difficulty: 'beginner',
    points: 5,
    image: {
      url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&h=600",
      alt: "Child looking frustrated",
      width: 800,
      height: 600
    },
    answers: [],
    isReversed: true
  },
  {
    id: 'bf_a4',
    text: "I share my toys and belongings with others.",
    type: 'likert-scale',
    category: 'agreeableness',
    difficulty: 'beginner',
    points: 5,
    image: {
      url: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&h=600",
      alt: "Child sharing toys",
      width: 800,
      height: 600
    },
    answers: [],
    isReversed: false
  },

  // Emotional Stability Questions
  {
    id: 'bf_es1',
    text: "I stay calm even when I'm upset.",
    type: 'likert-scale',
    category: 'emotional-stability',
    difficulty: 'beginner',
    points: 5,
    image: {
      url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&h=600",
      alt: "Child staying calm",
      width: 800,
      height: 600
    },
    answers: [],
    isReversed: false
  },
  {
    id: 'bf_es2',
    text: "I don't worry too much about things.",
    type: 'likert-scale',
    category: 'emotional-stability',
    difficulty: 'beginner',
    points: 5,
    image: {
      url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&h=600",
      alt: "Child looking relaxed",
      width: 800,
      height: 600
    },
    answers: [],
    isReversed: false
  },
  {
    id: 'bf_es3',
    text: "I often feel nervous or scared.",
    type: 'likert-scale',
    category: 'emotional-stability',
    difficulty: 'beginner',
    points: 5,
    image: {
      url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&h=600",
      alt: "Child looking anxious",
      width: 800,
      height: 600
    },
    answers: [],
    isReversed: true
  },
  {
    id: 'bf_es4',
    text: "I can handle changes without getting upset.",
    type: 'likert-scale',
    category: 'emotional-stability',
    difficulty: 'beginner',
    points: 5,
    image: {
      url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&h=600",
      alt: "Child adapting to change",
      width: 800,
      height: 600
    },
    answers: [],
    isReversed: false
  }
];

export function getQuestionsByTrait(trait: string): QuizQuestion[] {
  return bigFiveQuestions.filter(q => q.category === trait);
}

export function getBigFiveTraits(): string[] {
  return Array.from(new Set(bigFiveQuestions.map(q => q.category)));
}

export function calculateBigFiveScore(
  responses: { questionId: string; value: number; }[], 
  trait: string
): number {
  const traitQuestions = getQuestionsByTrait(trait);
  let totalPoints = 0;
  let maxPoints = 0;

  traitQuestions.forEach(question => {
    const response = responses.find(r => r.questionId === question.id);
    if (response) {
      // Handle reverse-scored questions
      const value = question.isReversed ? 6 - response.value : response.value;
      totalPoints += value;
    }
    maxPoints += 5; // Maximum score per question is 5
  });

  // Convert to percentage
  return maxPoints > 0 ? (totalPoints / maxPoints) * 100 : 0;
}

export function getBigFiveRecommendations(scores: Record<string, number>) {
  const recommendations: Record<string, string[]> = {
    'openness': [
      'Try new activities and hobbies',
      'Read books about different cultures',
      'Take art or music classes'
    ],
    'conscientiousness': [
      'Create daily schedules and routines',
      'Break big tasks into smaller steps',
      'Use checklists and planners'
    ],
    'extraversion': [
      'Join group activities or clubs',
      'Practice starting conversations',
      'Participate in team sports'
    ],
    'agreeableness': [
      'Practice active listening',
      'Volunteer for community service',
      'Play cooperative games'
    ],
    'emotional-stability': [
      'Learn relaxation techniques',
      'Practice mindfulness exercises',
      'Keep a mood journal'
    ]
  };

  // Return recommendations for traits with lower scores
  const needsImprovement = Object.entries(scores)
    .filter(([_, score]) => score < 70)
    .map(([trait]) => trait);

  return needsImprovement.reduce((acc, trait) => {
    acc[trait] = recommendations[trait] || [];
    return acc;
  }, {} as Record<string, string[]>);
}