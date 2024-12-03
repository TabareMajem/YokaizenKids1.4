import React, { useState, useEffect } from 'react';
import Panel, { type PanelData } from './Panel';
import Toolbar from './Toolbar';
import Navigation from './Navigation';

type Props = {
  panels: PanelData[];
  onClose: () => void;
};

export default function MangaViewer({ panels, onClose }: Props) {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0 && currentPanel < panels.length - 1) {
        setCurrentPanel(prev => prev + 1);
      } else if (diff < 0 && currentPanel > 0) {
        setCurrentPanel(prev => prev - 1);
      }
    }
    setTouchStart(null);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' && currentPanel < panels.length - 1) {
      setCurrentPanel(prev => prev + 1);
    } else if (e.key === 'ArrowLeft' && currentPanel > 0) {
      setCurrentPanel(prev => prev - 1);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPanel]);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <div 
        className="w-full h-full max-w-4xl mx-auto relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {panels.map((panel, index) => (
          <div 
            key={panel.id}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentPanel ? 'translate-x-0' : 
              index < currentPanel ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            <Panel panel={panel} isActive={index === currentPanel} />
          </div>
        ))}

        <Navigation
          currentPanel={currentPanel}
          totalPanels={panels.length}
          onPrevious={() => setCurrentPanel(prev => Math.max(0, prev - 1))}
          onNext={() => setCurrentPanel(prev => Math.min(panels.length - 1, prev + 1))}
          className="absolute top-6 left-1/2 transform -translate-x-1/2"
        />

        <Toolbar
          onEditStory={() => console.log('Edit story')}
          onCustomizeVisuals={() => console.log('Customize visuals')}
          onShare={() => console.log('Share')}
        />
      </div>
    </div>
  );
}