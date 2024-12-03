import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Users, Brain, Heart, RefreshCw } from 'lucide-react';
import { useParentDashboard } from '../hooks/useParentDashboard';
import { useParentRecommendations } from '../hooks/useParentRecommendations';
import ChildProgress from '../components/parent/ChildProgress';
import ActivitySummary from '../components/parent/ActivitySummary';
import AssessmentProgress from '../components/parent/AssessmentProgress';
import ActivityRecommendations from '../components/parent/ActivityRecommendations';
import AIAssistant from '../components/shared/AIAssistant';
import StudentManagementModal from '../components/teacher/StudentManagementModal';

export default function ParentDashboard() {
  const { children, isLoading, error, refreshProgress } = useParentDashboard();
  const { generateRecommendations, isLoading: isLoadingRecommendations } = useParentRecommendations();
  const [showAddChild, setShowAddChild] = useState(false);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [activities, setActivities] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (children.length > 0) {
      generateRecommendations().then(setActivities);
    }
  }, [children]);

  const handleAddChild = () => {
    setShowAddChild(true);
  };

  const handleViewDetails = (childId: string) => {
    setSelectedChild(childId);
  };

  const handleSaveChild = async (childData: any) => {
    // Handle saving child data
    setShowAddChild(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6 
        flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent 
            rounded-full animate-spin" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6 
        flex items-center justify-center">
        <div className="bg-red-50 text-red-600 rounded-lg p-4 max-w-md text-center">
          <p>{error}</p>
          <button
            onClick={refreshProgress}
            className="mt-4 px-4 py-2 bg-red-100 rounded-lg hover:bg-red-200 
              transition-colors flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-5 h-5" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Parent Dashboard</h1>
            <p className="text-purple-600">Monitoring your children's progress</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleAddChild}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg
                hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Child
            </button>
            <button
              onClick={refreshProgress}
              className="p-2 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <RefreshCw className="w-5 h-5 text-purple-600" />
            </button>
          </div>
        </div>

        {/* Children Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {children.map((child) => (
            <ChildProgress 
              key={child.id} 
              child={child}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Activity Summary */}
            <ActivitySummary children={children} />

            {/* Assessment Progress */}
            <AssessmentProgress data={children[0]?.assessments || []} />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Activity Recommendations */}
            <ActivityRecommendations
              activities={activities}
              onActivitySelect={(activity) => {
                console.log('Selected activity:', activity);
              }}
            />
          </div>
        </div>
      </div>

      {/* AI Assistant */}
      <AIAssistant />

      {/* Add Child Modal */}
      <StudentManagementModal
        isOpen={showAddChild}
        onClose={() => setShowAddChild(false)}
        onSave={handleSaveChild}
      />
    </div>
  );
}