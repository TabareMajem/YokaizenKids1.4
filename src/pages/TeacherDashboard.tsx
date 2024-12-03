import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Book, Brain, Star, AlertCircle, Search, 
  Mail, Calendar, BarChart2, Settings, Download 
} from 'lucide-react';
import StudentTable from '../components/teacher/StudentTable';
import ParentConnectionsTable from '../components/teacher/ParentConnectionsTable';
import TeacherCalendar from '../components/teacher/TeacherCalendar';
import ClassAnalytics from '../components/teacher/ClassAnalytics';
import CodeGenerator from '../components/teacher/CodeGenerator';
import OverviewContent from '../components/teacher/OverviewContent';
import TeacherSettings from '../components/teacher/settings/TeacherSettings';
import AIAssistant from '../components/shared/AIAssistant';

type TabType = 'overview' | 'students' | 'parents' | 'activities' | 'analytics' | 'settings';

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Users },
    { id: 'students', label: 'Students', icon: Book },
    { id: 'parents', label: 'Parents', icon: Mail },
    { id: 'activities', label: 'Activities', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'students':
        return <StudentTable searchQuery={searchQuery} />;
      case 'parents':
        return <ParentConnectionsTable searchQuery={searchQuery} />;
      case 'activities':
        return <TeacherCalendar />;
      case 'analytics':
        return <ClassAnalytics />;
      case 'settings':
        return <TeacherSettings />;
      default:
        return <OverviewContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">
              Teacher Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                />
              </div>
              <button
                onClick={() => {/* Handle code generation */}}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Generate Codes
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </div>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
}