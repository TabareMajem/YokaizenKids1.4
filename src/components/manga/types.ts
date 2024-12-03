export type SpeechBubbleData = {
  id: string;
  text: string;
  position: { x: number; y: number };
  type: 'speech' | 'thought';
};

export type PanelData = {
  id: string;
  imageUrl: string;
  speechBubbles: SpeechBubbleData[];
};