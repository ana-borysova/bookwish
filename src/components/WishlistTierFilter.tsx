import clsx from "clsx";
import { DESIRABILITY_TIERS, gradient } from "../lib/desirability";

interface WishlistTierFilterProps {
  selected: number[];
  onChange: (next: number[]) => void;
}

export function WishlistTierFilter({
  selected,
  onChange,
}: WishlistTierFilterProps) {
  const isAllActive = selected.length === 0;

  return (
    <div className="flex flex-wrap gap-2 justify-end">
      {DESIRABILITY_TIERS.map((tier) => {
        const isActive = selected.includes(tier.value);
        const next = isActive
          ? selected.filter((v) => v !== tier.value)
          : [...selected, tier.value];
        const isAll = next.length === DESIRABILITY_TIERS.length;
        return (
          <button
            className={clsx(
              "rounded-full border px-4 py-2 text-sm font-semibold transition",
              !isActive &&
                "border-cream/20 text-cream/85 hover:border-cream/45 hover:text-cream",
              isActive && "border-transparent",
            )}
            style={
              isActive
                ? {
                    boxShadow: `0 0 20px ${tier.color}80`,
                    color: tier.textColor,
                    backgroundColor: tier.color,
                  }
                : undefined
            }
            key={tier.value}
            onClick={() => onChange(isAll ? [] : next)}
          >
            {tier.label}
          </button>
        );
      })}
      <button
        onClick={() => onChange([])}
        className={clsx(
          "rounded-full border px-6 py-2 text-sm font-semibold transition bg-origin-border",
          !isAllActive &&
            " border-cream/20 text-cream/85 hover:border-cream/45 hover:text-cream",
          isAllActive &&
            "border-transparent shadow-[0_0_18px_-4px_var(--color-cream)]",
        )}
        style={isAllActive ? { backgroundImage: gradient } : undefined}
      >
        Усі
      </button>
    </div>
  );
}
