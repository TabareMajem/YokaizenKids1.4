import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Search,
  Download
} from 'lucide-react';
import type { TeacherMilestone, Student } from './types';

// Mock student data - in a real app, this would come from your backend
const mockStudents: Student[] = Array.from({ length: 20 }, (_, i) => ({
  id: `student-${i + 1}`,
  name: `Student ${i + 1}`,
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
  progress: {
    status: i < 15 
      ? 'completed'
      : i < 18 
        ? 'in_progress' 
        : 'not_started',
    startedAt: i < 18 ? '2024-03-01' : undefined,
    completedAt: i < 15 ? '2024-03-05' : undefined
  }
}));

type Props = {
  milestone: TeacherMilestone | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function MilestoneDetailsModal({ milestone, isOpen, onClose }: Props) {
  if (!milestone) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-red-100 text-red-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'in_progress':
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
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
            className="w-full max-w-4xl bg-white rounded-2xl shadow-xl 
              overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {milestone.title}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {milestone.description}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Summary */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-medium">Completed</span>
                  </div>
                  <p className="text-2xl font-bold text-green-700 mt-1">
                    {milestone.studentProgress.completed}
                  </p>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-yellow-700">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">In Progress</span>
                  </div>
                  <p className="text-2xl font-bold text-yellow-700 mt-1">
                    {milestone.studentProgress.inProgress}
                  </p>
                </div>

                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-red-700">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">Not Started</span>
                  </div>
                  <p className="text-2xl font-bold text-red-700 mt-1">
                    {milestone.studentProgress.notStarted}
                  </p>
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-4">
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
                <button
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg
                    hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Export
                </button>
              </div>
            </div>

            {/* Student List */}
            <div className="flex-1 overflow-y-auto">
              <div className="divide-y divide-gray-200">
                {mockStudents.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-10 h-10 rounded-full bg-gray-200"
                      />
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {student.name}
                        </h3>
                        {student.progress.startedAt && (
                          <p className="text-sm text-gray-500">
                            Started: {new Date(student.progress.startedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className={`px-3 py-1 rounded-full flex items-center gap-1
                      ${getStatusColor(student.progress.status)}`}
                    >
                      {getStatusIcon(student.progress.status)}
                      <span className="text-sm capitalize">
                        {student.progress.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}