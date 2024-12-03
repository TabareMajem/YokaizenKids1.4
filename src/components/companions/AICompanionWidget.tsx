import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Brain, Sparkles } from 'lucide-react';

type Props = {
  mood: string;
};

export default function AICompanionWidget({ mood }: Props) {
  const getCompanionMessage = () => {
    if (!mood) return "Hi! How are you feeling today?";
    
    switch (mood.toLowerCase()) {
      case 'happy':
        return "Your happiness is contagious! Want to create something amazing together?";
      case 'sad':
        return "I'm here for you. Would you like to talk about what's bothering you?";
      case 'excited':
        return "Your energy is wonderful! Let's channel it into something creative!";
      default:
        return "I'm here to support you. What would you like to do today?";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-start gap-4">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 
            rounded-full flex items-center justify-center"
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>

        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Your AI Companion
          </h2>
          <p className="text-gray-600 mb-4">{getCompanionMessage()}</p>
          
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg 
              hover:bg-purple-100 transition-colors flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Chat Now
            </button>
            <button className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg 
              hover:bg-purple-100 transition-colors flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Get Advice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}