import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  onPrevious: () => void;
  onNext: () => void;
  currentPanel: number;
  totalPanels: number;
  className?: string;
};

export default function Navigation({ 
  onPrevious, 
  onNext, 
  currentPanel, 
  totalPanels,
  className = ''
}: Props) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <button
        onClick={onPrevious}
        disabled={currentPanel === 0}
        className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg
          disabled:opacity-50 disabled:cursor-not-allowed
          hover:bg-purple-100 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-purple-600" />
      </button>
      
      <div className="text-sm font-medium text-purple-600 bg-white/90 
        backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
        {currentPanel + 1} / {totalPanels}
      </div>
      
      <button
        onClick={onNext}
        disabled={currentPanel === totalPanels - 1}
        className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg
          disabled:opacity-50 disabled:cursor-not-allowed
          hover:bg-purple-100 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-purple-600" />
      </button>
    </div>
  );
}