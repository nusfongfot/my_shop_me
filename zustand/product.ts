import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useProductsStore = create((set: any) => ({
  products: [],
  setProducts: (value: any[]) =>
    set((state: any) => ({
      ...state,
      products: value,
    })),
}));

export const useTotalStore = create((set: any) => ({
  total: 0,
  setTotal: (value: number) =>
    set((state: any) => ({
      ...state,
      total: value,
    })),
}));

interface CartStore {
  cartItems: any[];
  setCartItems: (value: any[]) => void;
  addToCartStore: (item: any) => void;
  emptyCartStore: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartItems: [],
      setCartItems: (value: any[]) =>
        set((state: any) => ({
          ...state,
          cartItems: value,
        })),
      addToCartStore: (item) =>
        set((state) => ({ cartItems: [item, ...state.cartItems] })),
      emptyCartStore: () => set((state) => ({ cartItems: [] })),
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
