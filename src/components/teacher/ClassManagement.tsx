```typescript
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter } from 'lucide-react';
import ClassList from './ClassList';
import ClassForm from './ClassForm';
import { useClassManagement } from '../../hooks/useClassManagement';
import type { Class } from '../../types/teacher';

export default function ClassManagement() {
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);

  const { 
    createClass, 
    updateClass, 
    deleteClass,
    isLoading, 
    error 
  } = useClassManagement();

  const handleCreateClass = () => {
    setSelectedClass(null);
    setIsCreating(true);
  };

  const handleEditClass = (classData: Class) => {
    setSelectedClass(classData);
    setIsCreating(true);
  };

  const handleSaveClass = async (classData: Partial<Class>) => {
    try {
      if (selectedClass) {
        await updateClass(selectedClass.id, classData);
      } else {
        await createClass(classData);
      }
      setIsCreating(false);
      setSelectedClass(null);
    } catch (err) {
      console.error('Failed to save class:', err);
    }
  };

  const handleDeleteClass = async (classId: string) => {
    if (!window.confirm('Are you sure you want to delete this class?')) return;
    
    try {
      await deleteClass(classId);
    } catch (err) {
      console.error('Failed to delete class:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Classes</h2>
          <p className="text-gray-600">Manage your classes and students</p>
        </div>
        <button
          onClick={handleCreateClass}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg
            hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Class
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {isCreating ? (
        <ClassForm
          initialData={selectedClass}
          onSubmit={handleSaveClass}
          onCancel={() => {
            setIsCreating(false);
            setSelectedClass(null);
          }}
        />
      ) : (
        <>
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 
                text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search classes..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200
                  focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              {['1st', '2nd', '3rd', '4th', '5th', '6th'].map((grade) => (
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

          {/* Class List */}
          <ClassList
            onEdit={handleEditClass}
            onDelete={handleDeleteClass}
            searchQuery={searchQuery}
            selectedGrade={selectedGrade}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
}
```