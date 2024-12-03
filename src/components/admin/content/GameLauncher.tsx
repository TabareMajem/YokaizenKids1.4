import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowLeft } from 'lucide-react';
import GameRouter from './GameRouter';
import type { Content } from '../../../types/content';

type Props = {
  game: Content;
  onBack: () => void;
};

export default function GameLauncher({ game, onBack }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Content
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              {game.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GameRouter gameType={game.metadata?.gameConfig?.type || ''} />
      </div>
    </div>
  );
}