import clsx from "clsx";
import { WishlistItemStatus } from "../types/book";
import { STATUS_STYLE } from "../lib/status";

interface ChangeStatusButtonProps {
  status: WishlistItemStatus;
  isOwner: boolean;
  isAuthenticated: boolean;
  isReserver: boolean;
  onOpenModal: () => void;
}

function getButtonLabel(
  status: WishlistItemStatus,
  isOwner: boolean,
  isReserver: boolean,
): string | null {
  if (status === WishlistItemStatus.AVAILABLE && !isOwner) {
    return "Подарувати🎁";
  }
  if (status === WishlistItemStatus.RESERVED && !isOwner && isReserver) {
    return "Придбано🎁";
  }

  if (status === WishlistItemStatus.PURCHASED && isOwner) {
    return "Отримано🎁";
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

  const label = getButtonLabel(status, isOwner, isReserver);

  if (!label) {
    return null;
  }

  return (
    <button
      className={clsx(
        "rounded-full whitespace-nowrap border px-4 py-2 text-sm font-bold transition",
        STATUS_STYLE[status].tone,
        STATUS_STYLE[status].hover,
      )}
      onClick={onOpenModal}
    >
      {label}
    </button>
  );
}
