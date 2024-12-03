import React from 'react';
import { motion } from 'framer-motion';
import JournalEntry from '../components/JournalEntry';
import MoodTrendChart from '../components/insights/MoodTrendChart';
import { useAIPipeline } from '../hooks/useAIPipeline';
import MangaViewer from '../components/manga/MangaViewer';

const mockMoodData = [
  { date: '2024-03-01', mood: { value: 0.8, dominantEmotion: 'happy', confidence: 0.9 } },
  { date: '2024-03-02', mood: { value: 0.6, dominantEmotion: 'content', confidence: 0.85 } },
  { date: '2024-03-03', mood: { value: 0.9, dominantEmotion: 'excited', confidence: 0.95 } },
  { date: '2024-03-04', mood: { value: 0.7, dominantEmotion: 'happy', confidence: 0.8 } },
  { date: '2024-03-05', mood: { value: 0.85, dominantEmotion: 'joyful', confidence: 0.9 } }
];

export default function JournalPage() {
  const [journalContent, setJournalContent] = React.useState('');
  const [showManga, setShowManga] = React.useState(false);
  const [currentManga, setCurrentManga] = React.useState<any>(null);
  const { processJournal, isProcessing } = useAIPipeline();

  const handleJournalSubmit = async (content: string) => {
    const result = await processJournal(content);
    if (result) {
      setCurrentManga(result);
      setShowManga(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Today's Journal Entry
          </h1>
          <p className="text-gray-600">
            Share your thoughts and feelings, and watch them transform into a manga story!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Journal Entry */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <JournalEntry
                content={journalContent}
                onContentChange={setJournalContent}
                onGenerateManga={handleJournalSubmit}
              />
            </div>

            {/* Mood Trends */}
            <MoodTrendChart data={mockMoodData} />
          </div>

          {/* Recent Entries */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Entries</h2>
            {mockMoodData.map((entry, index) => (
              <motion.div
                key={entry.date}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="text-sm text-gray-500">
                  {new Date(entry.date).toLocaleDateString()}
                </div>
                <div className="font-medium text-gray-800">
                  Feeling {entry.mood.dominantEmotion}
                </div>
              </motion.div>
            ))}
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