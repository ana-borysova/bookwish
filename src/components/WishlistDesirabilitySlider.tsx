import {
  getDesirabilityTier,
  desirabilityFillPct,
  gradient,
} from "../lib/desirability";

export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function WishlistDesirabilitySlider({ value, onChange }: SliderProps) {
  const tier = getDesirabilityTier(value);
  return (
    <div>
      <div className="font-display font-bold text-lg mb-2.5">
        Наскільки хочеш цю книгу?
      </div>
      <input
        type="range"
        min={1}
        max={5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="wish-slider"
        style={{
          backgroundImage: gradient,
          backgroundColor: "var(--color-track)",
          backgroundRepeat: "no-repeat",
          backgroundSize: `${desirabilityFillPct(value)}% 100%`,
          ["--thumb" as string]: tier.color,
        }}
      />
      <div
        className="font-bold text-base mt-2"
        style={{ color: tier.color, textShadow: `0 0 14px ${tier.color}` }}
      >
        {tier.label}
      </div>
    </div>
  );
}
