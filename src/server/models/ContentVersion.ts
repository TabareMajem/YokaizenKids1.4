import mongoose, { Schema, Document } from 'mongoose';

export interface IContentVersion extends Document {
  contentId: Schema.Types.ObjectId;
  version: number;
  changes: string;
  content: string;
  createdBy: Schema.Types.ObjectId;
  createdAt: Date;
}

const contentVersionSchema = new Schema<IContentVersion>({
  contentId: {
    type: Schema.Types.ObjectId,
    ref: 'Content',
    required: true
  },
  version: {
    type: Number,
    required: true
  },
  changes: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Indexes
contentVersionSchema.index({ contentId: 1, version: -1 });
contentVersionSchema.index({ createdBy: 1 });

export const ContentVersion = mongoose.model<IContentVersion>('ContentVersion', contentVersionSchema);