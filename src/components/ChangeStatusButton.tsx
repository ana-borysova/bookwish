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
        "text-[#86efac] bg-[rgba(74,222,128,0.14)] border-[rgba(74,222,128,0.4)] hover:bg-[rgba(74,222,128,0.25)] hover:shadow-[0_0_16px_-4px_rgba(74,222,128,0.5)]",
      label: "Подарувати🎁",
    };
  }
  if (status === WishlistItemStatus.RESERVED && !isOwner && isReserver) {
    return {
      color:
        "text-[#fcd34d] bg-[rgba(252,211,77,.13)] border-[rgba(252,211,77,.4)] hover:bg-[rgba(252,211,77,.24)] hover:shadow-[0_0_16px_-4px_rgba(252,211,77,.5)]",
      label: "Придбано🎁",
    };
  }

  if (status === WishlistItemStatus.PURCHASED && isOwner) {
    return {
      color:
        "text-[#fdba74] bg-[rgba(253,186,116,.13)] border-[rgba(253,186,116,.4)] hover:bg-[rgba(253,186,116,.24)] hover:shadow-[0_0_16px_-4px_rgba(253,186,116,.5)]",
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
