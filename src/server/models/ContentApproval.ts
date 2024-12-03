import mongoose, { Schema, Document } from 'mongoose';

export interface IContentApproval extends Document {
  contentId: Schema.Types.ObjectId;
  version: number;
  status: 'pending' | 'approved' | 'rejected';
  reviewerId?: Schema.Types.ObjectId;
  comments?: string;
  createdAt: Date;
  updatedAt: Date;
}

const contentApprovalSchema = new Schema<IContentApproval>({
  contentId: {
    type: Schema.Types.ObjectId,
    ref: 'Content',
    required: true
  },
  version: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  reviewerId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: String
}, {
  timestamps: true
});

// Indexes
contentApprovalSchema.index({ contentId: 1, version: 1 }, { unique: true });
contentApprovalSchema.index({ status: 1 });
contentApprovalSchema.index({ reviewerId: 1 });

export const ContentApproval = mongoose.model<IContentApproval>('ContentApproval', contentApprovalSchema);