import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle, MessageCircle } from 'lucide-react';
import type { Content } from '../../../types/content';

type Props = {
  pendingApprovals: Array<{
    content: Content;
    submittedAt: Date;
    submittedBy: {
      name: string;
      email: string;
    };
  }>;
  onApprove: (contentId: string) => void;
  onReject: (contentId: string, reason: string) => void;
  onPreview: (content: Content) => void;
};

export default function ApprovalQueue({ 
  pendingApprovals,
  onApprove,
  onReject,
  onPreview
}: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Content Approval Queue
      </h2>

      {pendingApprovals.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No content waiting for approval</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingApprovals.map(({ content, submittedAt, submittedBy }) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {content.title}
                    </h3>
                    <p className="text-gray-600">{content.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>
                      Submitted {new Date(submittedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Submitted by: {submittedBy.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onPreview(content)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 
                        rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                    <button
                      onClick={() => onApprove(content.id)}
                      className="px-3 py-1 text-green-600 hover:bg-green-50 
                        rounded-lg transition-colors flex items-center gap-1"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        const reason = prompt('Please provide a reason for rejection:');
                        if (reason) {
                          onReject(content.id, reason);
                        }
                      }}
                      className="px-3 py-1 text-red-600 hover:bg-red-50 
                        rounded-lg transition-colors flex items-center gap-1"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}