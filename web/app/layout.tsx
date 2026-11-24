import type { Metadata } from "next";
import "./site.css";
export const metadata: Metadata = { title: "Uniform Nepal | Institutional Uniform Manufacturing", description: "Custom school uniform manufacturing, institutional supply, samples and quotations in Nepal." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
