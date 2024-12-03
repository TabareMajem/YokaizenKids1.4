export type Position = {
  x: number;
  y: number;
};

export type Milestone = {
  id: string;
  position: Position;
  activityId: string;
  label?: string;
  prerequisites?: string[];
  activity?: Content;
  status: 'locked' | 'unlocked' | 'completed';
  isAIGenerated?: boolean;
};

export type ThematicPath = {
  id: string;
  name: string;
  theme: string;
  backgroundImage: string;
  milestones: Milestone[];
  startDate: string;
  endDate: string;
  grade: string;
  createdBy: string;
  lastModified: Date;
};