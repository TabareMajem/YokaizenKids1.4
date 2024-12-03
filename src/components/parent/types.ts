import { type LucideIcon } from 'lucide-react';

export type MilestoneStatus = 'completed' | 'current' | 'upcoming';

export type ChildMilestone = {
  id: number;
  title: string;
  description: string;
  status: MilestoneStatus;
  progress?: number;
  startedAt?: string;
  completedAt?: string;
  badges?: string[];
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  earnedAt: string;
};

export type Activity = {
  id: number;
  title: string;
  description: string;
  duration: string;
  type: 'reading' | 'discussion' | 'interactive' | 'creative';
  icon: LucideIcon;
};