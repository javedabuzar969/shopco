import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { CartItem } from "./data";

type CartCtx = {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string, color: string, size: string) => void;
  updateQty: (id: string, color: string, size: string, delta: number) => void;
  clearCart: () => void;
};

const Ctx = createContext<CartCtx>(null!);

function load(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem("shopco_cart") ?? "[]");
  } catch {
    return [];
  }
}

function save(items: CartItem[]) {
  localStorage.setItem("shopco_cart", JSON.stringify(items));
}

function calcTotal(items: CartItem[]) {
  return items.reduce((s, i) => s + i.cost * i.quantity, 0);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(load);

  useEffect(() => save(items), [items]);

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const total = calcTotal(items);

  function addItem(item: CartItem) {
    setItems((prev) => {
      const idx = prev.findIndex(
        (p) => p.id === item.id && p.color === item.color && p.size === item.size
      );
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + item.quantity };
        return next;
      }
      return [...prev, item];
    });
  }

  function removeItem(id: string, color: string, size: string) {
    setItems((prev) =>
      prev.filter((p) => !(p.id === id && p.color === color && p.size === size))
    );
  }

  function updateQty(id: string, color: string, size: string, delta: number) {
    setItems((prev) =>
      prev
        .map((p) =>
          p.id === id && p.color === color && p.size === size
            ? { ...p, quantity: p.quantity + delta }
            : p
        )
        .filter((p) => p.quantity > 0)
    );
  }

  function clearCart() {
    setItems([]);
  }

  return (
    <Ctx.Provider value={{ items, count, total, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  return useContext(Ctx);
}
