import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Search, 
  Users, 
  CheckCircle2,
  ChevronRight,
  Calendar
} from 'lucide-react';
import type { TeacherMilestone } from './types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  milestones: TeacherMilestone[];
};

export default function AssignMilestoneModal({ isOpen, onClose, milestones }: Props) {
  const [selectedMilestone, setSelectedMilestone] = useState<TeacherMilestone | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const handleAssign = () => {
    // Handle milestone assignment
    console.log('Assigning milestone:', selectedMilestone?.id);
    console.log('To students:', selectedStudents);
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
                <h2 className="text-2xl font-bold text-gray-800">
                  Assign Milestone
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
              {/* Milestone Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Milestone
                </label>
                <div className="space-y-2">
                  {milestones.map((milestone) => (
                    <button
                      key={milestone.id}
                      onClick={() => setSelectedMilestone(milestone)}
                      className={`w-full p-4 rounded-lg border-2 text-left
                        transition-colors ${selectedMilestone?.id === milestone.id
                          ? 'border-purple-400 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-200'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {milestone.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {milestone.description}
                          </p>
                        </div>
                        {selectedMilestone?.id === milestone.id && (
                          <CheckCircle2 className="w-5 h-5 text-purple-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Student Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Students
                </label>
                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={() => setSelectedStudents(['all'])}
                    className={`px-4 py-2 rounded-lg border transition-colors
                      flex items-center gap-2 ${selectedStudents.includes('all')
                        ? 'border-purple-400 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-purple-200'
                      }`}
                  >
                    <Users className="w-5 h-5" />
                    Entire Class
                  </button>
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 
                      w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search students..."
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 
                        focus:border-purple-400 focus:ring focus:ring-purple-200 
                        focus:ring-opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* Due Date */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date (Optional)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 
                    w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 
                      focus:border-purple-400 focus:ring focus:ring-purple-200 
                      focus:ring-opacity-50"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 
                    rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssign}
                  disabled={!selectedMilestone || selectedStudents.length === 0}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg
                    hover:bg-purple-700 transition-colors disabled:bg-gray-300
                    disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Assign Milestone
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