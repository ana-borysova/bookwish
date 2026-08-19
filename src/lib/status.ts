import type { WishlistItemStatus } from "../types/book";

export const STATUS_STYLE: Record<
  WishlistItemStatus,
  { label: string; tone: string; hover?: string }
> = {
  available: {
    label: "Доступно",
    tone: "text-avail bg-avail/15 border-avail/35",
    hover: "hover:bg-avail/25 hover:shadow-[0_0_16px_-4px_var(--color-avail)]",
  },
  reserved: {
    label: "Заброньовано",
    tone: "text-reserve bg-reserve/15 border-reserve/35",
    hover:
      "hover:bg-reserve/25 hover:shadow-[0_0_16px_-4px_var(--color-reserve)]",
  },
  purchased: {
    label: "Придбано",
    tone: "text-purchase bg-purchase/15 border-purchase/35",
    hover:
      "Gjhover:bg-purchase/25 hover:shadow-[0_0_16px_-4px_var(--color-purchase)]",
  },
  received: {
    label: "Отримано",
    tone: "text-cream/65 bg-white/5 border-white/20",
  },
};
