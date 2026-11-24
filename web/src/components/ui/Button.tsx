import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & { variant?: "primary" | "secondary" | "ghost" };
export function Button({ children, className = "", variant = "primary", ...props }: Props) {
  return <button className={`button button-${variant} ${className}`} {...props}>{children}</button>;
}
