import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, Edit, Trash2, History, Eye } from 'lucide-react';
import type { PromptTemplate } from '../../../hooks/usePromptTemplates';

type Props = {
  templates: PromptTemplate[];
  onEdit: (template: PromptTemplate) => void;
  onDelete: (templateId: string) => void;
  onCreate: () => void;
  onViewHistory: (template: PromptTemplate) => void;
};

export default function PromptList({ 
  templates = [], 
  onEdit, 
  onDelete, 
  onCreate,
  onViewHistory
}: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Prompt Templates</h2>
          <p className="text-gray-600">Manage AI prompt templates for journal processing</p>
        </div>
        <button
          onClick={onCreate}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg
            hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Template
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 
          text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search templates..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200
            focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
        />
      </div>

      {/* Templates List */}
      <div className="space-y-4">
        {filteredTemplates.map((template) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {template.name}
                  </h3>
                  <p className="text-gray-600">{template.description}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm
                  ${template.isActive
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {template.isActive ? 'Active' : 'Inactive'}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Version {template.version}</span>
                  <span>•</span>
                  <span>
                    Last modified: {new Date(template.lastModified).toLocaleDateString()}
                  </span>
                  <span>•</span>
                  <span>By: {template.createdBy.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onViewHistory(template)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <History className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => onEdit(template)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Edit className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => onDelete(template.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Templates Found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchQuery
                ? "No templates match your search"
                : "Get started by creating your first prompt template"
              }
            </p>
            <button
              onClick={onCreate}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg
                hover:bg-purple-700 transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Template
            </button>
          </div>
        )}
      </div>
    </div>
  );
}