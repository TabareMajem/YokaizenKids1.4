import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PenTool, 
  Send,
  Brain,
  Heart,
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import JournalEntry from '../components/JournalEntry';
import MoodTrendChart from '../components/insights/MoodTrendChart';
import AICompanionWidget from '../components/companions/AICompanionWidget';
import DailySELActivity from '../components/sel/DailySELActivity';
import MoodSelector from '../components/MoodSelector';
import MangaViewer from '../components/manga/MangaViewer';
import HanamiPathView from '../components/learning-path/HanamiPathView';
import AssessmentSelector from '../components/quiz/AssessmentSelector';
import QuizScreen from '../components/quiz/QuizScreen';

// Mock data for development
const mockMoodData = [
  { date: '2024-03-01', mood: { value: 0.8, dominantEmotion: 'happy', confidence: 0.9 } },
  { date: '2024-03-02', mood: { value: 0.6, dominantEmotion: 'content', confidence: 0.85 } },
  { date: '2024-03-03', mood: { value: 0.9, dominantEmotion: 'excited', confidence: 0.95 } },
  { date: '2024-03-04', mood: { value: 0.7, dominantEmotion: 'happy', confidence: 0.8 } },
  { date: '2024-03-05', mood: { value: 0.85, dominantEmotion: 'joyful', confidence: 0.9 } }
];

export default function StudentDashboard() {
  const [journalContent, setJournalContent] = useState('');
  const [showManga, setShowManga] = useState(false);
  const [currentManga, setCurrentManga] = useState<any>(null);
  const [selectedMood, setSelectedMood] = useState('');
  const [view, setView] = useState<'dashboard' | 'path' | 'assessment-select' | 'assessment'>('dashboard');
  const [selectedAssessment, setSelectedAssessment] = useState<'ei' | 'big-five' | 'bullying' | null>(null);

  const handleJournalSubmit = async (content: string) => {
    // Mock manga data for demonstration
    const mockManga = {
      panels: [
        {
          id: '1',
          imageUrl: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=800&h=600',
          speechBubbles: [
            {
              id: 'bubble-1',
              text: content,
              position: { x: 50, y: 50 },
              type: 'speech'
            }
          ]
        }
      ]
    };

    setCurrentManga(mockManga);
    setShowManga(true);
  };

  const handleAssessmentSelect = (assessmentId: string) => {
    setSelectedAssessment(assessmentId as 'ei' | 'big-five' | 'bullying');
    setView('assessment');
  };

  const handleAssessmentComplete = (score: number) => {
    // Handle assessment completion
    console.log('Assessment completed with score:', score);
    setView('dashboard');
    setSelectedAssessment(null);
  };

  if (view === 'path') {
    return (
      <>
        <button
          onClick={() => setView('dashboard')}
          className="fixed top-4 right-4 z-50 px-4 py-2 bg-white/90 backdrop-blur-sm 
            rounded-lg shadow-lg hover:bg-white transition-colors"
        >
          Back to Dashboard
        </button>
        <HanamiPathView />
      </>
    );
  }

  if (view === 'assessment-select') {
    return (
      <AssessmentSelector 
        onSelect={handleAssessmentSelect}
      />
    );
  }

  if (view === 'assessment' && selectedAssessment) {
    return (
      <QuizScreen 
        assessmentType={selectedAssessment}
        onBack={() => setView('dashboard')}
        onComplete={handleAssessmentComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, Sarah! 👋
            </h1>
            <div className="flex gap-4">
              <button
                onClick={() => setView('assessment-select')}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 
                  text-white font-semibold rounded-lg shadow-lg hover:shadow-xl 
                  transform hover:scale-105 transition-all flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                Take Assessment
              </button>
              <button
                onClick={() => setView('path')}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 
                  text-white font-semibold rounded-lg shadow-lg hover:shadow-xl 
                  transform hover:scale-105 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                View Learning Path
              </button>
            </div>
          </div>

          {/* Mood Check-in */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6 text-purple-500" />
              How are you feeling today?
            </h2>
            <MoodSelector
              selectedMood={selectedMood}
              onMoodSelect={setSelectedMood}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* AI Companion Widget */}
            <AICompanionWidget mood={selectedMood} />

            {/* Daily SEL Activity */}
            <DailySELActivity mood={selectedMood} />

            {/* Journal Entry */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <PenTool className="w-5 h-5 text-purple-500" />
                Today's Journal
              </h2>
              <JournalEntry
                content={journalContent}
                onContentChange={setJournalContent}
                onGenerateManga={handleJournalSubmit}
              />
            </div>

            {/* Mood Trends */}
            <MoodTrendChart data={mockMoodData} />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 
              rounded-xl shadow-lg p-6 text-white"
            >
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => {/* Navigate to AR activities */}}
                  className="w-full py-2 px-4 bg-white/10 rounded-lg hover:bg-white/20 
                    transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Try AR Activity
                </button>
                <button
                  onClick={() => setView('assessment-select')}
                  className="w-full py-2 px-4 bg-white/10 rounded-lg hover:bg-white/20 
                    transition-colors flex items-center gap-2"
                >
                  <Brain className="w-5 h-5" />
                  Take Assessment
                </button>
                <button
                  onClick={() => {/* Share progress */}}
                  className="w-full py-2 px-4 bg-white/10 rounded-lg hover:bg-white/20 
                    transition-colors flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Share Progress
                </button>
              </div>
            </div>

            {/* Recent Assessments */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Recent Assessments
              </h2>
              <div className="space-y-4">
                <button
                  onClick={() => setView('assessment-select')}
                  className="w-full p-4 bg-purple-50 rounded-lg hover:bg-purple-100
                    transition-colors text-left group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-800">Take New Assessment</h3>
                    <ArrowRight className="w-4 h-4 text-purple-500 
                      group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Discover insights about your emotional intelligence and personality
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Manga Viewer Modal */}
      {showManga && currentManga && (
        <MangaViewer
          panels={currentManga.panels}
          onClose={() => setShowManga(false)}
        />
      )}
    </div>
  );
}