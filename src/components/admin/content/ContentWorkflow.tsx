import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  User,
  MessageSquare,
  ArrowRight
} from 'lucide-react';

type WorkflowStatus = 'draft' | 'review' | 'approved' | 'rejected';

type Props = {
  status: WorkflowStatus;
  reviewers: Array<{
    id: string;
    name: string;
    avatar: string;
  }>;
  comments: Array<{
    id: string;
    user: {
      name: string;
      avatar: string;
    };
    text: string;
    createdAt: Date;
  }>;
  onSubmitForReview: () => void;
  onApprove: () => void;
  onReject: (reason: string) => void;
  onAddComment: (text: string) => void;
};

export default function ContentWorkflow({
  status,
  reviewers,
  comments,
  onSubmitForReview,
  onApprove,
  onReject,
  onAddComment
}: Props) {
  const [newComment, setNewComment] = React.useState('');

  const getStatusIcon = () => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'review':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      case 'review':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor()}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        {status === 'draft' && (
          <button
            onClick={onSubmitForReview}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg
              hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            Submit for Review
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Reviewers */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Reviewers</h4>
        <div className="flex -space-x-2">
          {reviewers.map((reviewer) => (
            <img
              key={reviewer.id}
              src={reviewer.avatar}
              alt={reviewer.name}
              className="w-8 h-8 rounded-full border-2 border-white"
              title={reviewer.name}
            />
          ))}
        </div>
      </div>

      {/* Comments */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Comments</h4>
        <div className="space-y-4 mb-4">
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <img
                src={comment.user.avatar}
                alt={comment.user.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="font-medium text-gray-800 text-sm">
                    {comment.user.name}
                  </p>
                  <p className="text-gray-600">{comment.text}</p>
                </div>
                <span className="text-xs text-gray-500 mt-1 block">
                  {comment.createdAt.toLocaleString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Comment */}
        <div className="flex gap-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400
              resize-none"
            rows={2}
          />
          <button
            onClick={() => {
              if (newComment.trim()) {
                onAddComment(newComment);
                setNewComment('');
              }
            }}
            disabled={!newComment.trim()}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg
              hover:bg-purple-700 transition-colors disabled:opacity-50
              disabled:cursor-not-allowed h-fit"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}