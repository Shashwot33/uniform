import type { Product } from "../types/product";

const API_URL = import.meta.env.VITE_API_URL ?? "/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers }
  });
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.json() as Promise<T>;
}

export const api = {
  products: () => request<Product[]>("/products"),
  product: (id: string) => request<Product>(`/products/${id}`),
  createOrder: (body: unknown) => request<{ id: string }>("/orders", { method: "POST", body: JSON.stringify(body) })
};
