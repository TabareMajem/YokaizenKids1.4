import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, List, Package, Brain, Heart, Upload } from 'lucide-react';
import type { ParentActivity } from '../../hooks/useParentRecommendations';

type Props = {
  activity: ParentActivity | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function ActivityDetailsModal({ activity, isOpen, onClose }: Props) {
  if (!activity) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
            flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                  {activity.title}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Activity Info */}
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{activity.duration}</span>
                </div>
                <div className="flex gap-2">
                  {activity.emotionalFocus.map((focus) => (
                    <span
                      key={focus}
                      className="px-2 py-1 bg-purple-50 text-purple-600 
                        rounded-full text-sm flex items-center gap-1"
                    >
                      <Brain className="w-4 h-4" />
                      {focus.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </span>
                  ))}
                  {activity.personalityTraits?.map((trait) => (
                    <span
                      key={trait}
                      className="px-2 py-1 bg-pink-50 text-pink-600 
                        rounded-full text-sm flex items-center gap-1"
                    >
                      <Heart className="w-4 h-4" />
                      {trait.charAt(0).toUpperCase() + trait.slice(1)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6">
                {activity.description}
              </p>

              {/* Materials */}
              {activity.materials && activity.materials.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 
                    flex items-center gap-2">
                    <Package className="w-5 h-5 text-purple-500" />
                    Materials Needed
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {activity.materials.map((material, index) => (
                      <li key={index}>{material}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Steps */}
              {activity.steps && activity.steps.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 
                    flex items-center gap-2">
                    <List className="w-5 h-5 text-purple-500" />
                    Instructions
                  </h3>
                  <ol className="space-y-6">
                    {activity.steps.map((step, index) => (
                      <li key={index} className="flex gap-4">
                        <span className="flex-shrink-0 w-6 h-6 bg-purple-100 
                          rounded-full flex items-center justify-center 
                          text-purple-600 font-medium mt-1">
                          {index + 1}
                        </span>
                        <div className="flex-1 space-y-3">
                          <p className="text-gray-600">{step.text}</p>
                          {step.image && (
                            <div className="relative rounded-lg overflow-hidden">
                              <img
                                src={step.image.url}
                                alt={step.image.alt}
                                className="w-full object-cover rounded-lg"
                                style={{
                                  maxHeight: '200px',
                                  width: step.image.width || 'auto',
                                  height: step.image.height || 'auto'
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <button
                onClick={onClose}
                className="w-full py-3 bg-purple-600 text-white rounded-lg
                  hover:bg-purple-700 transition-colors font-medium"
              >
                Got It
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}