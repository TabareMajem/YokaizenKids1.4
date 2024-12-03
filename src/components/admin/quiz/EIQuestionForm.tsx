import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Upload, X } from 'lucide-react';
import type { QuizQuestionDraft, EIComponent } from '../../../types/adminQuiz';

type Props = {
  initialData?: Partial<QuizQuestionDraft>;
  onSubmit: (data: QuizQuestionDraft) => Promise<void>;
  onCancel: () => void;
};

const eiComponents: EIComponent[] = [
  'self-awareness',
  'self-regulation',
  'motivation',
  'empathy',
  'social-skills'
];

export default function EIQuestionForm({ initialData, onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState<QuizQuestionDraft>({
    text: initialData?.text || '',
    type: initialData?.type || 'text_only',
    image: initialData?.image,
    answers: initialData?.answers || [
      {
        text: '',
        score: 1,
        category: 'empathy',
        isCorrect: false
      }
    ],
    category: initialData?.category || 'empathy',
    difficulty: initialData?.difficulty || 'beginner',
    language: initialData?.language || 'en',
    status: initialData?.status || 'draft'
  });

  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, answerIndex?: number) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (answerIndex !== undefined) {
      setFormData(prev => ({
        ...prev,
        answers: prev.answers.map((answer, idx) =>
          idx === answerIndex ? { ...answer, image: file } : answer
        )
      }));
    } else {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.text.trim()) {
      setError('Question text is required');
      return;
    }

    if (formData.answers.length < 2) {
      setError('At least two answers are required');
      return;
    }

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save question');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Question Text */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Question Text
        </label>
        <textarea
          value={formData.text}
          onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-purple-200 focus:border-purple-400
            resize-none"
          rows={3}
          required
        />
      </div>

      {/* Question Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Question Image
        </label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e)}
            className="hidden"
            id="questionImage"
          />
          <label
            htmlFor="questionImage"
            className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg
              hover:bg-purple-100 transition-colors cursor-pointer
              flex items-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Upload Image
          </label>
          {formData.image && (
            <div className="relative w-24 h-24">
              <img
                src={typeof formData.image === 'string' ? formData.image : URL.createObjectURL(formData.image)}
                alt="Question"
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, image: undefined }))}
                className="absolute -top-2 -right-2 p-1 bg-red-100 
                  rounded-full text-red-600 hover:bg-red-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Category and Difficulty */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            EI Component
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              category: e.target.value as EIComponent 
            }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
          >
            {eiComponents.map(component => (
              <option key={component} value={component}>
                {component.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty
          </label>
          <select
            value={formData.difficulty}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              difficulty: e.target.value as QuizQuestionDraft['difficulty']
            }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Answers */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Answers
        </label>
        <div className="space-y-4">
          {formData.answers.map((answer, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-1 space-y-4">
                <input
                  type="text"
                  value={answer.text}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    answers: prev.answers.map((a, i) =>
                      i === index ? { ...a, text: e.target.value } : a
                    )
                  }))}
                  placeholder="Answer text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Score (1-5)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={answer.score}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        answers: prev.answers.map((a, i) =>
                          i === index ? { ...a, score: parseInt(e.target.value) } : a
                        )
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg
                        focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={answer.category}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        answers: prev.answers.map((a, i) =>
                          i === index ? { ...a, category: e.target.value as EIComponent } : a
                        )
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg
                        focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                    >
                      {eiComponents.map(component => (
                        <option key={component} value={component}>
                          {component.split('-').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, index)}
                    className="hidden"
                    id={`answerImage_${index}`}
                  />
                  <label
                    htmlFor={`answerImage_${index}`}
                    className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg
                      hover:bg-purple-100 transition-colors cursor-pointer
                      flex items-center gap-2"
                  >
                    <Upload className="w-5 h-5" />
                    Upload Image
                  </label>
                  {answer.image && (
                    <div className="relative w-24 h-24">
                      <img
                        src={typeof answer.image === 'string' ? answer.image : URL.createObjectURL(answer.image)}
                        alt={`Answer ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          answers: prev.answers.map((a, i) =>
                            i === index ? { ...a, image: undefined } : a
                          )
                        }))}
                        className="absolute -top-2 -right-2 p-1 bg-red-100 
                          rounded-full text-red-600 hover:bg-red-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={answer.isCorrect}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    answers: prev.answers.map((a, i) =>
                      i === index ? { ...a, isCorrect: e.target.checked } : a
                    )
                  }))}
                  className="mt-3 rounded border-gray-300 text-purple-600 
                    focus:ring-purple-200"
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    answers: prev.answers.filter((_, i) => i !== index)
                  }))}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg
                    transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setFormData(prev => ({
              ...prev,
              answers: [
                ...prev.answers,
                {
                  text: '',
                  score: 1,
                  category: prev.category,
                  isCorrect: false
                }
              ]
            }))}
            className="w-full py-2 px-4 bg-purple-50 text-purple-600 rounded-lg
              hover:bg-purple-100 transition-colors flex items-center gap-2
              justify-center"
          >
            <Plus className="w-5 h-5" />
            Add Answer
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 text-red-600 rounded-lg"
        >
          {error}
        </motion.div>
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
          type="submit"
          className="px-6 py-2 bg-purple-600 text-white rounded-lg
            hover:bg-purple-700 transition-colors"
        >
          Save Question
        </button>
      </div>
    </form>
  );
}