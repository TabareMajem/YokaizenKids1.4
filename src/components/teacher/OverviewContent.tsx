import React from 'react';
import { motion } from 'framer-motion';
import { Users, Star, Book, Brain, AlertCircle } from 'lucide-react';
import { useStudentStore } from '../../hooks/useStudentStore';

export default function OverviewContent() {
  const students = useStudentStore((state) => state.students);

  // Calculate stats
  const stats = {
    totalStudents: students.length,
    activeToday: students.filter(s => s.status === 'active').length,
    averageProgress: Math.round(
      students.reduce((sum, s) => sum + (s.progress?.completedActivities || 0), 0) / 
      students.length || 0
    ),
    needAttention: students.filter(s => 
      (s.scores?.victim || 0) >= 70 || 
      (s.scores?.perpetrator || 0) >= 70
    ).length,
    unlinkedParents: students.filter(s => 
      s.parentInviteStatus !== 'accepted'
    ).length,
    pendingActivities: 7
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Total Students</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            {stats.activeToday} active today
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Star className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Average Progress</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.averageProgress}%</p>
            </div>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full">
            <div 
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${stats.averageProgress}%` }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Need Attention</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.needAttention}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            {stats.unlinkedParents} unlinked parents
          </p>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <button className="w-full py-2 px-4 bg-purple-50 text-purple-700 
              rounded-lg hover:bg-purple-100 transition-colors flex items-center gap-2">
              <Users className="w-5 h-5" />
              Send Parent Invites ({stats.unlinkedParents})
            </button>
            <button className="w-full py-2 px-4 bg-purple-50 text-purple-700 
              rounded-lg hover:bg-purple-100 transition-colors flex items-center gap-2">
              <Book className="w-5 h-5" />
              Schedule New Activity
            </button>
            <button className="w-full py-2 px-4 bg-purple-50 text-purple-700 
              rounded-lg hover:bg-purple-100 transition-colors flex items-center gap-2">
              <Brain className="w-5 h-5" />
              View Assessment Results
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {students.slice(0, 3).map((student) => (
              <div key={student.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Star className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{student.name}</p>
                  <p className="text-sm text-gray-500">
                    {student.lastAssessment 
                      ? `Completed assessment on ${new Date(student.lastAssessment).toLocaleDateString()}`
                      : 'No recent activity'
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}