import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Save, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { languages } from '../../../locales';
import type { Language } from '../../../types/language';

type Props = {
  contentId: string;
  translations: Record<Language, {
    title: string;
    description: string;
    content: string;
  }>;
  onSave: (translations: Record<Language, any>) => Promise<void>;
};

export default function TranslationManager({ contentId, translations, onSave }: Props) {
  const [formData, setFormData] = useState(translations);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
      await onSave(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save translations');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Globe className="w-5 h-5 text-purple-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-800">
          Content Translations
        </h3>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2"
        >
          <AlertCircle className="w-5 h-5" />
          {error}
        </motion.div>
      )}

      <div className="space-y-8">
        {Object.entries(languages)
          .filter(([code]) => code !== 'en') // Skip English as it's the base language
          .map(([code, { name, nativeName }]) => (
            <div key={code} className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-medium text-gray-800 mb-4">
                {name} ({nativeName})
              </h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData[code as Language]?.title || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      [code]: {
                        ...prev[code as Language],
                        title: e.target.value
                      }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg
                      focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData[code as Language]?.description || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      [code]: {
                        ...prev[code as Language],
                        description: e.target.value
                      }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg
                      focus:ring-2 focus:ring-purple-200 focus:border-purple-400
                      resize-none"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    value={formData[code as Language]?.content || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      [code]: {
                        ...prev[code as Language],
                        content: e.target.value
                      }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg
                      focus:ring-2 focus:ring-purple-200 focus:border-purple-400
                      resize-none"
                    rows={6}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg
            hover:bg-purple-700 transition-colors flex items-center gap-2
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent 
                rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Translations
            </>
          )}
        </button>
      </div>
    </div>
  );
}