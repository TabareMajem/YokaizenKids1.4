import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Wand2, Languages, Volume2, AlertCircle } from 'lucide-react';
import { generateContent, generateAudio } from '../../../services/ai/contentGeneration';
import type { ContentGenerationOptions } from '../../../services/ai/contentGeneration';

type Props = {
  onContentGenerated: (content: string) => void;
};

export default function AIContentGenerator({ onContentGenerated }: Props) {
  const [prompt, setPrompt] = useState('');
  const [options, setOptions] = useState<ContentGenerationOptions>({
    type: 'activity',
    ageRange: [5, 12],
    language: 'en',
    topic: '',
    tone: 'playful'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || !options.topic.trim()) return;

    setIsGenerating(true);
    setError(null);
    try {
      const content = await generateContent(prompt, options);
      onContentGenerated(content);

      // Generate audio version if content is not too long
      if (content.length <= 1000) {
        const audio = await generateAudio(content, options.language);
        setGeneratedAudio(audio);
      }
    } catch (err) {
      setError('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Wand2 className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            AI Content Generator
          </h3>
          <p className="text-sm text-gray-600">
            Describe what you want to create and let AI help you
          </p>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content Type
          </label>
          <select
            value={options.type}
            onChange={(e) => setOptions(prev => ({ 
              ...prev, 
              type: e.target.value as ContentGenerationOptions['type']
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
          >
            <option value="activity">Activity</option>
            <option value="prompt">Prompt</option>
            <option value="lesson">Lesson</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Language
          </label>
          <select
            value={options.language}
            onChange={(e) => setOptions(prev => ({ 
              ...prev, 
              language: e.target.value as ContentGenerationOptions['language']
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
          >
            <option value="en">English</option>
            <option value="ja">Japanese</option>
            <option value="es">Spanish</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Topic
          </label>
          <input
            type="text"
            value={options.topic}
            onChange={(e) => setOptions(prev => ({ 
              ...prev, 
              topic: e.target.value
            }))}
            placeholder="e.g., Emotional Awareness"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tone
          </label>
          <select
            value={options.tone}
            onChange={(e) => setOptions(prev => ({ 
              ...prev, 
              tone: e.target.value as ContentGenerationOptions['tone']
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
          >
            <option value="playful">Playful</option>
            <option value="educational">Educational</option>
            <option value="encouraging">Encouraging</option>
          </select>
        </div>
      </div>

      {/* Prompt Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Prompt
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want to generate..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-purple-200 focus:border-purple-400
            resize-none"
          rows={4}
        />
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2"
        >
          <AlertCircle className="w-5 h-5" />
          {error}
        </motion.div>
      )}

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={!prompt.trim() || !options.topic.trim() || isGenerating}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors
          flex items-center justify-center gap-2 ${
          isGenerating || !prompt.trim() || !options.topic.trim()
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
      >
        {isGenerating ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
            Generating...
          </>
        ) : (
          <>
            <Wand2 className="w-5 h-5" />
            Generate Content
          </>
        )}
      </button>

      {/* Audio Preview */}
      {generatedAudio && (
        <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
          <Volume2 className="w-5 h-5 text-purple-600" />
          <audio controls className="flex-1">
            <source src={generatedAudio} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}