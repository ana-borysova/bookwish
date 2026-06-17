import ReactDOM from "react-dom";
import { useState } from "react";
import type { WishlistItemWithBook } from "../types/book";
import { ChangeStatusButton } from "./ChangeStatusButton";
import StarRating from "./StarRating";
import { StatusBadge } from "./StatusBadge";
import { ChangeStatusModal } from "./ChangeStatusModal";

interface WishlistItemCardProps {
  item: WishlistItemWithBook;
  isAuthenticated: boolean;
  isOwner: boolean;
  onReserve: (data: {
    itemId: string;
    reservedBy: string;
    isAnonymous: boolean;
  }) => void;
  onPurchase: (data: {
    itemId: string;
    reservedBy: string;
    isAnonymous: boolean;
  }) => void;
  onReceived: (id: string) => void;
  onDelete?: (id: string) => void;
  onRatingChange: (id: string, rating: number) => void;
  onCommentEdit?: (id: string, comment: string) => void;
}

export function WishlistItemCard({
  item,
  isOwner,
  isAuthenticated,
  onReserve,
  onPurchase,
  onReceived,

  onRatingChange,
}: WishlistItemCardProps) {
  const { title, thumbnail, authors, year, publisher } = item.book;
  const { status } = item;

  const [isModalOpen, setIsModalOpen] = useState(false);

  function onOpenModal() {
    setIsModalOpen(true);
  }

  function onCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow w-[45%]">
      <div className="flex justify-between items-start pb-4">
        <div className="text-xl ">{title}</div>
        <StatusBadge status={status} />
      </div>
      <div className="flex pb-4">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-24 h-36 object-cover rounded m-2"
          />
        ) : (
          <div className="w-16 h-24 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs text-center">
            Немає обкладинки
          </div>
        )}

        <div>
          <div className="text-sm text-gray-500">{authors}</div>
          <div className="text-xs text-gray-400">{year}</div>
          <div className="text-xs text-gray-400 pb-2">{publisher}</div>
          <StarRating
            onStarChange={(value) => onRatingChange(item.id, value)}
          />
        </div>
      </div>
      <div className="flex justify-between items-end ">
        <div className="rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow w-3/4 flex justify-between items-end">
          <div>Comment</div>
          <div>Change icon</div>
        </div>
        <div className="pl-2">
          <ChangeStatusButton
            status={status}
            isOwner={isOwner}
            isAuthenticated={isAuthenticated}
            onOpenModal={onOpenModal}
          />
        </div>
      </div>

      {isModalOpen &&
        ReactDOM.createPortal(
          <ChangeStatusModal
            onClose={onCloseModal}
            isAuthenticated={isAuthenticated}
            isOwner={isOwner}
            itemId={item.id}
            onReserve={onReserve}
            onReceived={onReceived}
            onPurchase={onPurchase}
          />,
          document.body,
        )}
    </div>
  );
}
