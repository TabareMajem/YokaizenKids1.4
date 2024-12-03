import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter } from 'lucide-react';
import QuizQuestionList from '../../components/admin/quiz/QuizQuestionList';
import EIQuestionForm from '../../components/admin/quiz/EIQuestionForm';
import { useQuizManagement } from '../../hooks/useQuizManagement';
import type { QuizQuestionAdmin } from '../../types/adminQuiz';

export default function QuizManagement() {
  const [selectedQuestion, setSelectedQuestion] = useState<QuizQuestionAdmin | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const { 
    questions, 
    createQuestion, 
    updateQuestion, 
    deleteQuestion,
    isLoading,
    error 
  } = useQuizManagement();

  const handleCreateQuestion = () => {
    setSelectedQuestion(null);
    setIsEditing(true);
  };

  const handleEditQuestion = (question: QuizQuestionAdmin) => {
    setSelectedQuestion(question);
    setIsEditing(true);
  };

  const handleSaveQuestion = async (questionData: any) => {
    try {
      if (selectedQuestion) {
        await updateQuestion(selectedQuestion.id, questionData);
      } else {
        await createQuestion(questionData);
      }
      setIsEditing(false);
      setSelectedQuestion(null);
    } catch (err) {
      console.error('Failed to save question:', err);
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;
    
    try {
      await deleteQuestion(questionId);
    } catch (err) {
      console.error('Failed to delete question:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quiz Management</h1>
          <p className="text-gray-600">Create and manage assessment questions</p>
        </div>
        <button
          onClick={handleCreateQuestion}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg
            hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Question
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      {isEditing ? (
        <EIQuestionForm
          initialData={selectedQuestion || undefined}
          onSubmit={handleSaveQuestion}
          onCancel={() => {
            setIsEditing(false);
            setSelectedQuestion(null);
          }}
        />
      ) : (
        <>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 
                text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200
                  focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              {['emotional-awareness', 'empathy', 'social-skills', 'mindfulness'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(selectedType === type ? null : type)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors
                    ${selectedType === type
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {type.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </button>
              ))}
            </div>
          </div>

          <QuizQuestionList
            questions={questions}
            onEdit={handleEditQuestion}
            onDelete={handleDeleteQuestion}
            searchQuery={searchQuery}
            selectedType={selectedType}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
}