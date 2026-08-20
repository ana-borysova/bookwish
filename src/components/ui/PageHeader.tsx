import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
}

export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <>
      <div className="eyebrow text-sm mb-5">{eyebrow}</div>
      <h1 className="font-display font-extrabold text-[clamp(3.25rem,5.6vw,5.4rem)] leading-[1.02] tracking-[-0.005em]">
        {title}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-cream max-w-2xl">
        {subtitle}
      </p>
    </>
  );
}
