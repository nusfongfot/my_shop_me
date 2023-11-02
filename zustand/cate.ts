import { create } from "zustand";

export const useCateStore = create((set: any) => ({
  cates: [] as any,
  setCates: (value: any[]) =>
    set((state: any) => ({
      ...state,
      cates: value,
    })),
}));
