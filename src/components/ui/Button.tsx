import type { MouseEvent, ReactNode } from "react";
import { Link } from "react-router-dom";
import { gradient } from "../../lib/desirability";

interface ButtonProps {
  children: ReactNode;
  variant: "primary" | "ghost" | "icon";
  size?: "basic" | "small";
  to?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  fullWidth?: boolean;
}

const base =
  "rounded-full font-semibold inline-flex gap-2 items-center transition disabled:opacity-50";

const SIZES = {
  basic: "px-8 py-4 text-base",
  small: "px-4 py-1 text-sm",
};

const VARIANTS = {
  primary: "text-white shadow-[0_10px_28px_-6px_rgba(244,63,94,0.55)]",
  ghost:
    "text-cream bg-white/5 border border-white/20 hover:bg-white/12 hover:border-gold/50",
  icon: "flex-none h-7 w-7 rounded-full text-xs text-cream/50 bg-white/5 hover:text-white hover:bg-rose-500/35 justify-center",
};

export function Button({
  children,
  variant,
  size = "small",
  to,
  onClick,
  disabled,
  fullWidth,
}: ButtonProps) {
  const classes = `${base} ${variant === "icon" ? "" : SIZES[size]} ${VARIANTS[variant]} ${fullWidth ? "w-full justify-center" : ""}`;
  const styles =
    variant === "primary" ? { backgroundImage: gradient } : undefined;

  return to ? (
    <Link to={to} className={classes} style={styles}>
      {children}
    </Link>
  ) : (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classes}
      style={styles}
    >
      {children}
    </button>
  );
}
