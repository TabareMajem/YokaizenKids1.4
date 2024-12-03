import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, Edit, Trash2, Play } from 'lucide-react';
import GameLauncher from './GameLauncher';
import type { Content } from '../../../types/content';

type Props = {
  contents: Content[];
  onEdit: (content: Content) => void;
  onDelete: (contentId: string) => void;
  onCreate: () => void;
};

export default function ContentList({ contents, onEdit, onDelete, onCreate }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);

  const filteredContents = contents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || content.type === selectedType;
    return matchesSearch && matchesType;
  });

  if (selectedContent?.type === 'game') {
    return (
      <GameLauncher
        game={selectedContent}
        onBack={() => setSelectedContent(null)}
      />
    );
  }

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
              placeholder="Search content..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200
                focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            {['activity', 'prompt', 'lesson', 'game'].map((type) => (
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
        <button
          onClick={onCreate}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg
            hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Content
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContents.map((content) => (
          <motion.div
            key={content.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {content.title}
                </h3>
                <div className="flex items-center gap-2">
                  {content.type === 'game' && (
                    <button
                      onClick={() => setSelectedContent(content)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Play className="w-5 h-5 text-purple-600" />
                    </button>
                  )}
                  <button
                    onClick={() => onEdit(content)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Edit className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => onDelete(content.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{content.description}</p>

              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-purple-100 text-purple-600 
                  rounded-full text-xs">
                  {content.type}
                </span>
                <span className="px-2 py-1 bg-purple-100 text-purple-600 
                  rounded-full text-xs">
                  {content.category}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}