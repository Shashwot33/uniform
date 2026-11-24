import { create } from "zustand";
import type { Garment } from "../lib/catalog";
type CartItem = { garment: Garment; size: string; colour: string; quantity: number };
type Cart = { items: CartItem[]; add: (item: CartItem) => void; total: () => number };
export const useCart = create<Cart>((set, get) => ({ items: [], add: item => set(s => ({ items: [...s.items, item] })), total: () => get().items.reduce((sum, x) => sum + x.garment.price * x.quantity, 0) }));

