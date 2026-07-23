import clsx from "clsx";
import type { WishlistItemStatus } from "../types/book";

interface StatusBadgeProps {
  status: WishlistItemStatus;
}

const statusConfig: Record<
  WishlistItemStatus,
  { color: string; label: string }
> = {
  available: {
    color:
      "text-[#86efac] bg-[rgba(74,222,128,0.14)] border-[rgba(74,222,128,0.35)]",
    label: "Доступно",
  },
  reserved: {
    color:
      "text-[#fcd34d] bg-[rgba(252,211,77,.13)] border-[rgba(252,211,77,.35)]",
    label: "Заброньовано",
  },
  purchased: {
    color:
      "text-[#fdba74] bg-[rgba(253,186,116,.13)] border-[rgba(253,186,116,.35)]",
    label: "Придбано",
  },
  received: {
    color:
      "text-[rgba(244,236,228,.65)] bg-[rgba(255,255,255,.07)] border-[rgba(255,255,255,.2)]",
    label: "Отримано",
  },
} as const;

export function StatusBadge({ status }: StatusBadgeProps) {
  const { color, label } = statusConfig[status];

  return (
    <div
      className={clsx("rounded-full border px-3 py-1 text-xs font-bold", color)}
    >
      {label}
    </div>
  );
}
