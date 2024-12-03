export type Location = {
  id: string;
  name: string;
  character: string;
  x: number;
  y: number;
};

export type Puzzle = {
  id: string;
  situation: string;
  proverb: string;
  meaning: string;
  options: string[];
  correctAnswer: string;
};