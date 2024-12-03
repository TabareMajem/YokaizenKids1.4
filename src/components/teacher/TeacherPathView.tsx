import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, ChevronDown, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import TeacherPathNode from './TeacherPathNode';
import MilestoneDetailsModal from './MilestoneDetailsModal';
import AssignMilestoneModal from './AssignMilestoneModal';
import type { TeacherMilestone } from './types';

const milestones: TeacherMilestone[] = [
  {
    id: 1,
    title: 'Understanding Emotions',
    description: 'Learn to identify and name different emotions through fun activities and stories.',
    theme: 'star',
    position: { x: 50, y: 80 },
    studentProgress: {
      completed: 15,
      inProgress: 3,
      notStarted: 2
    }
  },
  {
    id: 2,
    title: 'Express Yourself',
    description: 'Create your own emotion journal and discover creative ways to share your feelings.',
    theme: 'cloud',
    position: { x: 25, y: 60 },
    studentProgress: {
      completed: 8,
      inProgress: 7,
      notStarted: 5
    }
  },
  {
    id: 3,
    title: 'Empathy Explorer',
    description: 'Step into others\' shoes and learn how to understand and support their feelings.',
    theme: 'island',
    position: { x: 75, y: 40 },
    studentProgress: {
      completed: 3,
      inProgress: 10,
      notStarted: 7
    }
  },
  {
    id: 4,
    title: 'Emotion Detective',
    description: 'Become an expert at spotting emotions in stories and real-life situations.',
    theme: 'star',
    position: { x: 40, y: 20 },
    studentProgress: {
      completed: 0,
      inProgress: 5,
      notStarted: 15
    }
  }
];

export default function TeacherPathView() {
  const [selectedMilestone, setSelectedMilestone] = useState<TeacherMilestone | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const totalStudents = 20; // This would come from your actual data

  const getClassProgress = () => {
    const totalMilestones = milestones.length * totalStudents;
    const completedMilestones = milestones.reduce(
      (sum, milestone) => sum + milestone.studentProgress.completed,
      0
    );
    return (completedMilestones / totalMilestones) * 100;
  };

  const getStatusSummary = () => {
    const atRisk = milestones.filter(m => 
      (m.studentProgress.completed / totalStudents) < 0.3
    ).length;
    
    const onTrack = milestones.filter(m => 
      (m.studentProgress.completed / totalStudents) >= 0.7
    ).length;

    return { atRisk, onTrack };
  };

  const { atRisk, onTrack } = getStatusSummary();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-100 via-blue-100 to-pink-100 overflow-hidden">
      {/* Header Stats */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Class Learning Path
              </h1>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-4 h-4" />
                <span>{totalStudents} Students</span>
              </div>
            </div>

            <button
              onClick={() => setShowAssignModal(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg
                hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              Assign Milestone
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Stats */}
          <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Overall Progress</span>
                <span className="text-lg font-semibold text-purple-600">
                  {getClassProgress().toFixed(1)}%
                </span>
              </div>
              <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${getClassProgress()}%` }}
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-800">
                    {atRisk} Milestones
                  </div>
                  <div className="text-sm text-gray-600">
                    Need attention
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-800">
                    {onTrack} Milestones
                  </div>
                  <div className="text-sm text-gray-600">
                    On track
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Path Container */}
      <div className="relative max-w-6xl mx-auto px-4 py-8">
        {/* Path SVG */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <motion.path
            d="M 50 80 C 30 70, 20 50, 25 60 S 60 50, 75 40 S 50 30, 40 20"
            fill="none"
            stroke="url(#pathGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#e879f9" />
            </linearGradient>
          </defs>
        </svg>

        {/* Milestones */}
        <div className="relative">
          {milestones.map((milestone) => (
            <TeacherPathNode
              key={milestone.id}
              milestone={milestone}
              totalStudents={totalStudents}
              onSelect={() => setSelectedMilestone(milestone)}
            />
          ))}
        </div>
      </div>

      {/* Modals */}
      <MilestoneDetailsModal
        milestone={selectedMilestone}
        isOpen={!!selectedMilestone}
        onClose={() => setSelectedMilestone(null)}
      />

      <AssignMilestoneModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        milestones={milestones}
      />
    </div>
  );
}