import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Gift, Star, Heart } from 'lucide-react';
import CalendarGrid from './CalendarGrid';
import ChallengeModal from './ChallengeModal';
import { useGameState } from './useGameState';
import SnowfallEffect from './SnowfallEffect';

export default function KindnessCalendar() {
  const {
    challenges,
    completedChallenges,
    currentDay,
    score,
    completeChallenge,
    isUnlocked
  } = useGameState();

  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const handleDayClick = (day: number) => {
    if (isUnlocked(day)) {
      setSelectedDay(day);
    }
  };

  const handleCompleteChallenge = (day: number) => {
    completeChallenge(day);
    setSelectedDay(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <SnowfallEffect />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kindness Calendar</h1>
            <p className="text-gray-600">Spread joy with daily acts of kindness</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-purple-600">
              <Star className="w-5 h-5" />
              <span className="font-medium">{score} points</span>
            </div>
            <div className="flex items-center gap-2 text-pink-600">
              <Heart className="w-5 h-5" />
              <span className="font-medium">
                {completedChallenges.length}/25 completed
              </span>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <CalendarGrid
          challenges={challenges}
          completedChallenges={completedChallenges}
          currentDay={currentDay}
          onDayClick={handleDayClick}
          isUnlocked={isUnlocked}
        />

        {/* Challenge Modal */}
        <AnimatePresence>
          {selectedDay !== null && (
            <ChallengeModal
              day={selectedDay}
              challenge={challenges[selectedDay - 1]}
              onComplete={() => handleCompleteChallenge(selectedDay)}
              onClose={() => setSelectedDay(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}