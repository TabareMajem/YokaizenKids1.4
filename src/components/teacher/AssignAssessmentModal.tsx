import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Users, 
  Calendar,
  Clock,
  MessageSquare,
  ChevronRight
} from 'lucide-react';

type Props = {
  assessment: {
    title: string;
    description: string;
  };
  isOpen: boolean;
  onClose: () => void;
};

export default function AssignAssessmentModal({ assessment, isOpen, onClose }: Props) {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState('');
  const [instructions, setInstructions] = useState('');
  const [frequency, setFrequency] = useState<'once' | 'weekly' | 'monthly'>('once');

  const handleAssign = () => {
    // Handle assignment logic
    console.log('Assigning assessment:', {
      assessment,
      selectedStudents,
      dueDate,
      instructions,
      frequency
    });
    onClose();
  };

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
            className="w-full max-w-2xl bg-white rounded-2xl shadow-xl 
              overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Assign Assessment
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {assessment.title}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Student Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Students
                </label>
                <button
                  onClick={() => setSelectedStudents(['all'])}
                  className="w-full px-4 py-2 bg-purple-50 text-purple-700 
                    rounded-lg hover:bg-purple-100 transition-colors 
                    flex items-center gap-2"
                >
                  <Users className="w-5 h-5" />
                  Assign to Entire Class
                </button>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 
                    w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 
                      focus:border-purple-400 focus:ring focus:ring-purple-200 
                      focus:ring-opacity-50"
                  />
                </div>
              </div>

              {/* Frequency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frequency
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'once', label: 'One Time' },
                    { value: 'weekly', label: 'Weekly' },
                    { value: 'monthly', label: 'Monthly' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFrequency(option.value as typeof frequency)}
                      className={`py-2 px-4 rounded-lg transition-colors
                        ${frequency === option.value
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Instructions (Optional)
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="Add any specific instructions for students..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 
                      focus:border-purple-400 focus:ring focus:ring-purple-200 
                      focus:ring-opacity-50 resize-none"
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 
                    rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssign}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg
                    hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  Confirm Assignment
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}