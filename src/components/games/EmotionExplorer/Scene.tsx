import React from 'react';
import { motion } from 'framer-motion';
import type { GameScene } from './types';

type Props = {
  scene: GameScene;
};

export default function Scene({ scene }: Props) {
  return (
    <div className="relative aspect-video bg-white rounded-xl shadow-lg overflow-hidden mb-6">
      {/* Background */}
      <img
        src={`https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1920&h=1080`}
        alt="Scene background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Character */}
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-sm rounded-xl p-6 max-w-xl text-center"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {scene.character}'s Story
          </h2>
          <p className="text-gray-700 text-lg">
            {scene.dialogue}
          </p>
        </motion.div>
      </div>
    </div>
  );
}