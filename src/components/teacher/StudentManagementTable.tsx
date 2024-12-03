import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Edit, 
  Trash2, 
  Download, 
  Search,
  Filter,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  Users
} from 'lucide-react';
import StudentManagementModal from './StudentManagementModal';
import ParentEmailModal from './ParentEmailModal';
import BulkEmailModal from './BulkEmailModal';
import type { Student } from '../../types/teacher';

type Props = {
  students: Student[];
  onAddStudent: (studentData: Partial<Student>) => Promise<void>;
  onEditStudent: (studentId: string, studentData: Partial<Student>) => Promise<void>;
  onDeleteStudent: (studentId: string) => Promise<void>;
  onSendParentEmail: (studentId: string, emailData: any) => Promise<void>;
  isLoading?: boolean;
};

export default function StudentManagementTable({
  students,
  onAddStudent,
  onEditStudent,
  onDeleteStudent,
  onSendParentEmail,
  isLoading
}: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isManagementModalOpen, setIsManagementModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isBulkEmailModalOpen, setIsBulkEmailModalOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);

  const grades = ['1st', '2nd', '3rd', '4th', '5th', '6th'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = !selectedGrade || student.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const handleBulkEmailClick = () => {
    if (selectedStudents.length > 0) {
      setIsBulkEmailModalOpen(true);
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedStudents(filteredStudents);
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (student: Student, isSelected: boolean) => {
    if (isSelected) {
      setSelectedStudents(prev => [...prev, student]);
    } else {
      setSelectedStudents(prev => prev.filter(s => s.id !== student.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
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
            {grades.map((grade) => (
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
        <div className="flex items-center gap-2">
          <button
            onClick={handleBulkEmailClick}
            disabled={selectedStudents.length === 0}
            className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg
              hover:bg-purple-200 transition-colors disabled:opacity-50
              disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Mail className="w-5 h-5" />
            Email Selected
          </button>
          <button
            onClick={() => {
              setSelectedStudent(null);
              setIsManagementModalOpen(true);
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg
              hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Student
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Download className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3">
                <input
                  type="checkbox"
                  checked={selectedStudents.length === filteredStudents.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-purple-600 
                    focus:ring-purple-200"
                />
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Student
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Grade
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Parent Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Access Code
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  Loading students...
                </td>
              </tr>
            ) : filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No students found
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedStudents.some(s => s.id === student.id)}
                      onChange={(e) => handleSelectStudent(student, e.target.checked)}
                      className="rounded border-gray-300 text-purple-600 
                        focus:ring-purple-200"
                    />
                  </td>
                  <td className="px-6 py-4">
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
                    <span className="px-2 py-1 text-xs font-medium rounded-full
                      bg-purple-100 text-purple-700">
                      {student.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {student.parentInviteStatus === 'accepted' ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : student.parentInviteStatus === 'pending' ? (
                        <Clock className="w-4 h-4 text-yellow-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className="text-sm capitalize">
                        {student.parentInviteStatus.replace('_', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">
                    {student.accessCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedStudent(student);
                          setIsEmailModalOpen(true);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Email parent"
                      >
                        <Mail className="w-5 h-5 text-gray-600" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedStudent(student);
                          setIsManagementModalOpen(true);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit student"
                      >
                        <Edit className="w-5 h-5 text-gray-600" />
                      </button>
                      <button
                        onClick={() => onDeleteStudent(student.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Delete student"
                      >
                        <Trash2 className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <StudentManagementModal
        isOpen={isManagementModalOpen}
        onClose={() => {
          setIsManagementModalOpen(false);
          setSelectedStudent(null);
        }}
        onSave={async (data) => {
          if (selectedStudent) {
            await onEditStudent(selectedStudent.id, data);
          } else {
            await onAddStudent(data);
          }
          setIsManagementModalOpen(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
      />

      {selectedStudent && (
        <ParentEmailModal
          isOpen={isEmailModalOpen}
          onClose={() => {
            setIsEmailModalOpen(false);
            setSelectedStudent(null);
          }}
          studentName={selectedStudent.name}
          studentId={selectedStudent.id}
          parentEmail={selectedStudent.parentEmail || ''}
        />
      )}

      <BulkEmailModal
        isOpen={isBulkEmailModalOpen}
        onClose={() => setIsBulkEmailModalOpen(false)}
        selectedStudents={selectedStudents}
      />
    </div>
  );
}