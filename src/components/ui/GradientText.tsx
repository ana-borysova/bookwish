import type { ReactNode } from "react";
import { gradient } from "../../lib/desirability";

interface GradientTextProps {
  children: ReactNode;
}

export function GradientText({ children }: GradientTextProps) {
  return (
    <span
      className="bg-clip-text text-transparent"
      style={{ backgroundImage: gradient }}
    >
      {children}
    </span>
  );
}
