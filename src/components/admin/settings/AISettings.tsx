import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, AlertCircle, Bot } from 'lucide-react';

type Props = {
  settings: {
    openai?: {
      apiKey?: string;
      model?: string;
      temperature?: number;
      maxTokens?: number;
    };
    prompts?: {
      teacher?: string;
      parent?: string;
    };
  };
  onSave: (settings: any) => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

export default function AISettings({ settings, onSave, isLoading, error }: Props) {
  const [formData, setFormData] = useState({
    openai: {
      apiKey: settings.openai?.apiKey || '',
      model: settings.openai?.model || 'gpt-4-turbo-preview',
      temperature: settings.openai?.temperature || 0.7,
      maxTokens: settings.openai?.maxTokens || 150
    },
    prompts: {
      teacher: settings.prompts?.teacher || 'You are a helpful teaching assistant...',
      parent: settings.prompts?.parent || 'You are a supportive parenting advisor...'
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
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
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
          <Bot className="w-5 h-5 text-gray-500" />
          AI Assistant Configuration
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              OpenAI API Key
            </label>
            <input
              type="password"
              value={formData.openai.apiKey}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                openai: { ...prev.openai, apiKey: e.target.value }
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Model
            </label>
            <select
              value={formData.openai.model}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                openai: { ...prev.openai, model: e.target.value }
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            >
              <option value="gpt-4-turbo-preview">GPT-4 Turbo</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Temperature
            </label>
            <input
              type="number"
              min="0"
              max="2"
              step="0.1"
              value={formData.openai.temperature}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                openai: { ...prev.openai, temperature: parseFloat(e.target.value) }
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Tokens
            </label>
            <input
              type="number"
              min="50"
              max="500"
              value={formData.openai.maxTokens}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                openai: { ...prev.openai, maxTokens: parseInt(e.target.value) }
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teacher Assistant Prompt
            </label>
            <textarea
              value={formData.prompts.teacher}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                prompts: { ...prev.prompts, teacher: e.target.value }
              }))}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-purple-200 focus:border-purple-400
                resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parent Assistant Prompt
            </label>
            <textarea
              value={formData.prompts.parent}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                prompts: { ...prev.prompts, parent: e.target.value }
              }))}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-purple-200 focus:border-purple-400
                resize-none"
            />
          </div>
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
            Save Changes
          </>
        )}
      </button>
    </form>
  );
}