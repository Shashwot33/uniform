"use client";

import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Nav } from "../../components/Nav";
import { useCart } from "../../components/CartProvider";
import styles from "../commerce.module.css";

const money = (amount: number) => `NPR ${amount.toLocaleString("en-IN")}`;

export default function CartPage() {
  const { items, subtotal, setQuantity, removeItem } = useCart();
  return <><Nav /><main className={styles.page}><header className={styles.heading}><p>YOUR SELECTION</p><h1>Basket</h1><span>Review each institution-specific uniform before checkout.</span></header>{items.length === 0 ? <section className={styles.empty}><h2>Your basket is empty.</h2><p>Start with a category, choose an institution, and add every piece you need.</p><Link href="/products">Browse uniforms →</Link></section> : <section className={styles.layout}><div className={styles.lines}>{items.map((item) => <article key={item.id} className={styles.line}><div className={styles.thumb}><img src={item.image} alt="" style={{ objectPosition: `${item.position} center` }} /></div><div className={styles.lineInfo}><p>{item.category} · {item.institution}</p><h2>{item.name}</h2><strong>{money(item.unitPrice)}</strong></div><div className={styles.lineControls}><div className={styles.counter}><button onClick={() => setQuantity(item.id, item.quantity - 1)}>−</button><b>{item.quantity}</b><button onClick={() => setQuantity(item.id, item.quantity + 1)}>+</button></div><button className={styles.remove} onClick={() => removeItem(item.id)}>Remove</button></div><strong className={styles.lineTotal}>{money(item.unitPrice * item.quantity)}</strong></article>)}</div><aside className={styles.summary}><p>ORDER SUMMARY</p><div><span>Items subtotal</span><b>{money(subtotal)}</b></div><div><span>Delivery</span><b>Confirmed at checkout</b></div><hr /><div className={styles.grand}><span>Total</span><b>{money(subtotal)}</b></div><Link href="/checkout">Continue to payment →</Link><small>Prices are in NPR. Delivery and any approved customisation are confirmed before fulfilment.</small></aside></section>}</main><Footer /></>;
}
