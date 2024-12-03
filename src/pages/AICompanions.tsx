import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wand2, 
  MessageCircle, 
  Heart, 
  Sparkles,
  Settings,
  Crown
} from 'lucide-react';
import CompanionCustomizer from '../components/companions/CompanionCustomizer';
import CompanionChat from '../components/companions/CompanionChat';
import CompanionProgress from '../components/companions/CompanionProgress';

const mockCompanions = [
  {
    id: 'companion-1',
    name: 'Luna',
    type: 'fox',
    personality: 'cheerful',
    level: 5,
    experience: 75,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna&backgroundColor=b6e3f4'
  },
  {
    id: 'companion-2',
    name: 'Nova',
    type: 'owl',
    personality: 'wise',
    level: 3,
    experience: 45,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nova&backgroundColor=ffdfbf'
  }
];

export default function AICompanions() {
  const [selectedCompanion, setSelectedCompanion] = useState(mockCompanions[0]);
  const [isCustomizing, setIsCustomizing] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI Companions
          </h1>
          <p className="text-gray-600">
            Your personal guides on your emotional learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Companion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedCompanion.avatar}
                    alt={selectedCompanion.name}
                    className="w-16 h-16 rounded-full bg-purple-100"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {selectedCompanion.name}
                    </h2>
                    <p className="text-gray-600">
                      Level {selectedCompanion.level} {selectedCompanion.type}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCustomizing(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Settings className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Chat Interface */}
              <CompanionChat companion={selectedCompanion} />
            </motion.div>

            {/* Progress and Achievements */}
            <CompanionProgress companion={selectedCompanion} />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button className="w-full py-2 px-4 bg-purple-50 text-purple-700 
                  rounded-lg hover:bg-purple-100 transition-colors flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Start Conversation
                </button>
                <button className="w-full py-2 px-4 bg-purple-50 text-purple-700 
                  rounded-lg hover:bg-purple-100 transition-colors flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Check Emotions
                </button>
                <button className="w-full py-2 px-4 bg-purple-50 text-purple-700 
                  rounded-lg hover:bg-purple-100 transition-colors flex items-center gap-2">
                  <Wand2 className="w-5 h-5" />
                  Get Activity Suggestion
                </button>
              </div>
            </div>

            {/* Available Companions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Your Companions
              </h2>
              <div className="space-y-4">
                {mockCompanions.map((companion) => (
                  <button
                    key={companion.id}
                    onClick={() => setSelectedCompanion(companion)}
                    className={`w-full p-3 rounded-lg flex items-center gap-3
                      transition-colors ${
                        selectedCompanion.id === companion.id
                          ? 'bg-purple-50 border-2 border-purple-200'
                          : 'hover:bg-gray-50'
                      }`}
                  >
                    <img
                      src={companion.avatar}
                      alt={companion.name}
                      className="w-12 h-12 rounded-full bg-purple-100"
                    />
                    <div className="flex-1 text-left">
                      <h3 className="font-medium text-gray-800">
                        {companion.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Level {companion.level} {companion.type}
                      </p>
                    </div>
                    {selectedCompanion.id === companion.id && (
                      <Crown className="w-5 h-5 text-purple-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Unlock New */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 
              rounded-xl shadow-lg p-6 text-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-semibold">Unlock New Companion</h2>
              </div>
              <p className="text-purple-100 mb-4">
                Complete more activities to unlock new companion types and personalities!
              </p>
              <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                <div 
                  className="h-full bg-white rounded-full"
                  style={{ width: '65%' }}
                />
              </div>
              <p className="text-sm text-purple-100">
                65% progress to next unlock
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Customization Modal */}
      {isCustomizing && (
        <CompanionCustomizer
          companion={selectedCompanion}
          onClose={() => setIsCustomizing(false)}
          onSave={(updatedCompanion) => {
            setSelectedCompanion(updatedCompanion);
            setIsCustomizing(false);
          }}
        />
      )}
    </div>
  );
}