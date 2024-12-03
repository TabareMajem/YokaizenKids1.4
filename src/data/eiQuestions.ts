import type { QuizQuestion } from '../types/quiz';

export const eiQuestions: QuizQuestion[] = [
  // Previous questions remain the same...
  {
    id: 'ei_3',
    text: "At recess, you see a group of kids playing a game you'd like to join. What do you do?",
    type: 'multiple-choice',
    category: 'social-skills',
    difficulty: 'beginner',
    points: 5,
    image: {
      url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=600",
      alt: "A child watching other kids play",
      width: 800,
      height: 600
    },
    answers: [
      {
        id: 'ei_3_a',
        text: "Approach them and politely ask if you can join",
        score: 5,
        category: 'social-skills',
        isCorrect: true,
        image: {
          url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300",
          alt: "Child approaching group with smile",
          width: 400,
          height: 300
        }
      },
      {
        id: 'ei_3_b',
        text: "Stand nearby and hope they invite you",
        score: 3,
        category: 'social-skills',
        isCorrect: false,
        image: {
          url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300",
          alt: "Child standing at a distance",
          width: 400,
          height: 300
        }
      },
      {
        id: 'ei_3_c',
        text: "Decide to play alone instead",
        score: 2,
        category: 'social-skills',
        isCorrect: false,
        image: {
          url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300",
          alt: "Child playing alone",
          width: 400,
          height: 300
        }
      },
      {
        id: 'ei_3_d',
        text: "Interrupt the game and start playing without asking",
        score: 1,
        category: 'empathy',
        isCorrect: false,
        image: {
          url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300",
          alt: "Child interrupting game",
          width: 400,
          height: 300
        }
      }
    ],
    audio: {
      url: '',
      language: 'en'
    }
  },
  {
    id: 'ei_4',
    text: "You accidentally spill juice on the floor. What do you do?",
    type: 'multiple-choice',
    category: 'self-awareness',
    difficulty: 'beginner',
    points: 5,
    image: {
      url: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&h=600",
      alt: "A spilled drink on the floor",
      width: 800,
      height: 600
    },
    answers: [
      {
        id: 'ei_4_a',
        text: "Tell an adult and help clean it up",
        score: 5,
        category: 'self-awareness',
        isCorrect: true,
        image: {
          url: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=400&h=300",
          alt: "Child cleaning with adult",
          width: 400,
          height: 300
        }
      },
      {
        id: 'ei_4_b',
        text: "Quickly walk away and hope no one notices",
        score: 1,
        category: 'self-awareness',
        isCorrect: false,
        image: {
          url: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=400&h=300",
          alt: "Child walking away from spill",
          width: 400,
          height: 300
        }
      },
      {
        id: 'ei_4_c',
        text: "Blame someone else for the spill",
        score: 1,
        category: 'self-regulation',
        isCorrect: false,
        image: {
          url: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=400&h=300",
          alt: "Child pointing at others",
          width: 400,
          height: 300
        }
      },
      {
        id: 'ei_4_d',
        text: "Feel upset but clean it up yourself without telling anyone",
        score: 3,
        category: 'self-regulation',
        isCorrect: false,
        image: {
          url: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=400&h=300",
          alt: "Child cleaning alone",
          width: 400,
          height: 300
        }
      }
    ],
    audio: {
      url: '',
      language: 'en'
    }
  },
  {
    id: 'ei_5',
    text: "You're learning to ride a bike, but you keep losing balance. What do you do?",
    type: 'multiple-choice',
    category: 'motivation',
    difficulty: 'beginner',
    points: 5,
    image: {
      url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&h=600",
      alt: "Child learning to ride a bike",
      width: 800,
      height: 600
    },
    answers: [
      {
        id: 'ei_5_a',
        text: "Keep practicing because you know you'll get better",
        score: 5,
        category: 'motivation',
        isCorrect: true,
        image: {
          url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=300",
          alt: "Child practicing bike riding",
          width: 400,
          height: 300
        }
      },
      {
        id: 'ei_5_b',
        text: "Decide biking isn't for you and give up",
        score: 1,
        category: 'motivation',
        isCorrect: false,
        image: {
          url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=300",
          alt: "Child giving up on bike",
          width: 400,
          height: 300
        }
      },
      {
        id: 'ei_5_c',
        text: "Take a break and try again another day",
        score: 3,
        category: 'motivation',
        isCorrect: false,
        image: {
          url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=300",
          alt: "Child taking break from bike",
          width: 400,
          height: 300
        }
      },
      {
        id: 'ei_5_d',
        text: "Feel frustrated and throw the bike down",
        score: 1,
        category: 'self-regulation',
        isCorrect: false,
        image: {
          url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=300",
          alt: "Child frustrated with bike",
          width: 400,
          height: 300
        }
      }
    ],
    audio: {
      url: '',
      language: 'en'
    }
  }
  // ... Continue with remaining questions
];

// Helper functions for scoring and categorization
export function getQuestionsByCategory(category: string): QuizQuestion[] {
  return eiQuestions.filter(q => q.category === category);
}

export function getCategories(): string[] {
  return Array.from(new Set(eiQuestions.map(q => q.category)));
}

export function calculateCategoryScore(
  results: { questionId: string; selectedAnswerId: string; }[], 
  category: string
): number {
  const categoryQuestions = getQuestionsByCategory(category);
  let totalPoints = 0;
  let maxPoints = 0;

  categoryQuestions.forEach(question => {
    const result = results.find(r => r.questionId === question.id);
    if (result) {
      const selectedAnswer = question.answers.find(a => a.id === result.selectedAnswerId);
      if (selectedAnswer) {
        totalPoints += selectedAnswer.score;
      }
    }
    maxPoints += 5; // Maximum score per question
  });

  return maxPoints > 0 ? (totalPoints / maxPoints) * 100 : 0;
}

// Helper function to get recommendations based on scores
export function getRecommendations(scores: Record<string, number>) {
  const recommendations: Record<string, string[]> = {
    'self-awareness': [
      'Keep a daily emotion journal',
      'Practice naming feelings when they arise',
      'Use emotion cards to identify different feelings'
    ],
    'self-regulation': [
      'Learn deep breathing exercises',
      'Create a calm-down corner',
      'Practice counting to ten when upset'
    ],
    'motivation': [
      'Set small, achievable goals',
      'Create a reward system for completing tasks',
      'Make a vision board of things you want to achieve'
    ],
    'empathy': [
      'Read stories about different perspectives',
      'Role-play scenarios with family members',
      'Discuss how characters in movies might feel'
    ],
    'social-skills': [
      'Practice taking turns in conversations',
      'Join group activities or clubs',
      'Play cooperative games with friends'
    ]
  };

  // Return recommendations for categories with lower scores
  const needsImprovement = Object.entries(scores)
    .filter(([_, score]) => score < 70)
    .map(([category]) => category);

  return needsImprovement.reduce((acc, category) => {
    acc[category] = recommendations[category] || [];
    return acc;
  }, {} as Record<string, string[]>);
}