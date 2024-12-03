import { useState } from 'react';
import { Howl } from 'howler';
import { generateAudio } from '../services/ai/contentGeneration';

type TTSOptions = {
  language?: 'en' | 'ja' | 'es';
  cacheKey?: string;
};

export function useTTS() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSound, setCurrentSound] = useState<Howl | null>(null);

  const speak = async (text: string, options: TTSOptions = {}) => {
    try {
      setIsLoading(true);
      setError(null);

      // Stop any currently playing audio
      if (currentSound) {
        currentSound.stop();
      }

      // Generate audio using OpenAI's TTS API
      const audioUrl = await generateAudio(text, options.language || 'en');

      // Create and play the sound
      const sound = new Howl({
        src: [audioUrl],
        format: ['mp3'],
        html5: true,
        onend: () => {
          setCurrentSound(null);
        },
        onloaderror: () => {
          setError('Failed to load audio');
          setCurrentSound(null);
        }
      });

      setCurrentSound(sound);
      sound.play();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate speech');
    } finally {
      setIsLoading(false);
    }
  };

  const stop = () => {
    if (currentSound) {
      currentSound.stop();
      setCurrentSound(null);
    }
  };

  const isPlaying = () => {
    return currentSound?.playing() || false;
  };

  return {
    speak,
    stop,
    isPlaying: isPlaying(),
    isLoading,
    error
  };
}