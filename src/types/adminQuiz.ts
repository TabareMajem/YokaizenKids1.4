export type QuizQuestionType = 'text_only' | 'text_and_image';

export type EIComponent = 'self-awareness' | 'self-regulation' | 'motivation' | 'empathy' | 'social-skills';

export type QuizQuestionDraft = {
  text: string;
  type: QuizQuestionType;
  image?: File | string;
  answers: {
    text: string;
    image?: File | string;
    score: number;
    category: EIComponent;
    isCorrect: boolean;
  }[];
  category: EIComponent;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  language: 'en' | 'ja' | 'es';
  status: 'draft' | 'published' | 'archived';
};

export type QuizQuestionAdmin = QuizQuestionDraft & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
};