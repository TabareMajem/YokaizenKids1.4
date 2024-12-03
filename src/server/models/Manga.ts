import mongoose, { Schema, Document } from 'mongoose';

export interface IManga extends Document {
  userId: Schema.Types.ObjectId;
  journalId: Schema.Types.ObjectId;
  title: string;
  theme: string;
  emotionalJourney: string;
  panels: Array<{
    imageUrl: string;
    description: string;
    emotion: string;
    dialogues: string[];
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const mangaSchema = new Schema<IManga>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  journalId: {
    type: Schema.Types.ObjectId,
    ref: 'Journal',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  theme: String,
  emotionalJourney: String,
  panels: [{
    imageUrl: {
      type: String,
      required: true
    },
    description: String,
    emotion: String,
    dialogues: [String]
  }]
}, {
  timestamps: true
});

// Indexes
mangaSchema.index({ userId: 1, createdAt: -1 });
mangaSchema.index({ journalId: 1 });

export const Manga = mongoose.model<IManga>('Manga', mangaSchema);