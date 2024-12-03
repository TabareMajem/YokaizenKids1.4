export type Emotion = {
  name: string;
  intensity: number;
  confidence: number;
};

export type StoryArc = {
  title: string;
  scenes: Scene[];
  theme: string;
  emotionalJourney: string;
};

export type Scene = {
  description: string;
  emotion: string;
  visualPrompt: string;
  dialogues: string[];
};

export type ProcessedJournal = {
  id: string;
  originalText: string;
  emotions: Emotion[];
  storyArc: StoryArc;
  timestamp: string;
};