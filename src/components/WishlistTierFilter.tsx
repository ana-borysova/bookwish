import { DESIRABILITY_TIERS } from "../lib/desirability";

interface WishlistTierFilterProps {
  selected: number[];
  onChange: (next: number[]) => void;
}

export function WishlistTierFilter({
  selected,
  onChange,
}: WishlistTierFilterProps) {
  return (
    <div>
      {DESIRABILITY_TIERS.map((tier) => {
        const isActive = selected.includes(tier.value);
        const next = isActive
          ? selected.filter((v) => v !== tier.value)
          : [...selected, tier.value];
        const isAll =
          next.length === DESIRABILITY_TIERS.length || next.length === 0;
        return (
          <button
            style={isActive ? { backgroundColor: tier.color } : undefined}
            key={tier.value}
            onClick={() => onChange(isAll ? [] : next)}
          >
            {tier.label}
          </button>
        );
      })}
      <button onClick={() => onChange([])}>Усі</button>
    </div>
  );
}
