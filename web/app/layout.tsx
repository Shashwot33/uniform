import type { Metadata } from "next";
import "./site.css";
import styles from "./brand.module.css";
import { Providers } from "./providers";
export const metadata: Metadata = { title: "Uniform World | Institutional Uniform Manufacturing", description: "Custom uniforms for schools, colleges and hospitals—samples, production and quotations in Nepal." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={styles.shell}><Providers>{children}</Providers></body></html>; }
