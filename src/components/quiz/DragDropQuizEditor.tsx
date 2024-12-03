import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { Reorder } from 'framer-motion';
import type { QuizQuestion } from '../../types/quiz';

type Props = {
  initialData?: Partial<QuizQuestion>;
  onSave: (data: Partial<QuizQuestion>) => Promise<void>;
  onCancel: () => void;
};

export default function DragDropQuizEditor({ initialData, onSave, onCancel }: Props) {
  const [formData, setFormData] = useState({
    text: initialData?.text || '',
    type: 'drag_and_drop',
    answers: initialData?.answers || [],
    category: initialData?.category || 'emotional-awareness',
    difficulty: initialData?.difficulty || 'beginner',
    language: initialData?.languages?.[0] || 'en'
  });

  const handleAddAnswer = () => {
    setFormData(prev => ({
      ...prev,
      answers: [
        ...prev.answers,
        {
          id: Date.now().toString(),
          text: '',
          translations: {},
          score: 1,
          category: prev.category
        }
      ]
    }));
  };

  const handleRemoveAnswer = (index: number) => {
    setFormData(prev => ({
      ...prev,
      answers: prev.answers.filter((_, i) => i !== index)
    }));
  };

  const handleReorderAnswers = (newOrder: typeof formData.answers) => {
    setFormData(prev => ({
      ...prev,
      answers: newOrder
    }));
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSave(formData);
    }} className="space-y-6">
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Answers (in correct order)
        </label>
        <Reorder.Group
          axis="y"
          values={formData.answers}
          onReorder={handleReorderAnswers}
          className="space-y-2"
        >
          {formData.answers.map((answer, index) => (
            <Reorder.Item
              key={answer.id}
              value={answer}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div className="p-4 flex items-center gap-4">
                <GripVertical className="w-5 h-5 text-gray-400 cursor-grab" />
                <input
                  type="text"
                  value={answer.text}
                  onChange={(e) => {
                    const newAnswers = [...formData.answers];
                    newAnswers[index] = {
                      ...newAnswers[index],
                      text: e.target.value
                    };
                    setFormData(prev => ({ ...prev, answers: newAnswers }));
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                  placeholder="Answer text"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveAnswer(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        <button
          type="button"
          onClick={handleAddAnswer}
          className="mt-4 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg
            hover:bg-purple-100 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Answer
        </button>
      </div>

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
          Save Quiz
        </button>
      </div>
    </form>
  );
}