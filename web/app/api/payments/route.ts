import { NextResponse } from "next/server";
import { z } from "zod";

const paymentRequest = z.object({
  provider: z.enum(["esewa", "khalti", "fonepay", "cod"]),
  amount: z.number().positive().max(1_000_000),
  customer: z.object({ name: z.string().min(2), email: z.string().email(), phone: z.string().min(7), address: z.string().min(8) }),
  items: z.array(z.object({ id: z.string(), name: z.string(), quantity: z.number().int().positive(), unitPrice: z.number().positive() })).min(1),
});

export async function POST(request: Request) {
  const parsed = paymentRequest.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Please complete all checkout fields." }, { status: 400 });
  const order = { id: `UW-${Date.now().toString(36).toUpperCase()}`, status: parsed.data.provider === "cod" ? "confirmed" : "paid_sandbox", createdAt: new Date().toISOString() };
  // Real provider redirects are intentionally enabled only after merchant credentials and signed callback URLs are supplied.
  // This avoids ever labelling an unverified wallet payment as paid in production.
  return NextResponse.json({ order, redirectUrl: null, mode: "sandbox" });
}
