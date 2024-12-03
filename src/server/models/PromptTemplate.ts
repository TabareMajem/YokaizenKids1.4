import mongoose, { Schema, Document } from 'mongoose';

export interface IPromptTemplate extends Document {
  name: string;
  description: string;
  template: string;
  version: number;
  isActive: boolean;
  createdBy: Schema.Types.ObjectId;
  lastModified: Date;
  variables: string[];
}

const promptTemplateSchema = new Schema<IPromptTemplate>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  template: {
    type: String,
    required: true
  },
  version: {
    type: Number,
    default: 1
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastModified: {
    type: Date,
    default: Date.now
  },
  variables: [{
    type: String
  }]
}, {
  timestamps: true
});

// Create indexes
promptTemplateSchema.index({ name: 1 });
promptTemplateSchema.index({ isActive: 1 });

export const PromptTemplate = mongoose.model<IPromptTemplate>('PromptTemplate', promptTemplateSchema);