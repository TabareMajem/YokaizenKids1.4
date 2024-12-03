import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Sparkles, 
  Pencil, 
  Send,
  Smile,
  Meh,
  Frown,
  Heart,
  Star,
  CloudSun
} from 'lucide-react';
import type { Milestone } from './types';

type Mood = {
  icon: typeof Smile;
  label: string;
  color: string;
  description: string;
};

const moods: Mood[] = [
  { 
    icon: Smile, 
    label: 'Happy', 
    color: 'text-yellow-500 hover:text-yellow-600',
    description: 'Feeling great and positive!'
  },
  { 
    icon: Heart, 
    label: 'Loved', 
    color: 'text-pink-500 hover:text-pink-600',
    description: 'Feeling cared for and appreciated'
  },
  { 
    icon: Star, 
    label: 'Excited', 
    color: 'text-purple-500 hover:text-purple-600',
    description: 'Full of energy and enthusiasm'
  },
  { 
    icon: CloudSun, 
    label: 'Calm', 
    color: 'text-blue-500 hover:text-blue-600',
    description: 'Peaceful and relaxed'
  },
  { 
    icon: Meh, 
    label: 'Okay', 
    color: 'text-gray-500 hover:text-gray-600',
    description: 'Neither good nor bad'
  },
  { 
    icon: Frown, 
    label: 'Sad', 
    color: 'text-indigo-500 hover:text-indigo-600',
    description: 'Feeling down or upset'
  }
];

const prompts = [
  "What made you smile today?",
  "Share a moment that made you feel proud",
  "Tell me about something kind you did",
  "What's something you learned about yourself?",
  "Describe a challenge you faced today"
];

type Props = {
  milestone: Milestone;
  onBack: () => void;
  onComplete: () => void;
};

export default function JournalScreen({ milestone, onBack, onComplete }: Props) {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [journalText, setJournalText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedMood || !journalText.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    onComplete();
  };

  const getRandomPrompt = () => {
    return prompts[Math.floor(Math.random() * prompts.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-purple-100 z-10">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="p-2 hover:bg-purple-50 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-purple-600" />
            </button>
            <div className="ml-4">
              <h1 className="text-lg font-semibold text-purple-900">
                {milestone.title}
              </h1>
              <div className="flex items-center gap-1 text-sm text-purple-600">
                <Pencil className="w-4 h-4" />
                <span>Journal Entry</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Mood Selector */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            How are you feeling?
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {moods.map(({ icon: Icon, label, color, description }) => (
              <motion.button
                key={label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedMood(label)}
                className={`flex flex-col items-center p-3 rounded-xl transition-all
                  ${selectedMood === label 
                    ? 'bg-purple-100 ring-2 ring-purple-400 ring-offset-2' 
                    : 'hover:bg-purple-50'
                  }`}
              >
                <Icon className={`w-8 h-8 ${color} mb-2`} />
                <span className="text-sm font-medium text-gray-700">
                  {label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Journal Entry */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                Let's Reflect
              </h2>
              <p className="text-gray-600">
                {getRandomPrompt()}
              </p>
            </div>
          </div>

          <textarea
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            placeholder="Write your thoughts here..."
            className="w-full h-48 p-4 mt-4 rounded-xl border-2 border-purple-100 
              focus:border-purple-400 focus:ring focus:ring-purple-200 
              focus:ring-opacity-50 resize-none"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={!selectedMood || !journalText.trim() || isSubmitting}
          className={`w-full py-4 px-6 rounded-xl font-semibold
            flex items-center justify-center gap-2 transition-all
            ${(!selectedMood || !journalText.trim() || isSubmitting)
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl'
            }`}
        >
          {isSubmitting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Complete & Proceed
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}