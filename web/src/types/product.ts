export type ProductCategory = "shirt" | "trousers" | "tie" | "sweater" | "blazer" | "dress";

export type ProductVariant = {
  id: string;
  size: string;
  colour: string;
  price_npr: number;
  stock: number;
};

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  variants: ProductVariant[];
  assets: Array<{ thumbnail_url: string | null }>;
};
