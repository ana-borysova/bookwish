import clsx from "clsx";
import { WishlistItemStatus } from "../types/book";

interface ChangeStatusButtonProps {
  status: WishlistItemStatus;
  isOwner: boolean;
  onReserve: (id: string) => void;
  onPurchase: (id: string) => void;
  onReceived: (id: string) => void;
  onDelete: (id: string) => void;
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
  if (status === WishlistItemStatus.AVAILABLE && isOwner) {
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
  onReserve,
  onPurchase,
  onReceived,
  onDelete,
}: ChangeStatusButtonProps) {
  const config = getButtonConfig(status, isOwner);

  if (!config) {
    return null;
  }

  return (
    <button
      className={clsx("rounded-full whitespace-nowrap px-2 py-1", config.color)}
    >
      {config.label}
    </button>
  );
}
//   const buttonConfig: Record<
//     WishlistItemStatus,
//     { style: string; label: string; onPress: () => void }
//   > = {
//     available: {
//       style:
//         "bg-green-100 text-green-800 rounded-full whitespace-nowrap px-2 py-1",
//       label: "Змінити",
//       onPress: () => {},
//     },
//     reserved: {
//       style: "bg-yellow-100 text-yellow-800",
//       label: "Змінити",
//       onPress: () => {},
//     },
//     purchased: {
//       style: "bg-yellow-100 text-yellow-800",
//       label: "Придбано",
//       onPress: () => {},
//     },
//     received: {
//       style: "bg-gray-100 text-gray-800",
//       label: "Отримано",
//       onPress: () => {},
//     },
//   };
