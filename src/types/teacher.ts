export type Student = {
  id: string;
  name: string;
  email?: string;
  grade: string;
  avatar?: string;
  accessCode: string;
  parentEmail?: string;
  parentInviteStatus: 'pending' | 'sent' | 'accepted' | 'expired';
  parentInviteSentAt?: string;
  classId?: string;
  progress?: {
    completedActivities: number;
    totalActivities: number;
    lastActivityDate?: string;
  };
  scores?: {
    victim: number;
    bystander: number;
    perpetrator: number;
  };
  lastAssessment?: string;
  status: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
};

export type Class = {
  id: string;
  name: string;
  grade: string;
  academicYear: string;
  teacherId: string;
  students: Student[];
  schedule: ClassSchedule[];
  createdAt: string;
  updatedAt: string;
};

export type ClassSchedule = {
  id: string;
  classId: string;
  activityType: 'assessment' | 'discussion' | 'exercise';
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  recurrence?: 'none' | 'daily' | 'weekly' | 'monthly';
  createdAt: string;
  updatedAt: string;
};

export type ParentInvitation = {
  id: string;
  studentId: string;
  email: string;
  status: 'pending' | 'sent' | 'accepted' | 'expired';
  token: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
};