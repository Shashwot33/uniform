import { Link } from "react-router-dom";
import type { Product } from "../../types/product";
import { PriceTag } from "../ui/PriceTag";

const icons: Record<string, string> = { dress: "👗", shirt: "👔", trousers: "👖", tie: "🎀", sweater: "🧶", blazer: "🧥" };
export function ProductCard({ product }: { product: Product }) {
  const from = Math.min(...product.variants.map((variant) => variant.price_npr));
  return <Link to={`/products/${product.id}`} className="product-card"><div className="product-card-art"><span>{icons[product.category] ?? "👕"}</span><p>{product.category}</p></div><div className="product-card-body"><h3>{product.name}</h3><p>{product.variants.length} size options</p><PriceTag amount={from}/></div></Link>;
}
