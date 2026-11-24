"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Nav } from "../../components/Nav";
import styles from "../commerce.module.css";
const money = (amount: number) => `NPR ${amount.toLocaleString("en-IN")}`;
export default function OrderSuccessPage() { const [receipt, setReceipt] = useState<any>(); useEffect(() => { const saved = localStorage.getItem("uniform-world-receipt"); if (saved) setReceipt(JSON.parse(saved)); }, []); return <><Nav /><main className={styles.page}><section className={styles.receipt}>{receipt ? <><p>ORDER CONFIRMED</p><h1>Thank you, {receipt.customer.name}.</h1><span>Your receipt is ready. {receipt.provider === "cod" ? "Payment will be collected on delivery." : "Your sandbox payment has been recognised for this order."}</span><div className={styles.receiptMeta}><div><small>ORDER NUMBER</small><b>{receipt.id}</b></div><div><small>PAYMENT</small><b>{receipt.provider === "cod" ? "Cash on delivery" : `${receipt.provider} · sandbox`}</b></div><div><small>TOTAL</small><b>{money(receipt.subtotal)}</b></div></div><div className={styles.receiptLines}>{receipt.items.map((item: any) => <div key={item.id}><span>{item.quantity} × {item.name} <small>({item.institution})</small></span><b>{money(item.quantity * item.unitPrice)}</b></div>)}</div><div className={styles.receiptActions}><button onClick={() => window.print()}>Print receipt</button><Link href="/products">Continue shopping →</Link></div></> : <><h1>No receipt found.</h1><Link href="/products">Return to catalogue →</Link></>}</section></main><Footer /></>; }
