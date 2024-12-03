import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Book } from 'lucide-react';
import MangaViewer from '../components/manga/MangaViewer';

// Mock manga stories data
const mockStories = [
  {
    id: 1,
    date: '2024-03-10',
    title: 'A Day at the Park',
    preview: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400&h=300',
    panels: [
      {
        id: '1',
        imageUrl: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=800&h=600',
        speechBubbles: []
      }
    ]
  },
  {
    id: 2,
    date: '2024-03-09',
    title: 'Making New Friends',
    preview: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300',
    panels: [
      {
        id: '1',
        imageUrl: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600',
        speechBubbles: []
      }
    ]
  }
];

export default function MangaStoriesPage() {
  const [selectedStory, setSelectedStory] = React.useState<typeof mockStories[0] | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Manga Stories
          </h1>
          <p className="text-gray-600">
            Your emotional journey illustrated through manga
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer
                transform hover:scale-[1.02] transition-all"
              onClick={() => setSelectedStory(story)}
            >
              <div className="aspect-video relative">
                <img
                  src={story.preview}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  {story.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(story.date).toLocaleDateString()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {mockStories.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-block p-3 bg-purple-100 rounded-full mb-4">
              <Book className="w-6 h-6 text-purple-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No Stories Yet
            </h2>
            <p className="text-gray-600">
              Write in your journal to create your first manga story!
            </p>
          </div>
        )}
      </div>

      {/* Manga Viewer Modal */}
      {selectedStory && (
        <MangaViewer
          panels={selectedStory.panels}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </div>
  );
}