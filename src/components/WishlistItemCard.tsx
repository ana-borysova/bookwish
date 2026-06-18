import ReactDOM from "react-dom";
import { useState } from "react";
import { WishlistItemStatus, type WishlistItemWithBook } from "../types/book";
import { ChangeStatusButton } from "./ChangeStatusButton";
import StarRating from "./StarRating";
import { StatusBadge } from "./StatusBadge";
import { ChangeStatusModal } from "./ChangeStatusModal";
import { ConfirmDialog } from "./ConfirmDialog";

interface WishlistItemCardProps {
  item: WishlistItemWithBook;
  isAuthenticated: boolean;
  isOwner: boolean;
  currentUserId?: string;
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
  onCancelReservation?: (id: string) => void;
}

export function WishlistItemCard({
  item,
  isOwner,
  isAuthenticated,
  currentUserId,
  onReserve,
  onPurchase,
  onReceived,
  onDelete,
  onRatingChange,
  onCancelReservation,
}: WishlistItemCardProps) {
  const { title, thumbnail, authors, year, publisher } = item.book;
  const { status } = item;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirm, setConfirm] = useState<"delete" | "cancel" | null>(null);

  const isReserver = !!currentUserId && currentUserId === item.reservedBy;

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
        <StatusBadge status={status} />{" "}
        {isOwner && (
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() => setConfirm("delete")}
          >
            ✕
          </button>
        )}
        {isReserver &&
          (status === WishlistItemStatus.RESERVED ||
            status === WishlistItemStatus.PURCHASED) && (
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setConfirm("cancel")}
            >
              ✕
            </button>
          )}
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
            isReserver={isReserver}
            onOpenModal={onOpenModal}
          />
        </div>
      </div>
      {isModalOpen &&
        ReactDOM.createPortal(
          <ChangeStatusModal
            onClose={onCloseModal}
            status={status}
            isAuthenticated={isAuthenticated}
            isOwner={isOwner}
            isAnonymous={item.isAnonymous ?? false}
            itemId={item.id}
            onReserve={onReserve}
            onReceived={onReceived}
            onPurchase={onPurchase}
          />,
          document.body,
        )}

      {confirm === "delete" && (
        <ConfirmDialog
          title="Видалити книгу?"
          message="Точно хочеш видалити цю книгу зі свого списку?"
          confirmLabel="Так, видаляємо книгу"
          cancelLabel="Ні, залишаємо книгу"
          onConfirm={() => {
            onDelete?.(item.id);
            setConfirm(null);
          }}
          onCancel={() => setConfirm(null)}
        />
      )}

      {confirm === "cancel" && (
        <ConfirmDialog
          title="Змінили свою думку?"
          message="Більше не хочеш дарувати цю книгу?"
          confirmLabel="Так, я передумала"
          cancelLabel="Ні, вертаймось"
          onConfirm={() => {
            onCancelReservation?.(item.id);
            setConfirm(null);
          }}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  );
}
