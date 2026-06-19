import ReactDOM from "react-dom";

import { useState } from "react";
import { WishlistItemStatus, type WishlistItemWithBook } from "../types/book";
import { ChangeStatusButton } from "./ChangeStatusButton";
import { StatusBadge } from "./StatusBadge";
import { ChangeStatusModal } from "./ChangeStatusModal";
import { ConfirmDialog } from "./ConfirmDialog";
import { getDesirabilityTier, DEFAULT_DESIRABILITY } from "../lib/desirability";
import clsx from "clsx";
import { coverUrl } from "../lib/coverUrl";

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

  onCancelReservation,
}: WishlistItemCardProps) {
  const { title, thumbnail, authors, year, publisher } = item.book;
  const { status } = item;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirm, setConfirm] = useState<"delete" | "cancel" | null>(null);
  const [flipped, setFlipped] = useState(false);

  const tier = getDesirabilityTier(item.desirability ?? DEFAULT_DESIRABILITY);
  const isReserver = !!currentUserId && currentUserId === item.reservedBy;

  function onOpenModal() {
    setIsModalOpen(true);
  }

  function onCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <div
        className={clsx(
          "flip aspect-2/3 w-60 cursor-pointer",
          flipped && "is-flipped",
        )}
        onClick={() => setFlipped((f) => !f)}
      >
        <div className="flip-inner">
          <div className=" flip-face relative ">
            {thumbnail ? (
              <img
                src={coverUrl(thumbnail)}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full object-cover text-gray-400 text-xs text-center">
                Немає обкладинки
              </div>
            )}

            <span
              className="spine"
              style={{ ["--spine" as string]: tier.color }}
            />
          </div>

          <div className="flip-face flip-back bg-white border border-gray-200 p-4 overflow-y-auto">
            <div className="flex justify-between py-1">
              <StatusBadge status={status} />
              {isOwner && (
                <button
                  className="text-gray-400 hover:text-gray-600 absolute top-1 right-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirm("delete");
                  }}
                >
                  ✕
                </button>
              )}
              {isReserver &&
                (status === WishlistItemStatus.RESERVED ||
                  status === WishlistItemStatus.PURCHASED) && (
                  <button
                    className="text-gray-400 hover:text-gray-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirm("cancel");
                    }}
                  >
                    ✕
                  </button>
                )}
            </div>

            <div className="text-xl leading-none py-1">{title}</div>

            <div className="text-sm text-gray-500">{authors}</div>
            <div className="text-xs text-gray-400">{year}</div>
            <div className="text-xs text-gray-400 pb-2">{publisher}</div>

            <div className="rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow w-full flex justify-between items-end">
              <div>Comment</div>
              <div>Change icon</div>
            </div>
            <div className="pl-2" onClick={(e) => e.stopPropagation()}>
              <ChangeStatusButton
                status={status}
                isOwner={isOwner}
                isAuthenticated={isAuthenticated}
                isReserver={isReserver}
                onOpenModal={onOpenModal}
              />
            </div>
          </div>
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
    </>
  );
}
