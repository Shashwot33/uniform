export type Garment = { id: string; name: string; category: "shirt" | "trousers" | "tie" | "sweater" | "blazer" | "dress"; price: number; colours: string[]; sizes: string[]; colour: string };
export const catalog: Garment[] = [
  { id: "shirt", name: "School Shirt", category: "shirt", price: 950, colours: ["White", "Sky blue"], sizes: ["24", "26", "28", "30", "32"], colour: "White" },
  { id: "trousers", name: "School Trousers", category: "trousers", price: 1350, colours: ["Navy", "Grey"], sizes: ["24", "26", "28", "30", "32"], colour: "Navy" },
  { id: "tie", name: "House Tie", category: "tie", price: 450, colours: ["Navy", "Maroon"], sizes: ["One size"], colour: "Navy" },
  { id: "sweater", name: "V-neck Sweater", category: "sweater", price: 1650, colours: ["Navy", "Maroon"], sizes: ["24", "26", "28", "30", "32"], colour: "Navy" },
  { id: "blazer", name: "School Blazer", category: "blazer", price: 3250, colours: ["Navy"], sizes: ["24", "26", "28", "30", "32"], colour: "Navy" },
  { id: "summer-dress", name: "Summer Check Dress", category: "dress", price: 1850, colours: ["Sky blue"], sizes: ["24", "26", "28", "30", "32"], colour: "Sky blue" },
  { id: "pinafore", name: "Navy Pinafore", category: "dress", price: 2150, colours: ["Navy"], sizes: ["24", "26", "28", "30", "32"], colour: "Navy" }
];

