import mongoose, { Schema, Document } from 'mongoose';

export interface IJournal extends Document {
  userId: Schema.Types.ObjectId;
  text: string;
  mood: {
    value: number;
    dominantEmotion: string;
    confidence: number;
  };
  tags: string[];
  aiAnalysis?: {
    emotions: Array<{
      name: string;
      intensity: number;
      confidence: number;
    }>;
    themes: string[];
    suggestions: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const journalSchema = new Schema<IJournal>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  mood: {
    value: {
      type: Number,
      required: true,
      min: -1,
      max: 1
    },
    dominantEmotion: {
      type: String,
      required: true
    },
    confidence: {
      type: Number,
      required: true,
      min: 0,
      max: 1
    }
  },
  tags: [String],
  aiAnalysis: {
    emotions: [{
      name: String,
      intensity: Number,
      confidence: Number
    }],
    themes: [String],
    suggestions: [String]
  }
}, {
  timestamps: true
});

// Index for efficient queries
journalSchema.index({ userId: 1, createdAt: -1 });
journalSchema.index({ 'mood.dominantEmotion': 1 });
journalSchema.index({ tags: 1 });

export const Journal = mongoose.model<IJournal>('Journal', journalSchema);