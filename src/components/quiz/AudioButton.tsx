import React from 'react';
import { Volume2, Volume1, Loader2 } from 'lucide-react';
import { useTTS } from '../../hooks/useTTS';

type Props = {
  text: string;
  language?: 'en' | 'ja' | 'es';
};

export default function AudioButton({ text, language }: Props) {
  const { speak, stop, isPlaying, isLoading, error } = useTTS();

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    if (isPlaying) {
      stop();
    } else {
      await speak(text, { language });
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`p-2 rounded-full transition-colors cursor-pointer ${
        error
          ? 'bg-red-100 text-red-600 hover:bg-red-200'
          : isPlaying
            ? 'bg-purple-100 text-purple-600 hover:bg-purple-200'
            : 'hover:bg-gray-100'
      }`}
      title={error || 'Play audio'}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick(e as any);
        }
      }}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : isPlaying ? (
        <Volume2 className="w-5 h-5" />
      ) : (
        <Volume1 className="w-5 h-5" />
      )}
    </div>
  );
}