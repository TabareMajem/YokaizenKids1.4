export type EmotionCard = {
  id: string;
  emotion: string;
  description: string;
  animalType: string;
  activities: string[];
  animations: {
    idle: string;
    happy: string;
    sad: string;
  };
};

export type ARActivity = {
  id: string;
  name: string;
  description: string;
  duration: number;
  type: 'breathing' | 'movement' | 'expression' | 'meditation';
  instructions: string[];
};