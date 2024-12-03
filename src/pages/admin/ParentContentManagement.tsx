import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import ParentContentList from '../../components/admin/parent/ParentContentList';
import ParentContentEditor from '../../components/admin/parent/ParentContentEditor';
import { useParentContent } from '../../hooks/useParentContent';
import type { ParentContent } from '../../types/parentContent';

export default function ParentContentManagement() {
  const [selectedContent, setSelectedContent] = useState<ParentContent | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const { 
    contents, 
    createContent, 
    updateContent, 
    deleteContent,
    isLoading,
    error 
  } = useParentContent();

  const handleCreateContent = () => {
    setSelectedContent(null);
    setIsEditing(true);
  };

  const handleEditContent = (content: ParentContent) => {
    setSelectedContent(content);
    setIsEditing(true);
  };

  const handleSaveContent = async (contentData: Partial<ParentContent>) => {
    try {
      if (selectedContent) {
        await updateContent(selectedContent.id, contentData);
      } else {
        await createContent(contentData);
      }
      setIsEditing(false);
      setSelectedContent(null);
    } catch (err) {
      console.error('Failed to save content:', err);
    }
  };

  const handleDeleteContent = async (contentId: string) => {
    if (!window.confirm('Are you sure you want to delete this content?')) return;
    
    try {
      await deleteContent(contentId);
    } catch (err) {
      console.error('Failed to delete content:', err);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Parent Activities</h1>
            <p className="text-gray-600">
              Manage activities and recommendations for parents
            </p>
          </div>
          <button
            onClick={handleCreateContent}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg
              hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Activity
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        {isEditing ? (
          <ParentContentEditor
            content={selectedContent}
            onSave={handleSaveContent}
            onCancel={() => {
              setIsEditing(false);
              setSelectedContent(null);
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
                  placeholder="Search activities..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200
                    focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                {['activity', 'discussion', 'exercise'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(selectedType === type ? null : type)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors
                      ${selectedType === type
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Content List */}
            <ParentContentList
              contents={contents}
              onEdit={handleEditContent}
              onDelete={handleDeleteContent}
              searchQuery={searchQuery}
              selectedType={selectedType}
            />
          </>
        )}
      </div>
    </AdminLayout>
  );
}