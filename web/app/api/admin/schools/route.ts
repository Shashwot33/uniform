import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdmin } from "../../../../lib/admin";
import { connectMongo } from "../../../../lib/mongodb";
import { School } from "../../../../models/School";
const schema = z.object({ name: z.string().min(2).max(160), location: z.string().max(160).optional(), logoUrl: z.string().url().optional() });
export async function GET(){if(!(await connectMongo()))return NextResponse.json({schools:[],configured:false});return NextResponse.json({schools:await School.find().sort({name:1}).lean(),configured:true});}
export async function POST(request:Request){if(!isAdmin(request))return NextResponse.json({error:"Unauthorized"},{status:401});const input=schema.safeParse(await request.json());if(!input.success)return NextResponse.json({error:"Invalid school"},{status:400});if(!(await connectMongo()))return NextResponse.json({error:"MongoDB is not configured"},{status:503});return NextResponse.json({school:await School.create(input.data)},{status:201});}
