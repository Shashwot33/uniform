import { NextResponse } from "next/server";
import { organizationSchema } from "../../../lib/validation";
import { connectMongo } from "../../../lib/mongodb";
import { Enquiry } from "../../../models/Enquiry";
export async function POST(request: Request) { const raw = await request.json(); const input = organizationSchema.extend({ category: organizationSchema.shape.institution }).safeParse(raw); if (!input.success) return NextResponse.json({ error: "Please provide complete institutional requirements." }, { status: 400 }); const reference = `ENQ-${new Date().getFullYear()}-${crypto.randomUUID().slice(0,8).toUpperCase()}`; if (await connectMongo()) await Enquiry.create({ reference, kind: "quotation", ...input.data, payload: input.data }); return NextResponse.json({ reference, status: "received" }, { status: 201 }); }
