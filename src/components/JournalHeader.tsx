import React from 'react';
import { Sparkles } from 'lucide-react';

const quotes = [
  "Today is a new adventure!",
  "Your story matters!",
  "You're doing amazing!",
  "Every feeling is valid!",
  "Let's create something awesome!"
];

export default function JournalHeader() {
  const todayQuote = quotes[Math.floor(Math.random() * quotes.length)];
  
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-400 via-pink-300 to-blue-300 p-8 mb-6">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-purple-700" />
          <h1 className="text-2xl font-bold text-purple-900">MangaChat Journal</h1>
        </div>
        <p className="text-lg italic text-purple-800">{todayQuote}</p>
      </div>
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
    </div>
  );
}