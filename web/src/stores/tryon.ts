import { create } from "zustand";
export type Mode = "2d" | "photo" | "3d";
export type Selection = { id: string; colour: string; size: string };
type State = { mode: Mode; view: "front" | "back"; selected: Selection[]; setMode: (mode: Mode) => void; setView: (view: "front" | "back") => void; toggle: (item: Selection) => void };
export const useTryOn = create<State>((set) => ({ mode: "2d", view: "front", selected: [{ id: "shirt", colour: "White", size: "28" }, { id: "trousers", colour: "Navy", size: "28" }, { id: "tie", colour: "Navy", size: "One size" }], setMode: mode => set({ mode }), setView: view => set({ view }), toggle: item => set(s => ({ selected: s.selected.some(x => x.id === item.id) ? s.selected.filter(x => x.id !== item.id) : [...s.selected, item] })) }));

