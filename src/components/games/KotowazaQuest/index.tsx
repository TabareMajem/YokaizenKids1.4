import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Star, Scroll, Book } from 'lucide-react';
import VillageMap from './VillageMap';
import DialogueBox from './DialogueBox';
import ProverbPuzzle from './ProverbPuzzle';
import { useGameState } from './useGameState';

export default function KotowazaQuest() {
  const {
    score,
    currentLocation,
    currentPuzzle,
    solvedPuzzles,
    selectLocation,
    solvePuzzle
  } = useGameState();

  const [showPuzzle, setShowPuzzle] = useState(false);

  const handleLocationSelect = (locationId: string) => {
    selectLocation(locationId);
    setShowPuzzle(true);
  };

  const handlePuzzleSolve = (answer: string) => {
    const isCorrect = solvePuzzle(answer);
    if (isCorrect) {
      setShowPuzzle(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kotowaza Quest</h1>
            <p className="text-gray-600">Explore Japanese proverbs and wisdom</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-amber-600">
              <Star className="w-5 h-5" />
              <span className="font-medium">{score} points</span>
            </div>
            <div className="flex items-center gap-2 text-purple-600">
              <Scroll className="w-5 h-5" />
              <span className="font-medium">
                {solvedPuzzles.length}/5 proverbs learned
              </span>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="relative aspect-[16/9] bg-amber-100 rounded-xl shadow-lg 
          overflow-hidden mb-6">
          <VillageMap
            currentLocation={currentLocation}
            solvedLocations={solvedPuzzles}
            onLocationSelect={handleLocationSelect}
          />

          {/* Dialogue or Puzzle Overlay */}
          <AnimatePresence>
            {currentLocation && !showPuzzle && (
              <DialogueBox
                location={currentLocation}
                onContinue={() => setShowPuzzle(true)}
              />
            )}
            {showPuzzle && currentPuzzle && (
              <ProverbPuzzle
                puzzle={currentPuzzle}
                onSolve={handlePuzzleSolve}
                onClose={() => setShowPuzzle(false)}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Progress Guide */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Book className="w-5 h-5 text-amber-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              Your Journey
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {solvedPuzzles.map(puzzleId => (
              <div
                key={puzzleId}
                className="p-4 bg-amber-50 rounded-lg"
              >
                <h3 className="font-medium text-gray-800 mb-1">
                  {currentPuzzle?.proverb}
                </h3>
                <p className="text-sm text-gray-600">
                  {currentPuzzle?.meaning}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}