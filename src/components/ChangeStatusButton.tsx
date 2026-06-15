import clsx from "clsx";
import { WishlistItemStatus } from "../types/book";

interface ChangeStatusButtonProps {
  status: WishlistItemStatus;
  isOwner: boolean;
  isAuthenticated: boolean;
  onOpenModal: () => void;
}

type ButtonConfig = {
  color: string;
  label: string;
};

// function getButtonConfig(status: WishlistItemStatus, isOwner: boolean) {
//   let config: ButtonConfig | null = null;

//   if (status === WishlistItemStatus.AVAILABLE && isOwner) {
//     config = {
//       color: "bg-green-100 text-green-800",
//       label: "Подарувати🎁",
//     };
//     return config;
//   }
//   if (status === WishlistItemStatus.RESERVED && !isOwner) {
//     config = {
//       color: "bg-yellow-100 text-yellow-800",
//       label: "Придбано🎁",
//     };
//     return config;
//   }

//   if (status === WishlistItemStatus.PURCHASED && isOwner) {
//     config = {
//       color: "bg-orange-100 text-orange-800",
//       label: "Отримано🎁",
//     };
//     return config;
//   } else {
//     return null;
//   }
// }

function getButtonConfig(
  status: WishlistItemStatus,
  isOwner: boolean,
): ButtonConfig | null {
  if (status === WishlistItemStatus.AVAILABLE && !isOwner) {
    return {
      color: "bg-green-100 text-green-800",
      label: "Подарувати🎁",
    };
  }
  if (status === WishlistItemStatus.RESERVED && !isOwner) {
    return { color: "bg-yellow-100 text-yellow-800", label: "Придбано🎁" };
  }

  if (status === WishlistItemStatus.PURCHASED && isOwner) {
    return {
      color: "bg-orange-100 text-orange-800",
      label: "Отримано🎁",
    };
  }
  return null;
}

export function ChangeStatusButton({
  status,
  isOwner,
  isAuthenticated,
  onOpenModal,
}: ChangeStatusButtonProps) {
  if (!isAuthenticated) {
    return null;
  }

  const config = getButtonConfig(status, isOwner);

  if (!config) {
    return null;
  }

  return (
    <button
      className={clsx("rounded-full whitespace-nowrap px-2 py-1", config.color)}
      onClick={onOpenModal}
    >
      {config.label}
    </button>
  );
}
