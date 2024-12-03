import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import PathNode from './PathNode';
import MilestoneDetail from './MilestoneDetail';
import JournalScreen from './JournalScreen';
import RewardScreen from './RewardScreen';
import type { Milestone } from './types';

const milestones: Milestone[] = [
  {
    id: 1,
    title: 'Understanding Emotions',
    description: 'Learn to identify and name different emotions through fun activities and stories.',
    status: 'completed',
    theme: 'star',
    position: { x: 50, y: 80 }
  },
  {
    id: 2,
    title: 'Express Yourself',
    description: 'Create your own emotion journal and discover creative ways to share your feelings.',
    status: 'current',
    theme: 'cloud',
    position: { x: 25, y: 60 }
  },
  {
    id: 3,
    title: 'Empathy Explorer',
    description: 'Step into others\' shoes and learn how to understand and support their feelings.',
    status: 'unlocked',
    theme: 'island',
    position: { x: 75, y: 40 }
  },
  {
    id: 4,
    title: 'Emotion Detective',
    description: 'Become an expert at spotting emotions in stories and real-life situations.',
    status: 'locked',
    theme: 'star',
    position: { x: 40, y: 20 }
  }
];

export default function PathView() {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [activeScreen, setActiveScreen] = useState<'path' | 'journal'>('path');
  const [activeMilestone, setActiveMilestone] = useState<Milestone | null>(null);
  const [showReward, setShowReward] = useState(false);
  
  const completedCount = milestones.filter(m => m.status === 'completed').length;
  const progress = (completedCount / milestones.length) * 100;
  const currentMilestone = milestones.find(m => m.status === 'current');

  const handleStartActivity = (milestone: Milestone) => {
    setSelectedMilestone(null);
    setActiveMilestone(milestone);
    setActiveScreen('journal');
  };

  const handleCompleteActivity = () => {
    // Show reward screen
    setShowReward(true);

    // Update milestone status
    const updatedMilestones = milestones.map(m => {
      if (m.id === activeMilestone?.id) {
        return { ...m, status: 'completed' as const };
      }
      if (m.status === 'locked' && milestones.find(prev => 
        prev.id === m.id - 1 && prev.id === activeMilestone?.id
      )) {
        return { ...m, status: 'current' as const };
      }
      return m;
    });

    // Update milestones state (in a real app, this would be handled by a state management solution)
    milestones.splice(0, milestones.length, ...updatedMilestones);
  };

  const handleShareProgress = () => {
    // Implement share functionality
    console.log('Sharing progress...');
  };

  const handleCloseReward = () => {
    setShowReward(false);
    setActiveScreen('path');
    setActiveMilestone(null);
  };

  if (activeScreen === 'journal' && activeMilestone) {
    return (
      <JournalScreen
        milestone={activeMilestone}
        onBack={() => setActiveScreen('path')}
        onComplete={handleCompleteActivity}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-100 via-blue-100 to-pink-100 overflow-hidden">
      {/* Rest of the PathView component remains the same */}
      {/* ... */}

      {/* Reward Screen */}
      <RewardScreen
        milestone={activeMilestone!}
        xpEarned={100}
        isOpen={showReward}
        onClose={handleCloseReward}
        onShare={handleShareProgress}
      />
    </div>
  );
}