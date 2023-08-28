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

interface CartStore {
  cartItems: any[];
  addToCartStore: (item: any) => void;
  emptyCartStore: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartItems: [],
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
