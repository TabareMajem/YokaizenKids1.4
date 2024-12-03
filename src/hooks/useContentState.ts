import { create } from 'zustand';
import type { Content } from '../types/content';

type ContentState = {
  contents: Content[];
  setContents: (contents: Content[]) => void;
};

export const useContentState = create<ContentState>((set) => ({
  contents: [],
  setContents: (contents) => set({ contents })
}));