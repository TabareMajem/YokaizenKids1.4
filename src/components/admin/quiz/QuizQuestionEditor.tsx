import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Plus, Trash2, AlertCircle, Upload } from 'lucide-react';
import type { QuizQuestionAdmin, QuizQuestionDraft } from '../../../types/adminQuiz';

type Props = {
  question?: QuizQuestionAdmin | null;
  onSave: (questionData: Partial<QuizQuestionDraft>) => Promise<void>;
  onCancel: () => void;
};

export default function QuizQuestionEditor({ question, onSave, onCancel }: Props) {
  const [formData, setFormData] = useState<QuizQuestionDraft>({
    text: question?.text || '',
    type: question?.type || 'text_only',
    image: question?.image || undefined,
    answers: question?.answers || [
      {
        text: '',
        image: undefined,
        score: 10,
        category: 'emotional-awareness',
        isCorrect: false
      }
    ],
    category: question?.category || 'emotional-awareness',
    difficulty: question?.difficulty || 'beginner',
    language: question?.language || 'en',
    status: question?.status || 'draft'
  });

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, answerIndex?: number) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (answerIndex !== undefined) {
      // Update answer image
      setFormData(prev => ({
        ...prev,
        answers: prev.answers.map((answer, idx) =>
          idx === answerIndex ? { ...answer, image: file } : answer
        )
      }));
    } else {
      // Update question image
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

    if (!formData.answers.some(answer => answer.isCorrect)) {
      setError('At least one answer must be correct');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onSave(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save question');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {question ? 'Edit Question' : 'Create Question'}
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

      {/* Question Content */}
      <div className="space-y-4">
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                type: e.target.value as QuizQuestionDraft['type']
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            >
              <option value="text_only">Text Only</option>
              <option value="text_and_image">Text and Image</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            >
              <option value="emotional-awareness">Emotional Awareness</option>
              <option value="social-skills">Social Skills</option>
              <option value="mindfulness">Mindfulness</option>
            </select>
          </div>
        </div>

        {formData.type === 'text_and_image' && (
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
        )}

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

                  {formData.type === 'text_and_image' && (
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
                  )}
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
                    image: undefined,
                    score: 10,
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
      </div>

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
              Save Question
            </>
          )}
        </button>
      </div>
    </form>
  );
}