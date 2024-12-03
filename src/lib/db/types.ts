import { type ObjectId } from 'mongodb';

export type UserRole = 'student' | 'teacher' | 'parent';

export interface User {
  _id: ObjectId;
  role: UserRole;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  // Role-specific fields
  classId?: ObjectId; // For students
  teacherId?: ObjectId; // For students
  parentId?: ObjectId; // For students
  studentIds?: ObjectId[]; // For parents and teachers
  classIds?: ObjectId[]; // For teachers
}

export interface Journal {
  _id: ObjectId;
  userId: ObjectId;
  text: string;
  mood: {
    value: number; // -1 to 1
    dominantEmotion: string;
    confidence: number;
  };
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MangaPanel {
  imageUrl: string;
  description: string;
  emotion: string;
  dialogues: string[];
}

export interface Manga {
  _id: ObjectId;
  userId: ObjectId;
  journalId: ObjectId;
  title: string;
  theme: string;
  emotionalJourney: string;
  panels: MangaPanel[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Analytics {
  _id: ObjectId;
  userId: ObjectId;
  classId?: ObjectId;
  type: 'user' | 'class';
  period: {
    start: Date;
    end: Date;
  };
  metrics: {
    journalCount: number;
    averageMood: number;
    dominantEmotions: string[];
    engagementScore: number;
    improvementRate: number;
  };
  createdAt: Date;
  updatedAt: Date;
}