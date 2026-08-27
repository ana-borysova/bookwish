import type { ReactNode } from "react";

interface SearchStateProps {
  icon: string;
  title: string;
  description: string;
  children?: ReactNode;
}

export function SearchState({
  icon,
  title,
  description,
  children,
}: SearchStateProps) {
  return (
    <div className="text-center relative pt-20 px-5 pb-36">
      <span className="text-[3.5rem] drop-shadow-glow">{icon}</span>
      <h2 className="font-display font-extrabold text-3xl mt-6">{title}</h2>
      <p className="text-base text-cream/65 mt-3 max-w-md mx-auto leading-relaxed">
        {description}
      </p>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
