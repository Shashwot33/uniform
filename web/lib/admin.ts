import { timingSafeEqual } from "crypto";
export function isAdmin(request: Request) { const expected = process.env.ADMIN_API_KEY; const provided = request.headers.get("x-admin-key"); if (!expected || !provided || expected.length !== provided.length) return false; return timingSafeEqual(Buffer.from(expected), Buffer.from(provided)); }
