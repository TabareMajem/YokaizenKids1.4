import React, { useState } from 'react';
import ARViewer from './ARViewer';
import BreathingExercise from './activities/BreathingExercise';
import { emotionCards } from './EmotionCards';
import type { EmotionCard } from './types';

export default function ARContainer() {
  const [currentActivity, setCurrentActivity] = useState<string | null>(null);
  const [detectedCard, setDetectedCard] = useState<EmotionCard | null>(null);

  const handleCardDetected = (card: EmotionCard) => {
    setDetectedCard(card);
  };

  const handleActivityTriggered = (activity: string) => {
    setCurrentActivity(activity);
  };

  const handleActivityComplete = () => {
    setCurrentActivity(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Emotion Animals</h2>
        <p className="text-gray-600">
          Hold up an emotion card to see your animal friend come to life!
        </p>
      </div>

      <div className="relative">
        <ARViewer
          onCardDetected={handleCardDetected}
          onActivityTriggered={handleActivityTriggered}
        />

        {/* Activity Overlay */}
        {currentActivity && (
          <div className="absolute inset-0 bg-white rounded-xl shadow-lg">
            {currentActivity === 'Deep Breathing' && (
              <BreathingExercise onComplete={handleActivityComplete} />
            )}
            {/* Add more activity components as needed */}
          </div>
        )}
      </div>
    </div>
  );
}