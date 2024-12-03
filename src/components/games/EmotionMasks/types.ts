export type EmotionMask = {
  id: string;
  emotion: string;
  overlayUrl: string;
  features: Array<{
    position: {
      x: number;
      y: number;
    };
    size: number;
    animation: any;
  }>;
};

export type GamePrompt = {
  id: string;
  title: string;
  description: string;
  targetEmotion: string;
};