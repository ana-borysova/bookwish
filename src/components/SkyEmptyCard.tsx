import { Link } from "react-router-dom";
import { DESIRABILITY_TIERS } from "../lib/desirability";

export function SkyEmptyCard() {
  return (
    <Link
      to="/search"
      className="flex items-center justify-center relative w-50 h-73 rounded-xl overflow-hidden glowpulse-cover bg-white/5 border-2 border-dashed border-white/15"
      style={{
        ["--glow" as string]: DESIRABILITY_TIERS[0].color,
      }}
    >
      <span className="font-display text-xl">Додай нову мрію! ✦</span>
    </Link>
  );
}
