import { ProductGrid } from "../components/catalog/ProductGrid";
import { SectionHeading } from "../components/ui/SectionHeading";
import { useProducts } from "../hooks/useProducts";
export function Catalog() { const { data = [], isFetching } = useProducts(); return <section><SectionHeading eyebrow="School collection" title="The everyday uniform" description="Browse essential pieces, then choose a colour and size on the product page."/>{isFetching && <p className="catalog-status">Updating catalogue…</p>}<ProductGrid products={data}/></section>; }

