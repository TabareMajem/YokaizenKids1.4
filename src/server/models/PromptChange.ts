import mongoose, { Schema, Document } from 'mongoose';

export interface IPromptChange extends Document {
  templateId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  oldVersion: number;
  newVersion: number;
  changes: {
    field: string;
    oldValue: string;
    newValue: string;
  }[];
  timestamp: Date;
}

const promptChangeSchema = new Schema<IPromptChange>({
  templateId: {
    type: Schema.Types.ObjectId,
    ref: 'PromptTemplate',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  oldVersion: {
    type: Number,
    required: true
  },
  newVersion: {
    type: Number,
    required: true
  },
  changes: [{
    field: String,
    oldValue: String,
    newValue: String
  }],
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Create indexes
promptChangeSchema.index({ templateId: 1 });
promptChangeSchema.index({ userId: 1 });
promptChangeSchema.index({ timestamp: -1 });

export const PromptChange = mongoose.model<IPromptChange>('PromptChange', promptChangeSchema);