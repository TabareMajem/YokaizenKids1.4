import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Mail, Copy, CheckCircle2 } from 'lucide-react';
import StudentManagementModal from './StudentManagementModal';
import { useStudentStore } from '../../hooks/useStudentStore';
import type { Student } from '../../types/teacher';

type Props = {
  searchQuery: string;
  onViewDetails?: (studentId: string) => void;
};

export default function StudentTable({ searchQuery, onViewDetails }: Props) {
  const { students, addStudent, updateStudent, removeStudent } = useStudentStore();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const grades = ['1st', '2nd', '3rd', '4th', '5th', '6th'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = !selectedGrade || student.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const handleSaveStudent = async (studentData: Partial<Student>) => {
    try {
      if (selectedStudent) {
        await updateStudent(selectedStudent.id, studentData);
      } else {
        // Generate access code
        const accessCode = generateAccessCode();
        await addStudent({
          id: Date.now().toString(),
          ...studentData,
          accessCode,
          parentInviteStatus: 'pending',
          status: 'active'
        } as Student);
      }
      setIsModalOpen(false);
      setSelectedStudent(null);
    } catch (error) {
      console.error('Failed to save student:', error);
    }
  };

  const generateAccessCode = () => {
    // Generate a 6-character alphanumeric code
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {grades.map((grade) => (
            <button
              key={grade}
              onClick={() => setSelectedGrade(selectedGrade === grade ? null : grade)}
              className={
                selectedGrade === grade 
                  ? 'px-3 py-1 rounded-full text-sm transition-colors bg-purple-100 text-purple-700'
                  : 'px-3 py-1 rounded-full text-sm transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            >
              {grade}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            setSelectedStudent(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Student
        </button>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Student
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Grade
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Access Code
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Parent Status
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <motion.tr
                key={student.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <img
                      src={student.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.id}`}
                      alt={student.name}
                      className="w-8 h-8 rounded-full bg-gray-200"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                    {student.grade}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">
                      {student.accessCode}
                    </code>
                    <button
                      onClick={() => handleCopyCode(student.accessCode)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      title="Copy code"
                    >
                      {copiedCode === student.accessCode ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={
                    student.parentInviteStatus === 'accepted'
                      ? 'px-2 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1 bg-green-100 text-green-700'
                      : 'px-2 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1 bg-yellow-100 text-yellow-700'
                  }>
                    {student.parentInviteStatus}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => {/* Send parent invite */}}
                      className="p-1 hover:bg-gray-100 rounded-lg"
                    >
                      <Mail className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedStudent(student);
                        setIsModalOpen(true);
                      }}
                      className="p-1 hover:bg-gray-100 rounded-lg"
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => removeStudent(student.id)}
                      className="p-1 hover:bg-gray-100 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Student Management Modal */}
      <StudentManagementModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedStudent(null);
        }}
        onSave={handleSaveStudent}
        student={selectedStudent}
      />
    </div>
  );
}