"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Nav } from "../../components/Nav";
import { useCart } from "../../components/CartProvider";
import styles from "../commerce.module.css";

type Payment = "esewa" | "khalti" | "fonepay" | "cod";
const paymentOptions: { id: Payment; name: string; detail: string }[] = [
  { id: "esewa", name: "eSewa", detail: "Pay through your eSewa wallet" },
  { id: "khalti", name: "Khalti", detail: "Pay through Khalti's secure checkout" },
  { id: "fonepay", name: "Fonepay", detail: "Pay using your mobile banking app" },
  { id: "cod", name: "Cash on delivery", detail: "Pay when the order arrives" },
];
const money = (amount: number) => `NPR ${amount.toLocaleString("en-IN")}`;

export default function CheckoutPage() {
  const router = useRouter(); const { items, subtotal, clearCart } = useCart();
  const [payment, setPayment] = useState<Payment>("esewa"); const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!items.length) return setError("Your basket is empty."); setBusy(true); setError("");
    const form = new FormData(event.currentTarget); const customer = { name: String(form.get("name")), email: String(form.get("email")), phone: String(form.get("phone")), address: String(form.get("address")) };
    try { const response = await fetch("/api/payments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ provider: payment, amount: subtotal, customer, items }) }); const data = await response.json(); if (!response.ok) throw new Error(data.error || "Could not start payment."); localStorage.setItem("uniform-world-receipt", JSON.stringify({ ...data.order, customer, items, subtotal, provider: payment })); clearCart(); if (data.redirectUrl) window.location.assign(data.redirectUrl); else router.push(`/order-success?order=${data.order.id}`); } catch (reason) { setError(reason instanceof Error ? reason.message : "Could not start payment."); setBusy(false); }
  }
  return <><Nav /><main className={styles.page}><header className={styles.heading}><p>SECURE CHECKOUT</p><h1>Confirm your order.</h1><span>Enter delivery details, choose a payment method, and receive a receipt immediately after confirmation.</span></header>{!items.length ? <section className={styles.empty}><h2>Your basket is empty.</h2><Link href="/products">Return to catalogue →</Link></section> : <form className={styles.checkout} onSubmit={submit}><section className={styles.formPanel}><h2>Delivery contact</h2><div className={styles.formGrid}><label>Full name<input required name="name" autoComplete="name" placeholder="Parent or organisation name" /></label><label>Phone number<input required name="phone" autoComplete="tel" placeholder="98XXXXXXXX" /></label><label>Email address<input required type="email" name="email" autoComplete="email" placeholder="you@example.com" /></label><label>Delivery address<textarea required name="address" rows={3} placeholder="Street, city and delivery notes" /></label></div><h2>Payment method</h2><div className={styles.payments}>{paymentOptions.map((option) => <label className={payment === option.id ? styles.selectedPayment : ""} key={option.id}><input type="radio" name="payment" checked={payment === option.id} onChange={() => setPayment(option.id)} /><span><b>{option.name}</b><small>{option.detail}</small></span></label>)}</div>{error && <p className={styles.error}>{error}</p>}</section><aside className={styles.summary}><p>ORDER SUMMARY</p>{items.map((item) => <div className={styles.miniLine} key={item.id}><span>{item.quantity} × {item.name}</span><b>{money(item.unitPrice * item.quantity)}</b></div>)}<hr /><div className={styles.grand}><span>Total</span><b>{money(subtotal)}</b></div><button disabled={busy} type="submit">{busy ? "Starting payment…" : `Pay with ${payment === "cod" ? "cash on delivery" : payment}`}</button><small>Wallet payments are configured for sandbox mode until merchant credentials and callback URLs are added.</small></aside></form>}</main><Footer /></>;
}
