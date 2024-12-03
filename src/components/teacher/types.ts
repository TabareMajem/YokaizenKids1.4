export type StudentProgress = {
  completed: number;
  inProgress: number;
  notStarted: number;
};

export type TeacherMilestone = {
  id: number;
  title: string;
  description: string;
  theme: 'star' | 'cloud' | 'island';
  position: {
    x: number;
    y: number;
  };
  studentProgress: StudentProgress;
};

export type Student = {
  id: string;
  name: string;
  avatar?: string;
  progress: {
    status: 'completed' | 'in_progress' | 'not_started';
    startedAt?: string;
    completedAt?: string;
  };
};