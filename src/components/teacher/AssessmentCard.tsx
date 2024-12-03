import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Clock, Users, Eye } from 'lucide-react';

type Props = {
  assessment: {
    title: string;
    description: string;
    estimatedTime: string;
    questions: number;
  };
  onAssign: () => void;
  onPreview: () => void;
};

export default function AssessmentCard({ assessment, onAssign, onPreview }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-purple-100 rounded-xl">
            <ClipboardList className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 mb-1">
              {assessment.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {assessment.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{assessment.estimatedTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <ClipboardList className="w-4 h-4" />
                <span>{assessment.questions} questions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 p-4 bg-gray-50 flex items-center gap-2">
        <button
          onClick={onPreview}
          className="flex-1 py-2 px-3 bg-white text-gray-600 rounded-lg
            hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Preview
        </button>
        <button
          onClick={onAssign}
          className="flex-1 py-2 px-3 bg-purple-600 text-white rounded-lg
            hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
        >
          <Users className="w-4 h-4" />
          Assign
        </button>
      </div>
    </motion.div>
  );
}