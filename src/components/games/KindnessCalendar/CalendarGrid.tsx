import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Lock, CheckCircle2 } from 'lucide-react';
import type { Challenge } from './types';

type Props = {
  challenges: Challenge[];
  completedChallenges: number[];
  currentDay: number;
  onDayClick: (day: number) => void;
  isUnlocked: (day: number) => boolean;
};

export default function CalendarGrid({
  challenges,
  completedChallenges,
  currentDay,
  onDayClick,
  isUnlocked
}: Props) {
  return (
    <div className="grid grid-cols-5 gap-4">
      {challenges.map((challenge, index) => {
        const day = index + 1;
        const isCompleted = completedChallenges.includes(day);
        const unlocked = isUnlocked(day);

        return (
          <motion.button
            key={day}
            onClick={() => onDayClick(day)}
            className={`aspect-square rounded-xl p-4 relative overflow-hidden
              transition-all ${
              isCompleted
                ? 'bg-green-100'
                : unlocked
                  ? 'bg-white hover:bg-purple-50'
                  : 'bg-gray-100 cursor-not-allowed'
            }`}
            whileHover={unlocked && !isCompleted ? { scale: 1.05 } : {}}
            whileTap={unlocked && !isCompleted ? { scale: 0.95 } : {}}
          >
            {/* Snow Pattern Background */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-current rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <div className="text-2xl font-bold mb-2">{day}</div>
              {isCompleted ? (
                <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto" />
              ) : unlocked ? (
                <Gift className="w-6 h-6 text-purple-600 mx-auto" />
              ) : (
                <Lock className="w-6 h-6 text-gray-400 mx-auto" />
              )}
            </div>

            {/* Unlock Countdown */}
            {!unlocked && (
              <div className="absolute inset-x-0 bottom-2 text-center text-xs text-gray-500">
                {Math.ceil((day - currentDay) / 1)} days
              </div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}