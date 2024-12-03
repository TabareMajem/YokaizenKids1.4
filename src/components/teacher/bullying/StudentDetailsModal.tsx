import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useBullyingAssessment } from '../../../hooks/useBullyingAssessment';
import type { Student } from '../../../types/teacher';
import type { BullyingScores } from '../../../hooks/useBullyingAssessment';

type Props = {
  student: Student | null;
  onClose: () => void;
};

export default function StudentDetailsModal({ student, onClose }: Props) {
  const { getRecommendations } = useBullyingAssessment();

  if (!student) return null;

  const getRiskLevel = (score: number) => {
    if (score >= 70) return { level: 'High', color: 'text-red-600 bg-red-100' };
    if (score >= 40) return { level: 'Moderate', color: 'text-yellow-600 bg-yellow-100' };
    return { level: 'Low', color: 'text-green-600 bg-green-100' };
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
      flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] 
          overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              {student.name}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {student.scores && (
            <>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Risk Assessment
              </h3>
              <div className="space-y-6">
                {Object.entries(student.scores).map(([category, score]) => {
                  const { level, color } = getRiskLevel(score);
                  const recommendations = getRecommendations({ 
                    [category]: score 
                  } as BullyingScores)[category] || [];

                  return (
                    <div key={category} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800 capitalize">
                            {category}
                          </h4>
                          <span className={`text-sm ${color}`}>
                            {level} Risk
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {score}%
                        </div>
                      </div>

                      {recommendations.length > 0 && (
                        <div className="bg-purple-50 rounded-lg p-4">
                          <h5 className="font-medium text-purple-900 mb-2">
                            Recommendations
                          </h5>
                          <ul className="space-y-2">
                            {recommendations.map((rec, index) => (
                              <li key={index} className="text-purple-800 text-sm">
                                • {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}