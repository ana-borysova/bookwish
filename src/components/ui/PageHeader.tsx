import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
  size?: "hero" | "medium" | "compact";
}

const SIZES = {
  hero: {
    eyebrow: "text-sm mb-5",
    title: "text-[clamp(3.25rem,5.6vw,5.4rem)]",
    subtitle: "mt-6 text-lg text-cream max-w-2xl",
  },

  medium: {
    eyebrow: "text-xs mb-3.5",
    title: "text-[clamp(2.625rem,4.6vw,4rem)]",
    subtitle: "mt-2.5 text-base text-cream/70",
  },
  compact: {
    eyebrow: "text-xs mb-3",
    title: "text-[clamp(2rem,3.4vw,2.625rem)]",
    subtitle: "mt-2.5 text-base text-cream/65",
  },
};

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  size = "hero",
}: PageHeaderProps) {
  const classes = SIZES[size];
  return (
    <>
      <div className={`eyebrow ${classes.eyebrow}`}>{eyebrow}</div>
      <h1
        className={`font-display font-extrabold leading-[1.02] tracking-[-0.005em] ${classes.title}`}
      >
        {title}
      </h1>
      <p className={`leading-relaxed ${classes.subtitle}`}>{subtitle}</p>
    </>
  );
}
