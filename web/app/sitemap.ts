import type { MetadataRoute } from "next";
const paths = ["", "/facility", "/process", "/products", "/customize", "/partners", "/quality", "/quote", "/samples", "/contact"];
export default function sitemap(): MetadataRoute.Sitemap { const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"; return paths.map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: "monthly", priority: path === "" ? 1 : .7 })); }
