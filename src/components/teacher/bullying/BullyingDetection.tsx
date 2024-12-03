import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import StudentList from './StudentList';
import StudentDetailsModal from './StudentDetailsModal';
import type { Student } from '../../../types/teacher';

export default function BullyingDetection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Mock student data - in a real app, this would come from an API
  const students: Student[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      grade: '5th',
      scores: {
        victim: 75,
        bystander: 45,
        perpetrator: 20
      },
      lastAssessment: '2024-03-15'
    },
    {
      id: '2',
      name: 'Michael Chen',
      grade: '5th',
      scores: {
        victim: 30,
        bystander: 80,
        perpetrator: 15
      },
      lastAssessment: '2024-03-14'
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = !selectedGrade || student.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Bullying Detection</h2>
        <p className="text-gray-600">Monitor and support students' social dynamics</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 
            text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search students..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          {['5th', '6th'].map((grade) => (
            <button
              key={grade}
              onClick={() => setSelectedGrade(selectedGrade === grade ? null : grade)}
              className={`px-3 py-1 rounded-full text-sm transition-colors
                ${selectedGrade === grade
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {grade}
            </button>
          ))}
        </div>
      </div>

      {/* Student List */}
      <StudentList
        students={filteredStudents}
        onSelectStudent={setSelectedStudent}
      />

      {/* Student Details Modal */}
      <StudentDetailsModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
    </div>
  );
}