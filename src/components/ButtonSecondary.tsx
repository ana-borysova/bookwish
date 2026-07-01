import type { ReactNode } from "react";

interface ButtonSecondaryProps {
  children: ReactNode;
  onClick: () => void;
}

export function ButtonSecondary({ children, onClick }: ButtonSecondaryProps) {
  return (
    <button
      className="rounded-full px-4 py-1 text-sm text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 hover:-translate-y-0.5 hover:shadow-md"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
