import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, X, Plus, Trash2, Upload, Globe, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import type { ParentContent, ActivityStep } from '../../../types/parentContent';
import type { Language } from '../../../types/language';

type Props = {
  content?: ParentContent | null;
  onSave: (contentData: Partial<ParentContent>) => Promise<void>;
  onCancel: () => void;
};

export default function ParentContentEditor({ content, onSave, onCancel }: Props) {
  const { languages } = useLanguage();
  const [activeLanguage, setActiveLanguage] = useState<Language>('en');
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>(
    content?.languages || ['en']
  );

  const [formData, setFormData] = useState<Partial<ParentContent>>({
    title: content?.title || '',
    description: content?.description || '',
    type: content?.type || 'activity',
    duration: content?.duration || '',
    emotionalFocus: content?.emotionalFocus || [],
    materials: content?.materials || [],
    steps: content?.steps || [{ text: '' }],
    targetAge: content?.targetAge || [5, 12],
    status: content?.status || 'draft',
    languages: content?.languages || ['en'],
    translations: content?.translations || {
      en: {
        title: '',
        description: '',
        materials: [],
        steps: [{ text: '' }]
      }
    },
    assessmentCriteria: content?.assessmentCriteria || {
      type: 'ei',
      threshold: 70,
      scores: []
    }
  });

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLanguageToggle = (lang: Language) => {
    setSelectedLanguages(prev => {
      if (prev.includes(lang)) {
        return prev.filter(l => l !== lang);
      }
      return [...prev, lang];
    });

    if (!formData.translations?.[lang]) {
      setFormData(prev => ({
        ...prev,
        translations: {
          ...prev.translations,
          [lang]: {
            title: '',
            description: '',
            materials: [],
            steps: prev.steps?.map(step => ({ text: '' })) || []
          }
        }
      }));
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>, 
    stepIndex?: number
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // In a real app, upload to cloud storage and get URL
    const imageUrl = URL.createObjectURL(file);

    if (typeof stepIndex === 'number') {
      setFormData(prev => ({
        ...prev,
        steps: prev.steps?.map((step, i) => 
          i === stepIndex ? {
            ...step,
            image: {
              url: imageUrl,
              alt: Object.fromEntries(
                selectedLanguages.map(lang => [
                  lang, 
                  `Step ${stepIndex + 1} image`
                ])
              )
            }
          } : step
        )
      }));
    }
  };

  const handleAssessmentTypeChange = (type: 'ei' | 'big-five' | 'bullying') => {
    setFormData(prev => ({
      ...prev,
      assessmentCriteria: {
        ...prev.assessmentCriteria!,
        type,
        scores: []
      }
    }));
  };

  const handleScoreChange = (index: number, field: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      assessmentCriteria: {
        ...prev.assessmentCriteria!,
        scores: prev.assessmentCriteria!.scores.map((score, i) => 
          i === index ? { ...score, [field]: value } : score
        )
      }
    }));
  };

  const addScoreCriteria = () => {
    setFormData(prev => ({
      ...prev,
      assessmentCriteria: {
        ...prev.assessmentCriteria!,
        scores: [
          ...prev.assessmentCriteria!.scores,
          { category: '', minScore: 0, maxScore: 100 }
        ]
      }
    }));
  };

  const removeScoreCriteria = (index: number) => {
    setFormData(prev => ({
      ...prev,
      assessmentCriteria: {
        ...prev.assessmentCriteria!,
        scores: prev.assessmentCriteria!.scores.filter((_, i) => i !== index)
      }
    }));
  };

  const validateForm = () => {
    if (!formData.title?.trim()) {
      setError('Title is required');
      return false;
    }

    if (!formData.description?.trim()) {
      setError('Description is required');
      return false;
    }

    if (!formData.steps?.length) {
      setError('At least one step is required');
      return false;
    }

    // Validate translations
    for (const lang of selectedLanguages) {
      const translation = formData.translations?.[lang];
      if (!translation?.title?.trim()) {
        setError(`Title in ${languages[lang].name} is required`);
        return false;
      }
      if (!translation?.description?.trim()) {
        setError(`Description in ${languages[lang].name} is required`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await onSave({
        ...formData,
        languages: selectedLanguages
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save content');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {content ? 'Edit Activity' : 'Create Activity'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Error Message */}
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

      {/* Language Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Available Languages
        </label>
        <div className="flex gap-2">
          {Object.entries(languages).map(([code, { name, nativeName }]) => (
            <button
              key={code}
              type="button"
              onClick={() => handleLanguageToggle(code as Language)}
              className={`px-3 py-1 rounded-full flex items-center gap-2
                transition-colors ${
                selectedLanguages.includes(code as Language)
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>{nativeName}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Assessment Criteria */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Assessment Criteria
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assessment Type
            </label>
            <select
              value={formData.assessmentCriteria?.type}
              onChange={(e) => handleAssessmentTypeChange(e.target.value as 'ei' | 'big-five' | 'bullying')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            >
              <option value="ei">Emotional Intelligence</option>
              <option value="big-five">Big Five Personality</option>
              <option value="bullying">Social Dynamics</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Score Criteria
            </label>
            <div className="space-y-4">
              {formData.assessmentCriteria?.scores.map((score, index) => (
                <div key={index} className="flex gap-4">
                  <input
                    type="text"
                    value={score.category}
                    onChange={(e) => handleScoreChange(index, 'category', e.target.value)}
                    placeholder="Category"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg
                      focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                  />
                  <input
                    type="number"
                    value={score.minScore}
                    onChange={(e) => handleScoreChange(index, 'minScore', parseInt(e.target.value))}
                    placeholder="Min Score"
                    className="w-24 px-4 py-2 border border-gray-300 rounded-lg
                      focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                  />
                  <input
                    type="number"
                    value={score.maxScore}
                    onChange={(e) => handleScoreChange(index, 'maxScore', parseInt(e.target.value))}
                    placeholder="Max Score"
                    className="w-24 px-4 py-2 border border-gray-300 rounded-lg
                      focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                  />
                  <button
                    type="button"
                    onClick={() => removeScoreCriteria(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addScoreCriteria}
                className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg
                  hover:bg-purple-100 transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Score Criteria
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the form fields remain the same */}
      {/* ... */}

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
          type="submit"
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
              Save Activity
            </>
          )}
        </button>
      </div>
    </form>
  );
}