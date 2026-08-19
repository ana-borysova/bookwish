import clsx from "clsx";
import type { WishlistItemStatus } from "../types/book";
import { STATUS_STYLE } from "../lib/status";

interface StatusBadgeProps {
  status: WishlistItemStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { tone, label } = STATUS_STYLE[status];

  return (
    <div
      className={clsx("rounded-full border px-3 py-1 text-xs font-bold", tone)}
    >
      {label}
    </div>
  );
}
