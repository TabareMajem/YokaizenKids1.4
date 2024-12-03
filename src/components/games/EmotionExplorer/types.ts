export type GameOption = {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
};

export type GameScene = {
  id: number;
  character: string;
  emotion: string;
  background: string;
  dialogue: string;
  options: GameOption[];
};