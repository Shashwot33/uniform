import { NextResponse } from "next/server";
import { customizationSchema } from "../../../lib/validation";
import { connectMongo } from "../../../lib/mongodb";
import { Enquiry } from "../../../models/Enquiry";
export async function POST(request: Request) { const input = customizationSchema.safeParse(await request.json()); if (!input.success) return NextResponse.json({ error: "Please complete the manufacturing brief." }, { status: 400 }); const reference = `DESIGN-${new Date().getFullYear()}-${crypto.randomUUID().slice(0,8).toUpperCase()}`; if (await connectMongo()) await Enquiry.create({ reference, kind: "customization", ...input.data, payload: input.data }); return NextResponse.json({ reference, status: "received" }, { status: 201 }); }
