import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Copy, Image, FileText } from 'lucide-react';
import type { QuizQuestionAdmin } from '../../../types/adminQuiz';

type Props = {
  questions: QuizQuestionAdmin[];
  onEdit: (question: QuizQuestionAdmin) => void;
  onDelete: (questionId: string) => void;
  onDuplicate: (questionId: string) => void;
  searchQuery: string;
  selectedType: string | null;
  isLoading: boolean;
};

export default function QuizQuestionList({
  questions,
  onEdit,
  onDelete,
  onDuplicate,
  searchQuery,
  selectedType,
  isLoading
}: Props) {
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || question.category === selectedType;
    return matchesSearch && matchesType;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent 
          rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredQuestions.map((question) => (
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                {question.type === 'text_and_image' ? (
                  <Image className="w-6 h-6 text-purple-600" />
                ) : (
                  <FileText className="w-6 h-6 text-purple-600" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {question.text}
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onDuplicate(question.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Duplicate question"
                    >
                      <Copy className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => onEdit(question)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit question"
                    >
                      <Edit className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => onDelete(question.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Delete question"
                    >
                      <Trash2 className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-500">
                    {question.answers.length} answers
                  </span>
                  <span className="text-gray-500">
                    {question.difficulty}
                  </span>
                  <span className="px-2 py-1 bg-purple-50 text-purple-600 
                    rounded-full text-xs">
                    {question.category.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </span>
                </div>
                {question.image && (
                  <div className="mt-4">
                    <img
                      src={typeof question.image === 'string' ? question.image : ''}
                      alt="Question"
                      className="w-40 h-24 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {filteredQuestions.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Questions Found
          </h3>
          <p className="text-gray-600">
            {searchQuery || selectedType
              ? "No questions match your search criteria"
              : "Get started by creating your first quiz question"
            }
          </p>
        </div>
      )}
    </div>
  );
}