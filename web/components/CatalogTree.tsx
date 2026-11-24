"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./CatalogTree.module.css";
import { useCart } from "./CartProvider";

type Item = { name: string; price: number; note: string; position: string };
type Institution = { name: string; palette: string; items: Item[] };
const set = (name: string, price: number, note: string, position: string): Item => ({ name, price, note, position });
const catalog: Record<string, { label: string; image: string; institutions: Institution[] }> = {
  school: { label: "School", image: "/images/school-uniform-looks.png", institutions: [
    { name: "School A", palette: "#f59e0b", items: [set("Short-sleeve shirt", 1050, "Easy-care white shirt with crest placement.", "0%"), set("Tailored trousers", 1850, "Durable formal trouser with adjustable waist.", "33%"), set("Formal blazer", 4850, "Navy blazer, contrast piping and school crest space.", "0%")] },
    { name: "School B", palette: "#991b1b", items: [set("Daily shirt set", 2350, "White shirt and tailored grey bottom.", "33%"), set("Formal blazer", 4650, "Maroon blazer, striped tie and grey trouser.", "33%"), set("Winter knitwear", 2150, "Soft V-neck sweater with contrast trim.", "66%")] },
    { name: "School C", palette: "#166534", items: [set("Winter sweater set", 3250, "Forest knit, white shirt and formal trouser.", "66%"), set("Sports tracksuit", 3600, "All-weather jacket and matching track bottom.", "100%"), set("Formal blazer", 4850, "Crest-ready navy blazer for formal days.", "0%")] },
    { name: "School D", palette: "#1d4ed8", items: [set("Sports tracksuit", 3600, "Charcoal performance jacket with blue panels.", "100%"), set("Formal blazer", 4850, "Custom piping and crest-ready navy blazer.", "0%"), set("Daily shirt", 1050, "Breathable white shirt for everyday wear.", "33%")] },
  ] },
  college: { label: "College", image: "/images/college-uniform-looks.png", institutions: [
    { name: "College A", palette: "#1e3a8a", items: [set("College formal set", 5250, "Navy tailored blazer, shirt, tie and trouser.", "0%"), set("College polo kit", 2650, "Blue performance polo and track bottom.", "100%"), set("Campus cardigan", 3150, "Layered knitwear in your institutional colour.", "33%")] },
    { name: "College B", palette: "#7f1d1d", items: [set("Cardigan & skirt set", 4450, "Maroon cardigan, bow and pleated skirt.", "33%"), set("Formal blazer", 5250, "Navy formal collection for occasions.", "0%"), set("College shirt", 1150, "Crisp shirt designed for repeat washing.", "66%")] },
    { name: "College C", palette: "#374151", items: [set("Lab coat set", 3850, "Charcoal lab coat over formal attire.", "66%"), set("College formal set", 5250, "Custom college blazer and tie collection.", "0%"), set("Athletic polo", 1650, "Technical polo for club and sports use.", "100%")] },
    { name: "College D", palette: "#2563eb", items: [set("Athletic polo kit", 2650, "Blue technical polo and track bottom.", "100%"), set("Cardigan & skirt set", 4450, "Layered winter set with custom colours.", "33%"), set("College blazer", 5250, "Formal blazer with crest and piping options.", "0%")] },
  ] },
  hospital: { label: "Hospital", image: "/images/uniform-world-sectors.png", institutions: [
    { name: "Hospital A", palette: "#0f766e", items: [set("Nurse scrub set", 2950, "Teal scrub top and trouser for clinical teams.", "100%"), set("Doctor coat", 3400, "Crisp consultation coat with embroidery space.", "66%"), set("Theatre cap pack", 550, "Colour-coded caps for theatre teams.", "100%")] },
    { name: "Hospital B", palette: "#1d4ed8", items: [set("Doctor coat", 3400, "White coat for doctors and laboratory staff.", "66%"), set("Nurse scrub set", 2950, "Colour-coded scrubs for department teams.", "100%"), set("Patient-care tunic", 2450, "Comfortable tunic for front-line care teams.", "100%")] },
    { name: "Hospital C", palette: "#be123c", items: [set("Department scrubs", 3150, "Department-colour scrub system with ID embroidery.", "100%"), set("Patient-care coat", 3600, "Durable coat with pocket configuration.", "66%"), set("Reception tunic", 2750, "Smart front-desk uniform with logo placement.", "100%")] },
    { name: "Hospital D", palette: "#0369a1", items: [set("Theatre scrub set", 3250, "Breathable scrub set for long clinical shifts.", "100%"), set("Doctor coat", 3400, "Professional outer layer with hospital identity.", "66%"), set("Nurse scrub set", 2950, "Easy-care daily scrub set.", "100%")] },
  ] },
};
const money = (amount: number) => `NPR ${amount.toLocaleString("en-IN")}`;

export function CatalogTree() {
  const [category, setCategory] = useState("school");
  const [institution, setInstitution] = useState(0);
  const { items, addItem, setQuantity, itemCount } = useCart();
  const current = catalog[category];
  const client = current.institutions[institution];
  const idFor = (item: Item) => `${category}-${client.name}-${item.name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return <section className={styles.catalogTree} id="catalogue">
    <div className="tree-tabs">{Object.entries(catalog).map(([key, value]) => <button className={key === category ? "active" : ""} onClick={() => { setCategory(key); setInstitution(0); }} key={key}>{value.label}</button>)}</div>
    <div className="tree-layout"><aside><p>INSTITUTION LIST</p>{current.institutions.map((entry, i) => <button style={{ "--swatch": entry.palette } as React.CSSProperties} className={i === institution ? "selected" : ""} onClick={() => setInstitution(i)} key={entry.name}><i />{entry.name}<span>→</span></button>)}</aside>
      <div className="tree-content"><div className="tree-heading"><p>{current.label} · {client.name}</p><h2>Choose the uniform<br />programme.</h2><span>Select each piece, adjust its quantity in your basket, then move securely to checkout. Prices are per item and include standard finishing.</span></div>
        <div className="uniform-cards">{client.items.map((item, i) => { const id = idFor(item); const selected = items.find((entry) => entry.id === id); const itemData = { id, category: current.label, institution: client.name, name: item.name, unitPrice: item.price, image: current.image, position: item.position }; return <article key={item.name}><div className="catalog-image"><img src={current.image} alt={`${client.name} ${item.name}`} style={{ objectPosition: `${item.position} center` }} /></div><div><small>{String(i + 1).padStart(2, "0")}</small><h3>{item.name}</h3><p>{item.note}</p><strong>{money(item.price)}</strong><div className="purchase-row">{selected && <div className="quantity" aria-label={`${item.name} quantity`}><button onClick={() => setQuantity(id, selected.quantity - 1)} aria-label={`Remove one ${item.name}`}>−</button><b>{selected.quantity}</b><button onClick={() => addItem(itemData)} aria-label={`Add one ${item.name}`}>+</button></div>}<button className="add" onClick={() => addItem(itemData)}>{selected ? "Add another" : "Add to basket"}</button></div></div></article>; })}</div>
        <div className="catalog-actions"><Link href="/quote" className="catalog-quote">Request {client.name} quotation <b>↗</b></Link><Link href="/cart" className="basket-link">Basket <b>{itemCount}</b> →</Link></div>
      </div>
    </div>
  </section>;
}
