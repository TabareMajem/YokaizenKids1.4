import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { History, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { usePromptTemplates, type PromptChange } from '../../../hooks/usePromptTemplates';

type Props = {
  templateId: string;
  onClose: () => void;
};

export default function PromptHistory({ templateId, onClose }: Props) {
  const [changes, setChanges] = useState<PromptChange[]>([]);
  const { getTemplateHistory, isLoading, error } = usePromptTemplates();

  useEffect(() => {
    const fetchHistory = async () => {
      const result = await getTemplateHistory(templateId);
      setChanges(result);
    };

    fetchHistory();
  }, [templateId]);

  const formatFieldName = (field: string) => {
    return field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <History className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Version History</h2>
            <p className="text-gray-600">Track changes made to this template</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent 
            rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading history...</p>
        </div>
      )}

      {/* Changes List */}
      {!isLoading && changes.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Changes Found
          </h3>
          <p className="text-gray-600">
            This template hasn't been modified yet
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {changes.map((change) => (
            <motion.div
              key={change.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Version {change.newVersion}
                    </h3>
                    <p className="text-gray-600">
                      By {change.userId.name} on {new Date(change.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">v{change.oldVersion}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                    <span className="text-purple-600">v{change.newVersion}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {change.changes.map((fieldChange, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-medium text-gray-800">
                        {formatFieldName(fieldChange.field)}
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-red-50 rounded-lg">
                          <p className="text-sm text-red-600 font-mono whitespace-pre-wrap">
                            {fieldChange.oldValue}
                          </p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="text-sm text-green-600 font-mono whitespace-pre-wrap">
                            {fieldChange.newValue}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}