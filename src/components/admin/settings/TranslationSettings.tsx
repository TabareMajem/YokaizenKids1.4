import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Save, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { languages } from '../../../locales';
import type { Language } from '../../../types/language';

type Props = {
  settings: {
    translations: Record<string, Record<Language, string>>;
  };
  onSave: (settings: any) => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

export default function TranslationSettings({ settings, onSave, isLoading, error }: Props) {
  const [translations, setTranslations] = useState(settings.translations || {});
  const [newKeyName, setNewKeyName] = useState('');
  const [showAddKey, setShowAddKey] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({ translations });
  };

  const handleAddKey = () => {
    if (!newKeyName.trim()) return;
    
    setTranslations(prev => ({
      ...prev,
      [newKeyName]: Object.fromEntries(
        Object.keys(languages).map(lang => [lang, ''])
      )
    }));
    setNewKeyName('');
    setShowAddKey(false);
  };

  const handleRemoveKey = (key: string) => {
    setTranslations(prev => {
      const newTranslations = { ...prev };
      delete newTranslations[key];
      return newTranslations;
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
            <Globe className="w-5 h-5 text-gray-500" />
            Translation Management
          </h3>
          <button
            type="button"
            onClick={() => setShowAddKey(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg
              hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Translation Key
          </button>
        </div>

        {showAddKey && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-purple-50 rounded-lg"
          >
            <div className="flex gap-4">
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="Enter translation key (e.g., 'common.save')"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg
                  focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
              />
              <button
                type="button"
                onClick={handleAddKey}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg
                  hover:bg-purple-700 transition-colors"
              >
                Add Key
              </button>
              <button
                type="button"
                onClick={() => setShowAddKey(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg
                  transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        <div className="space-y-8">
          {Object.entries(translations).map(([key, values]) => (
            <div key={key} className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-gray-800">
                  {key}
                </h4>
                <button
                  type="button"
                  onClick={() => handleRemoveKey(key)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg
                    transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(languages)
                  .filter(([code]) => code !== 'en')
                  .map(([code, { name, nativeName }]) => (
                    <div key={code}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {name} ({nativeName})
                      </label>
                      <input
                        type="text"
                        value={values[code as Language] || ''}
                        onChange={(e) => setTranslations(prev => ({
                          ...prev,
                          [key]: {
                            ...prev[key],
                            [code]: e.target.value
                          }
                        }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg
                          focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                        placeholder={`Translation for "${key}"`}
                      />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg
          hover:bg-purple-700 transition-colors disabled:opacity-50
          disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
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
    </form>
  );
}