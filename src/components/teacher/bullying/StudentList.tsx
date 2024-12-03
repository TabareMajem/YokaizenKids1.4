import React from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import RiskIndicator from './RiskIndicator';
import type { Student } from '../../../types/teacher';

type Props = {
  students: Student[];
  onSelectStudent: (student: Student) => void;
};

export default function StudentList({ students, onSelectStudent }: Props) {
  return (
    <div className="grid gap-6">
      {students.map((student) => (
        <motion.div
          key={student.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{student.name}</h3>
                <p className="text-gray-600">{student.grade} Grade</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectStudent(student)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Eye className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {student.scores && (
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(student.scores).map(([category, score]) => (
                  <RiskIndicator
                    key={category}
                    category={category}
                    score={score}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}