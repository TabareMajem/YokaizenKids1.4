import { create } from 'zustand';
import type { User } from '../types/user';

type ParentStore = {
  parents: User[];
  addParent: (parent: User) => void;
  updateParent: (id: string, data: Partial<User>) => void;
  removeParent: (id: string) => void;
  linkStudent: (parentId: string, studentId: string) => void;
  unlinkStudent: (parentId: string, studentId: string) => void;
};

export const useParentStore = create<ParentStore>((set) => ({
  parents: [],
  addParent: (parent) => set((state) => ({
    parents: [...state.parents, parent]
  })),
  updateParent: (id, data) => set((state) => ({
    parents: state.parents.map(parent =>
      parent.id === id ? { ...parent, ...data } : parent
    )
  })),
  removeParent: (id) => set((state) => ({
    parents: state.parents.filter(parent => parent.id !== id)
  })),
  linkStudent: (parentId, studentId) => set((state) => ({
    parents: state.parents.map(parent =>
      parent.id === parentId
        ? { ...parent, studentIds: [...(parent.studentIds || []), studentId] }
        : parent
    )
  })),
  unlinkStudent: (parentId, studentId) => set((state) => ({
    parents: state.parents.map(parent =>
      parent.id === parentId
        ? { ...parent, studentIds: parent.studentIds?.filter(id => id !== studentId) }
        : parent
    )
  }))
}));