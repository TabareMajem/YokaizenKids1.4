import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Smile } from 'lucide-react';

type Props = {
  companion: {
    name: string;
    personality: string;
  };
};

export default function CompanionChat({ companion }: Props) {
  const [messages, setMessages] = useState<Array<{
    id: string;
    text: string;
    sender: 'user' | 'companion';
    timestamp: Date;
  }>>([
    {
      id: '1',
      text: `Hi! I'm ${companion.name}. How are you feeling today?`,
      sender: 'companion',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    }]);
    setInput('');

    // Simulate companion response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: getCompanionResponse(input),
        sender: 'companion',
        timestamp: new Date()
      }]);
    }, 1000);
  };

  const getCompanionResponse = (userMessage: string) => {
    const responses = [
      "That's interesting! Tell me more about how that makes you feel.",
      "I understand. It's important to acknowledge these emotions.",
      "You're doing great! Remember, every feeling is valid.",
      "Would you like to try a quick mindfulness exercise?",
      "I'm here to listen and support you."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="space-y-4">
      {/* Chat Messages */}
      <div className="h-96 overflow-y-auto p-4 bg-gray-50 rounded-lg">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              } mb-4`}
            >
              <div className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white border border-gray-200'
              }`}>
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-purple-200' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Smile className="w-6 h-6 text-gray-600" />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className={`p-2 rounded-lg transition-colors ${
            input.trim()
              ? 'bg-purple-500 text-white hover:bg-purple-600'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}