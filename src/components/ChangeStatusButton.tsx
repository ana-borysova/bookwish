import clsx from "clsx";
import { WishlistItemStatus } from "../types/book";

interface ChangeStatusButtonProps {
  status: WishlistItemStatus;
  isOwner: boolean;
  isAuthenticated: boolean;
  isReserver: boolean;
  onOpenModal: () => void;
}

type ButtonConfig = {
  color: string;
  label: string;
};

function getButtonConfig(
  status: WishlistItemStatus,
  isOwner: boolean,
  isReserver: boolean,
): ButtonConfig | null {
  if (status === WishlistItemStatus.AVAILABLE && !isOwner) {
    return {
      color:
        "text-avail bg-avail/15 border-avail/40 hover:bg-avail/25 hover:shadow-[0_0_16px_-4px_var(--color-avail)]",
      label: "Подарувати🎁",
    };
  }
  if (status === WishlistItemStatus.RESERVED && !isOwner && isReserver) {
    return {
      color:
        "text-reserve bg-reserve/15 border-reserve/40 hover:bg-reserve/25 hover:shadow-[0_0_16px_-4px_var(--color-reserve)]",
      label: "Придбано🎁",
    };
  }

  if (status === WishlistItemStatus.PURCHASED && isOwner) {
    return {
      color:
        "text-purchase bg-purchase/15 border-purchase/40 hover:bg-purchase/25 hover:shadow-[0_0_16px_-4px_var(--color-purchase)]",
      label: "Отримано🎁",
    };
  }
  return null;
}

export function ChangeStatusButton({
  status,
  isOwner,
  isAuthenticated,
  isReserver,
  onOpenModal,
}: ChangeStatusButtonProps) {
  if (!isAuthenticated) {
    return null;
  }

  const config = getButtonConfig(status, isOwner, isReserver);

  if (!config) {
    return null;
  }

  return (
    <button
      className={clsx(
        "rounded-full whitespace-nowrap border px-4 py-2 text-sm font-bold transition",
        config.color,
      )}
      onClick={onOpenModal}
    >
      {config.label}
    </button>
  );
}
