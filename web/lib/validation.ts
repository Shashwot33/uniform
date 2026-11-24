import { z } from "zod";
export const organizationSchema = z.object({ institution: z.string().min(2).max(160), contactPerson: z.string().min(2).max(120), email: z.string().email(), phone: z.string().min(6).max(30), requirements: z.string().min(15).max(5000) });
export const customizationSchema = organizationSchema.extend({ garment: z.string().min(2), primaryColour: z.string().min(2), secondaryColour: z.string().optional(), quantity: z.coerce.number().int().min(10).max(100000), logoPlacement: z.string().min(2) });
