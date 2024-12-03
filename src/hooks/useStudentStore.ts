import { create } from 'zustand';
import type { Student } from '../types/teacher';

type StudentStore = {
  students: Student[];
  addStudent: (student: Student) => void;
  updateStudent: (id: string, data: Partial<Student>) => void;
  removeStudent: (id: string) => void;
};

export const useStudentStore = create<StudentStore>((set) => ({
  students: [],
  addStudent: (student) => set((state) => ({
    students: [...state.students, student]
  })),
  updateStudent: (id, data) => set((state) => ({
    students: state.students.map(student =>
      student.id === id ? { ...student, ...data } : student
    )
  })),
  removeStudent: (id) => set((state) => ({
    students: state.students.filter(student => student.id !== id)
  }))
}));