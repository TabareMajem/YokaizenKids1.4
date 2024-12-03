import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ClipboardList, Clock, Users, Eye, Plus } from 'lucide-react';
import AssessmentCard from './AssessmentCard';
import AssignAssessmentModal from './AssignAssessmentModal';
import AssessmentPreviewModal from './AssessmentPreviewModal';

type Assessment = {
  id: string;
  title: string;
  description: string;
  category: string;
  estimatedTime: string;
  questions: number;
  standards: string[];
};

// Mock data
const mockAssessments: Assessment[] = [
  {
    id: '1',
    title: 'Learning Style Survey',
    description: 'Identify preferred learning methods and study habits',
    category: 'Learning Styles',
    estimatedTime: '15 mins',
    questions: 20,
    standards: ['SEL.1', 'SEL.2']
  },
  {
    id: '2',
    title: 'Emotional Intelligence Check',
    description: 'Evaluate emotional awareness and regulation',
    category: 'Emotional Intelligence',
    estimatedTime: '20 mins',
    questions: 25,
    standards: ['SEL.3', 'SEL.4']
  },
  {
    id: '3',
    title: 'Social Interaction Quiz',
    description: 'Assess social skills and peer relationships',
    category: 'Social Skills',
    estimatedTime: '15 mins',
    questions: 15,
    standards: ['SEL.5', 'SEL.6']
  }
];

export default function AssessmentPool() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const categories = Array.from(
    new Set(mockAssessments.map(a => a.category))
  );

  const filteredAssessments = mockAssessments.filter(assessment => {
    const matchesSearch = assessment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assessment.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || assessment.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Assessment Pool</h2>
          <p className="text-gray-600">
            Assign assessments to gain insights into student development
          </p>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg 
          hover:bg-purple-700 transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create Assessment
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 
            w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search assessments..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 
              focus:border-purple-400 focus:ring focus:ring-purple-200 
              focus:ring-opacity-50"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(
                selectedCategory === category ? null : category
              )}
              className={`px-3 py-1 rounded-full text-sm transition-colors
                ${selectedCategory === category
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Assessment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssessments.map((assessment) => (
          <AssessmentCard
            key={assessment.id}
            assessment={assessment}
            onAssign={() => {
              setSelectedAssessment(assessment);
              setShowAssignModal(true);
            }}
            onPreview={() => {
              setSelectedAssessment(assessment);
              setShowPreviewModal(true);
            }}
          />
        ))}
      </div>

      {/* Modals */}
      {selectedAssessment && (
        <>
          <AssignAssessmentModal
            assessment={selectedAssessment}
            isOpen={showAssignModal}
            onClose={() => setShowAssignModal(false)}
          />
          <AssessmentPreviewModal
            assessment={selectedAssessment}
            isOpen={showPreviewModal}
            onClose={() => setShowPreviewModal(false)}
          />
        </>
      )}
    </div>
  );
}