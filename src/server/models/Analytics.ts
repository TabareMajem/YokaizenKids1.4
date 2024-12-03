import mongoose, { Schema, Document } from 'mongoose';

export interface IAnalytics extends Document {
  userId: Schema.Types.ObjectId;
  classId?: Schema.Types.ObjectId;
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

const analyticsSchema = new Schema<IAnalytics>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  classId: {
    type: Schema.Types.ObjectId,
    ref: 'Class'
  },
  type: {
    type: String,
    enum: ['user', 'class'],
    required: true
  },
  period: {
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
    }
  },
  metrics: {
    journalCount: Number,
    averageMood: Number,
    dominantEmotions: [String],
    engagementScore: Number,
    improvementRate: Number
  }
}, {
  timestamps: true
});

// Indexes
analyticsSchema.index({ userId: 1, 'period.start': -1 });
analyticsSchema.index({ classId: 1, 'period.start': -1 });
analyticsSchema.index({ type: 1 });

export const Analytics = mongoose.model<IAnalytics>('Analytics', analyticsSchema);