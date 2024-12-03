import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react';
import type { ThematicPath } from '../../../types/thematicPath';

type Props = {
  paths: ThematicPath[];
  onEdit: (path: ThematicPath) => void;
  onDelete: (pathId: string) => void;
  onCreate: () => void;
};

export default function PathList({ paths = [], onEdit, onDelete, onCreate }: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPaths = paths.filter(path =>
    path.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    path.theme.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Thematic Paths</h2>
          <p className="text-gray-600">Manage learning paths and milestones</p>
        </div>
        <button
          onClick={onCreate}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg
            hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Path
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
          placeholder="Search paths..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200
            focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
        />
      </div>

      {/* Paths Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPaths.map((path) => (
          <motion.div
            key={path.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            {/* Preview Image */}
            <div className="aspect-video relative">
              <img
                src={path.backgroundImage}
                alt={path.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-semibold text-white">{path.name}</h3>
                <p className="text-sm text-gray-200">{path.theme}</p>
              </div>
            </div>

            {/* Info & Actions */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {path.milestones.length} milestones
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(path)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Edit className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => onDelete(path.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Empty State */}
        {filteredPaths.length === 0 && (
          <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl">
            <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Paths Found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchQuery
                ? "No paths match your search"
                : "Get started by creating your first thematic path"
              }
            </p>
            <button
              onClick={onCreate}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg
                hover:bg-purple-700 transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Path
            </button>
          </div>
        )}
      </div>
    </div>
  );
}