export type MilestoneStatus = 'locked' | 'unlocked' | 'current' | 'completed';
export type MilestoneTheme = 'star' | 'cloud' | 'island';

export type Milestone = {
  id: number;
  title: string;
  description: string;
  status: MilestoneStatus;
  theme: MilestoneTheme;
  position: {
    x: number;
    y: number;
  };
};