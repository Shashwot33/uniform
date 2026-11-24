export function PriceTag({ amount }: { amount: number }) {
  return <span className="price-tag">NPR {amount.toLocaleString()}</span>;
}
