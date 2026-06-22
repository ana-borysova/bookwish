export interface DesirabilityTier {
  value: number;
  label: string;
  color: string;
}

export const DESIRABILITY_TIERS: DesirabilityTier[] = [
  { value: 1, label: "Було б непогано", color: "#facc15" },
  { value: 2, label: "Хотілося б", color: "#f59e0b" },
  { value: 3, label: "Хочу", color: "#f97316" },
  { value: 4, label: "Дуже хочу!", color: "#f43f5e" },
  { value: 5, label: "🔥 Мрія!", color: "#e11d48" },
];

export const DEFAULT_DESIRABILITY = 3;

export function getDesirabilityTier(value: number): DesirabilityTier {
  const v = Math.min(5, Math.max(1, Math.round(value)));
  return DESIRABILITY_TIERS[v - 1];
}

export function desirabilityFillPct(value: number): number {
  const v = Math.min(5, Math.max(1, value));
  return (v / 5) * 100;
}
