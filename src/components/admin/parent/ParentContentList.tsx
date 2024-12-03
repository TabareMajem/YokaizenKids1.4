import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, PlayCircle, BookOpen, Edit, Trash2, Plus } from 'lucide-react';
import type { ParentContent } from '../../../types/parentContent';

type Props = {
  contents: ParentContent[];
  onEdit: (content: ParentContent) => void;
  onDelete: (contentId: string) => void;
  searchQuery: string;
  selectedType: string | null;
};

export default function ParentContentList({
  contents,
  onEdit,
  onDelete,
  searchQuery,
  selectedType
}: Props) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'discussion':
        return MessageCircle;
      case 'activity':
        return PlayCircle;
      case 'exercise':
        return BookOpen;
      default:
        return PlayCircle;
    }
  };

  const filteredContents = contents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || content.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-4">
      {filteredContents.map((content) => {
        const Icon = getTypeIcon(content.type);
        return (
          <motion.div
            key={content.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Icon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {content.title}
                    </h3>
                    <div className="flex items-center gap-2">
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
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">
                      {content.duration}
                    </span>
                    <div className="flex gap-2">
                      {content.emotionalFocus.map((focus) => (
                        <span
                          key={focus}
                          className="px-2 py-1 bg-purple-50 text-purple-600 
                            rounded-full text-xs"
                        >
                          {focus}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}

      {filteredContents.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Activities Found
          </h3>
          <p className="text-gray-600">
            {searchQuery || selectedType
              ? "No activities match your search criteria"
              : "Get started by creating your first parent activity"
            }
          </p>
        </div>
      )}
    </div>
  );
}