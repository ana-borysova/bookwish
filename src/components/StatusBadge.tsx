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
    color: "text-avail bg-avail/15 border-avail/35",
    label: "Доступно",
  },
  reserved: {
    color: "text-reserve bg-reserve/15 border-reserve/35",
    label: "Заброньовано",
  },
  purchased: {
    color: "text-purchase bg-purchase/15 border-purchase/35",
    label: "Придбано",
  },
  received: {
    color: "text-cream/65 bg-white/5 border-white/20",
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
