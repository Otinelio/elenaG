import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

type CartState = {
  items: CartItem[];
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (i: Omit<CartItem, "qty">) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      open: false,
      setOpen: (v) => set({ open: v }),
      add: (i) =>
        set((s) => {
          const existing = s.items.find((x) => x.id === i.id);
          if (existing) {
            return {
              items: s.items.map((x) =>
                x.id === i.id ? { ...x, qty: x.qty + 1 } : x,
              ),
            };
          }
          return { items: [...s.items, { ...i, qty: 1 }] };
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((x) => x.id !== id) })),
      setQty: (id, qty) =>
        set((s) => ({
          items:
            qty <= 0
              ? s.items.filter((x) => x.id !== id)
              : s.items.map((x) => (x.id === id ? { ...x, qty } : x)),
        })),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((a, b) => a + b.price * b.qty, 0),
      count: () => get().items.reduce((a, b) => a + b.qty, 0),
    }),
    { name: "elenaG_cart" },
  ),
);
