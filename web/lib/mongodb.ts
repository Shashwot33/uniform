import mongoose from "mongoose";
const uri = process.env.MONGODB_URI;
export async function connectMongo() { if (!uri) return null; if (mongoose.connection.readyState) return mongoose; return mongoose.connect(uri); }
