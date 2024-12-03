```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Edit, Trash2, MoreVertical, Calendar } from 'lucide-react';
import type { Class } from '../../types/teacher';

type Props = {
  onEdit: (classData: Class) => void;
  onDelete: (classId: string) => void;
  searchQuery: string;
  selectedGrade: string | null;
  isLoading: boolean;
};

// Mock data - in a real app, this would come from your API
const mockClasses: Class[] = [
  {
    id: '1',
    name: 'Class 3-A',
    grade: '3rd',
    academicYear: '2024',
    teacherId: 'teacher-1',
    students: [],
    schedule: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Class 4-B',
    grade: '4th',
    academicYear: '2024',
    teacherId: 'teacher-1',
    students: [],
    schedule: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export default function ClassList({ 
  onEdit, 
  onDelete, 
  searchQuery, 
  selectedGrade,
  isLoading 
}: Props) {
  const filteredClasses = mockClasses.filter(classData => {
    const matchesSearch = classData.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = !selectedGrade || classData.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent 
          rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {filteredClasses.map((classData) => (
        <motion.div
          key={classData.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {classData.name}
                  </h3>
                  <p className="text-gray-600">
                    {classData.grade} Grade • {classData.academicYear}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEdit(classData)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Edit className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => onDelete(classData.id)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-1">Students</h4>
                <p className="text-2xl font-bold text-purple-600">
                  {classData.students.length}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-1">Activities</h4>
                <p className="text-2xl font-bold text-purple-600">
                  {classData.schedule.length}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-1">Next Activity</h4>
                <div className="flex items-center gap-2 text-purple-600">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">
                    {classData.schedule[0]?.startTime 
                      ? new Date(classData.schedule[0].startTime).toLocaleDateString()
                      : 'No upcoming'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {filteredClasses.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Classes Found
          </h3>
          <p className="text-gray-600">
            {searchQuery || selectedGrade
              ? "No classes match your search criteria"
              : "Get started by creating your first class"
            }
          </p>
        </div>
      )}
    </div>
  );
}
```