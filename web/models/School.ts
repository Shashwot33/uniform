import { Schema, model, models } from "mongoose";
const schoolSchema = new Schema({ name: { type: String, required: true, trim: true }, location: String, logoUrl: String, active: { type: Boolean, default: true } }, { timestamps: true });
export const School = models.School || model("School", schoolSchema);
