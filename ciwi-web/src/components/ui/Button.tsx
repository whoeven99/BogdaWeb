import Link from "next/link";
import type {ReactNode} from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "dark";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
};

export function Button({href, children, variant = "primary"}: ButtonProps) {
  return (
    <Link href={href} className={`button button--${variant}`}>
      {children}
    </Link>
  );
}
