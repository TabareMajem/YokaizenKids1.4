import mongoose, { Schema, Document } from 'mongoose';
import type { Content } from '../../types/content';

export interface IContent extends Content, Document {}

const contentSchema = new Schema<IContent>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['activity', 'prompt', 'lesson'],
    required: true
  },
  category: {
    type: String,
    enum: ['emotional-awareness', 'social-skills', 'mindfulness', 'self-expression'],
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'pending', 'published', 'archived'],
    default: 'draft'
  },
  content: {
    type: String,
    required: true
  },
  metadata: {
    ageRange: [Number],
    duration: Number,
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced']
    },
    skills: [String],
    language: String,
    seoTitle: String,
    seoDescription: String,
    keywords: [String]
  },
  version: {
    type: Number,
    default: 1
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  publishedAt: Date
}, {
  timestamps: true
});

// Indexes
contentSchema.index({ title: 'text', description: 'text' });
contentSchema.index({ type: 1, category: 1, status: 1 });
contentSchema.index({ createdBy: 1 });
contentSchema.index({ updatedAt: -1 });

export const Content = mongoose.model<IContent>('Content', contentSchema);