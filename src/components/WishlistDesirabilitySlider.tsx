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
      <input
        type="range"
        min={1}
        max={5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="wish-slider"
        style={{
          backgroundImage: gradient,
          backgroundColor: "#f3f4f6",
          backgroundRepeat: "no-repeat",
          backgroundSize: `${desirabilityFillPct(value)}% 100%`,
          ["--thumb" as string]: tier.color,
        }}
      />
      <div
        className="text-center font-bold text-sm mt-2"
        style={{ color: tier.color }}
      >
        {tier.label}
      </div>
    </div>
  );
}
