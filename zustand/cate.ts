import { create } from "zustand";

export const useCateStore = create((set: any) => ({
  cates: [],
  setCates: (value: []) =>
    set((state: any) => ({
      ...state,
      cates: value,
    })),
}));
