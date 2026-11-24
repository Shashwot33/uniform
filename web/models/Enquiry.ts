import { Schema, model, models } from "mongoose";
const enquirySchema = new Schema({ reference: { type: String, required: true, unique: true, index: true }, kind: { type: String, required: true, index: true }, institution: String, contactPerson: String, email: String, phone: String, status: { type: String, default: "received" }, payload: Schema.Types.Mixed }, { timestamps: true });
export const Enquiry = models.Enquiry || model("Enquiry", enquirySchema);
