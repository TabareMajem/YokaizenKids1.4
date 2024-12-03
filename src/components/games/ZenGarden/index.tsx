import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Star, Cloud } from 'lucide-react';
import CanvasPanel from './CanvasPanel';
import ElementPalette from './ElementPalette';
import ReflectionBox from './ReflectionBox';
import { useGameState } from './useGameState';

export default function ZenGarden() {
  const {
    elements,
    addElement,
    moveElement,
    removeElement,
    score,
    reflection,
    setReflection,
    completeDesign
  } = useGameState();

  const [showReflection, setShowReflection] = useState(false);

  const handleElementAdd = (type: string) => {
    addElement({
      id: Date.now().toString(),
      type,
      position: { x: 50, y: 50 },
      rotation: 0
    });
  };

  const handleComplete = () => {
    if (reflection) {
      completeDesign();
      setShowReflection(false);
    } else {
      setShowReflection(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Zen Garden Builder</h1>
            <p className="text-gray-600">Create your peaceful space</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-amber-600">
              <Star className="w-5 h-5" />
              <span className="font-medium">{score} points</span>
            </div>
            <button
              onClick={handleComplete}
              className="px-4 py-2 bg-stone-600 text-white rounded-lg
                hover:bg-stone-700 transition-colors flex items-center gap-2"
            >
              <Heart className="w-5 h-5" />
              Complete Design
            </button>
          </div>
        </div>

        {/* Garden Canvas */}
        <div className="relative aspect-[16/9] bg-stone-100 rounded-xl shadow-lg 
          overflow-hidden mb-6">
          <CanvasPanel
            elements={elements}
            onElementMove={moveElement}
            onElementRemove={removeElement}
          />
        </div>

        {/* Element Palette */}
        <ElementPalette onElementSelect={handleElementAdd} />

        {/* Reflection Modal */}
        <AnimatePresence>
          {showReflection && (
            <ReflectionBox
              onSubmit={(text) => {
                setReflection(text);
                setShowReflection(false);
                completeDesign();
              }}
              onClose={() => setShowReflection(false)}
            />
          )}
        </AnimatePresence>

        {/* Success Animation */}
        <AnimatePresence>
          {score > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed bottom-6 right-6 px-4 py-2 bg-green-500 text-white
                rounded-lg shadow-lg flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Design Saved!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}