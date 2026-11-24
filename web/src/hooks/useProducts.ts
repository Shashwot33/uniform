import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { catalog } from "../lib/catalog";
import type { Product } from "../types/product";

const fallbackProducts: Product[] = catalog.map((item) => ({
  id: item.id,
  name: item.name,
  category: item.category,
  description: "School-day ready, easy-care uniform.",
  variants: item.sizes.map((size, index) => ({ id: `${item.id}-${index}`, size, colour: item.colour, price_npr: item.price, stock: 10 })),
  assets: []
}));

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: api.products,
    placeholderData: fallbackProducts,
    retry: 1
  });
}
