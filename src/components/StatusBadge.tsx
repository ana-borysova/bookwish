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
    color: "bg-green-100 text-green-800",
    label: "Доступно",
  },
  reserved: {
    color: "bg-yellow-100 text-yellow-800",
    label: "Заброньовано",
  },
  purchased: {
    color: "bg-orange-100 text-orange-800",
    label: "Придбано",
  },
  received: {
    color: "bg-gray-100 text-gray-800",
    label: "Отримано",
  },
} as const;

export function StatusBadge({ status }: StatusBadgeProps) {
  //   const statusConfig = {
  //     available: { color: "bg-green-100 text-green-800", label: "Доступно" },
  //     reserved: { color: "bg-yellow-100 text-yellow-800", label: "Заброньовано" },
  //     purchased: {
  //       color: "bg-yellow-100 text-yellow-800",
  //       label: "Придбано",
  //     },
  //     received: {
  //       color: "bg-gray-100 text-gray-800",
  //       label: "Отримано",
  //     },
  //   };

  const { color, label } = statusConfig[status];

  return <div className={clsx("rounded-full px-2 py-0.5", color)}>{label}</div>;
}
