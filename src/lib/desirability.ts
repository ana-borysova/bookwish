export interface DesirabilityTier {
  value: number;
  label: string;
  color: string;
  textColor: string;
}

export const DESIRABILITY_TIERS: DesirabilityTier[] = [
  {
    value: 1,
    label: "Було б непогано",
    color: "#facc15",
    textColor: "#0f1836",
  },
  { value: 2, label: "Хотілося б", color: "#f59e0b", textColor: "#0f1836" },
  { value: 3, label: "Хочу", color: "#f97316", textColor: "#fff" },
  { value: 4, label: "Дуже хочу", color: "#f43f5e", textColor: "#fff" },
  { value: 5, label: "Мрія!", color: "#e11d48", textColor: "#fff" },
];

export const DEFAULT_DESIRABILITY = 3;

export function getDesirabilityTier(value: number): DesirabilityTier {
  const v = Math.min(5, Math.max(1, Math.round(value)));
  return DESIRABILITY_TIERS[v - 1];
}

export function desirabilityFillPct(value: number): number {
  const v = Math.min(5, Math.max(1, value));
  return ((v - 1) / 4) * 100;
}

export const gradient = `linear-gradient(90deg, ${DESIRABILITY_TIERS.map((t) => t.color).join(", ")})`;
