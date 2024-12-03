import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Loader2, AlertCircle } from 'lucide-react';
import { useParentContentGenerator } from '../../hooks/useParentContentGenerator';
import type { ContentGenerationParams } from '../../services/ai/parentContentGenerator';
import type { Language } from '../../types/language';

type Props = {
  onGenerated: (content: any) => void;
};

export default function ContentGenerationForm({ onGenerated }: Props) {
  const { generateContent, isGenerating, error } = useParentContentGenerator();
  const [formData, setFormData] = useState<ContentGenerationParams>({
    childAge: 7,
    emotionalFocus: ['emotional-awareness'],
    duration: 30,
    language: 'en',
    culturalContext: 'us'
  });

  const emotionalFocusOptions = [
    'emotional-awareness',
    'empathy',
    'self-regulation',
    'social-skills',
    'mindfulness'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = await generateContent(formData);
    if (content) {
      onGenerated(content);
    }
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
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Child's Age
        </label>
        <input
          type="number"
          min={5}
          max={12}
          value={formData.childAge}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            childAge: parseInt(e.target.value) 
          }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Emotional Focus
        </label>
        <div className="grid grid-cols-2 gap-2">
          {emotionalFocusOptions.map((focus) => (
            <label key={focus} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.emotionalFocus.includes(focus)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData(prev => ({
                      ...prev,
                      emotionalFocus: [...prev.emotionalFocus, focus]
                    }));
                  } else {
                    setFormData(prev => ({
                      ...prev,
                      emotionalFocus: prev.emotionalFocus.filter(f => f !== focus)
                    }));
                  }
                }}
                className="rounded border-gray-300 text-purple-600 
                  focus:ring-purple-200"
              />
              <span className="text-sm text-gray-700">
                {focus.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Duration (minutes)
        </label>
        <select
          value={formData.duration}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            duration: parseInt(e.target.value) 
          }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
        >
          <option value={15}>15 minutes</option>
          <option value={30}>30 minutes</option>
          <option value={45}>45 minutes</option>
          <option value={60}>60 minutes</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Language
        </label>
        <select
          value={formData.language}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            language: e.target.value as Language 
          }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
        >
          <option value="en">English</option>
          <option value="ja">Japanese</option>
          <option value="es">Spanish</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cultural Context
        </label>
        <select
          value={formData.culturalContext}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            culturalContext: e.target.value as 'jp' | 'us'
          }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
        >
          <option value="us">Western</option>
          <option value="jp">Japanese</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isGenerating || formData.emotionalFocus.length === 0}
        className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg
          hover:bg-purple-700 transition-colors disabled:opacity-50
          disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Wand2 className="w-5 h-5" />
            Generate Activity
          </>
        )}
      </button>
    </form>
  );
}