import type { ReactNode } from "react";
import { gradient } from "../lib/desirability";

interface ButtonPrimaryProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export function ButtonPrimary({
  children,
  onClick,
  disabled,
}: ButtonPrimaryProps) {
  return (
    <button
      className="rounded-full whitespace-nowrap px-4 py-1 text-white disabled:opacity-50 transition enabled:hover:-translate-y-0.5 enabled:hover:shadow-lg"
      style={{ backgroundImage: gradient }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
