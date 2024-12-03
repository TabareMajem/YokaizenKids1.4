import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { PanelData } from './types';

type Props = {
  panels: PanelData[];
  onClose: () => void;
};

export default function MangaViewer({ panels, onClose }: Props) {
  const [currentPanel, setCurrentPanel] = useState(0);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <div className="relative max-w-4xl w-full h-full">
        {panels.map((panel, index) => (
          <div
            key={panel.id}
            className={`absolute inset-0 transition-opacity duration-300
              ${index === currentPanel ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={panel.imageUrl}
              alt={`Panel ${index + 1}`}
              className="w-full h-full object-contain"
            />
            {panel.speechBubbles?.map((bubble) => (
              <div
                key={bubble.id}
                style={{
                  position: 'absolute',
                  left: `${bubble.position.x}%`,
                  top: `${bubble.position.y}%`,
                }}
                className="transform -translate-x-1/2 -translate-y-1/2
                  bg-white/90 backdrop-blur-sm rounded-xl p-4 max-w-[200px]"
              >
                {bubble.text}
              </div>
            ))}
          </div>
        ))}

        {/* Navigation controls */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2
          flex items-center gap-4">
          <button
            onClick={() => setCurrentPanel(prev => Math.max(0, prev - 1))}
            disabled={currentPanel === 0}
            className="p-2 bg-white/20 rounded-full hover:bg-white/30
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <span className="text-white">
            {currentPanel + 1} / {panels.length}
          </span>
          
          <button
            onClick={() => setCurrentPanel(prev => Math.min(panels.length - 1, prev + 1))}
            disabled={currentPanel === panels.length - 1}
            className="p-2 bg-white/20 rounded-full hover:bg-white/30
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-white/20 rounded-full
            hover:bg-white/30"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}