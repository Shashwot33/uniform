import { NextResponse } from "next/server";
import { organizationSchema } from "../../../lib/validation";
import { connectMongo } from "../../../lib/mongodb";
import { Enquiry } from "../../../models/Enquiry";
export async function POST(request: Request) { const input = organizationSchema.extend({ sampleType: organizationSchema.shape.institution }).safeParse(await request.json()); if (!input.success) return NextResponse.json({ error: "Please provide your institutional sample request." }, { status: 400 }); const reference = `SAMPLE-${new Date().getFullYear()}-${crypto.randomUUID().slice(0,8).toUpperCase()}`; if (await connectMongo()) await Enquiry.create({ reference, kind: "sample", ...input.data, payload: input.data }); return NextResponse.json({ reference, status: "received" }, { status: 201 }); }
