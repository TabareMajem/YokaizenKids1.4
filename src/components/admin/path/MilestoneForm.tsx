import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Plus } from 'lucide-react';
import { api } from '../../../lib/api';
import type { Content } from '../../../types/content';
import type { Milestone } from '../../../types/thematicPath';

type Props = {
  milestone: Partial<Milestone>;
  onSave: (milestone: Partial<Milestone>) => void;
  onCancel: () => void;
};

export default function MilestoneForm({ milestone, onSave, onCancel }: Props) {
  const [contents, setContents] = useState<Content[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);

  useEffect(() => {
    loadContents();
  }, []);

  useEffect(() => {
    if (milestone.activityId) {
      const content = contents.find(c => c.id === milestone.activityId);
      if (content) {
        setSelectedContent(content);
      }
    }
  }, [milestone.activityId, contents]);

  const loadContents = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get('/api/content', {
        params: { status: 'published' }
      });
      setContents(data.data);
    } catch (error) {
      console.error('Failed to load contents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!selectedContent) return;

    onSave({
      ...milestone,
      activityId: selectedContent.id,
      label: selectedContent.title
    });
  };

  const filteredContents = contents.filter(content =>
    content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    content.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
      flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Link Content to Milestone
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Content */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Content
          </label>
          <div className="relative">
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
        </div>

        {/* Content List */}
        <div className="max-h-64 overflow-y-auto space-y-2 mb-6">
          {isLoading ? (
            <div className="text-center py-4 text-gray-500">Loading contents...</div>
          ) : filteredContents.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No contents found</div>
          ) : (
            filteredContents.map(content => (
              <button
                key={content.id}
                type="button"
                onClick={() => setSelectedContent(content)}
                className={`w-full p-3 rounded-lg text-left transition-colors ${
                  selectedContent?.id === content.id
                    ? 'bg-purple-50 border-2 border-purple-200'
                    : 'hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <h3 className="font-medium text-gray-800">{content.title}</h3>
                <p className="text-sm text-gray-600">{content.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-1 bg-purple-100 text-purple-600 
                    rounded-full text-xs">
                    {content.type}
                  </span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-600 
                    rounded-full text-xs">
                    {content.category}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Selected Content Preview */}
        {selectedContent && (
          <div className="p-4 bg-purple-50 rounded-lg mb-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-purple-900">Selected Content</h4>
              <button
                type="button"
                onClick={() => setSelectedContent(null)}
                className="p-1 hover:bg-purple-100 rounded-full"
              >
                <X className="w-4 h-4 text-purple-600" />
              </button>
            </div>
            <p className="text-sm text-purple-700">{selectedContent.title}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 
              rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedContent}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg
              hover:bg-purple-700 transition-colors disabled:opacity-50
              disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Milestone
          </button>
        </div>
      </div>
    </div>
  );
}