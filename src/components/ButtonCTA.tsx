import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { gradient } from "../lib/desirability";

interface ButtonCTAProps {
  children: ReactNode;
  variant: "primary" | "ghost";
  to: string;
}

export function ButtonCTA({ children, variant, to }: ButtonCTAProps) {
  const base =
    "rounded-full px-8 py-4 text-base font-semibold inline-flex gap-2 items-center transition";

  const VARIANTS = {
    primary: "text-white shadow-[0_10px_28px_-6px_rgba(244,63,94,0.55)]",
    ghost: "text-cream bg-white/5 border border-white/20",
  };

  return (
    <Link
      to={to}
      className={`${base} ${VARIANTS[variant]}`}
      style={variant === "primary" ? { backgroundImage: gradient } : undefined}
    >
      {children}
    </Link>
  );
}
