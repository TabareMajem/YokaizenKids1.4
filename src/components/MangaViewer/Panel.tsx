import React from 'react';

export type SpeechBubble = {
  id: string;
  text: string;
  position: { x: number; y: number };
  type: 'speech' | 'thought';
};

export type PanelData = {
  id: string;
  imageUrl: string;
  speechBubbles: SpeechBubble[];
};

type Props = {
  panel: PanelData;
  isActive: boolean;
};

export default function Panel({ panel, isActive }: Props) {
  return (
    <div 
      className={`relative w-full h-full transition-opacity duration-300 ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <img
        src={panel.imageUrl}
        alt="Manga panel"
        className="w-full h-full object-contain"
      />
      {panel.speechBubbles.map((bubble) => (
        <div
          key={bubble.id}
          style={{
            left: `${bubble.position.x}%`,
            top: `${bubble.position.y}%`,
          }}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 
            max-w-[200px] p-4 bg-white rounded-2xl shadow-lg
            ${bubble.type === 'thought' ? 'rounded-full' : 'manga-bubble'}`}
        >
          <p className="text-sm font-comic leading-tight">{bubble.text}</p>
        </div>
      ))}
    </div>
  );
}