import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter } from 'lucide-react';
import PathList from '../../components/admin/path/PathList';
import PathEditor from '../../components/admin/path/PathEditor';
import { useThematicPaths } from '../../hooks/useThematicPaths';
import type { ThematicPath } from '../../types/thematicPath';
import AdminLayout from '../../components/admin/AdminLayout';

export default function ThematicPathManagement() {
  const [paths, setPaths] = useState<ThematicPath[]>([]);
  const [selectedPath, setSelectedPath] = useState<ThematicPath | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);

  const { 
    getPaths, 
    createPath, 
    updatePath, 
    deletePath,
    isLoading,
    error 
  } = useThematicPaths();

  useEffect(() => {
    const fetchPaths = async () => {
      const result = await getPaths();
      setPaths(result);
    };

    fetchPaths();
  }, []);

  const handleCreatePath = () => {
    setSelectedPath(null);
    setIsEditing(true);
  };

  const handleEditPath = (path: ThematicPath) => {
    setSelectedPath(path);
    setIsEditing(true);
  };

  const handleDeletePath = async (pathId: string) => {
    if (!window.confirm('Are you sure you want to delete this path?')) return;
    
    try {
      await deletePath(pathId);
      setPaths(prev => prev.filter(p => p.id !== pathId));
    } catch (err) {
      console.error('Failed to delete path:', err);
    }
  };

  const handleSavePath = async (pathData: Partial<ThematicPath>) => {
    try {
      if (selectedPath) {
        const updatedPath = await updatePath(selectedPath.id, pathData);
        setPaths(prev => prev.map(p => 
          p.id === selectedPath.id ? updatedPath : p
        ));
      } else {
        const newPath = await createPath(pathData);
        setPaths(prev => [...prev, newPath]);
      }
      setIsEditing(false);
      setSelectedPath(null);
    } catch (err) {
      console.error('Failed to save path:', err);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Learning Paths</h1>
            <p className="text-gray-600">Create and manage thematic learning paths</p>
          </div>
          <button
            onClick={handleCreatePath}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg
              hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Path
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        {isEditing ? (
          <PathEditor
            path={selectedPath}
            onSave={handleSavePath}
            onCancel={() => {
              setIsEditing(false);
              setSelectedPath(null);
            }}
          />
        ) : (
          <>
            {/* Filters */}
            <div className="mb-6 flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 
                  text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search paths..."
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

            {/* Path List */}
            <PathList
              paths={paths}
              onEdit={handleEditPath}
              onDelete={handleDeletePath}
              onCreate={handleCreatePath}
            />
          </>
        )}
      </div>
    </AdminLayout>
  );
}