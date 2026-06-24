import ReactDOM from "react-dom";

import { useState } from "react";
import { WishlistItemStatus, type WishlistItemWithBook } from "../types/book";
import { ChangeStatusButton } from "./ChangeStatusButton";
import { StatusBadge } from "./StatusBadge";
import { ChangeStatusModal } from "./ChangeStatusModal";
import { ConfirmDialog } from "./ConfirmDialog";
import {
  getDesirabilityTier,
  desirabilityFillPct,
  DEFAULT_DESIRABILITY,
  gradient,
} from "../lib/desirability";
import clsx from "clsx";
import { bookCoverUrl } from "../lib/coverUrl";
import { BookCover } from "./BookCover";

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
  const { title, authors, year, publisher } = item.book;
  const { status } = item;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirm, setConfirm] = useState<"delete" | "cancel" | null>(null);
  const [flipped, setFlipped] = useState(false);

  const desirability = item.desirability ?? DEFAULT_DESIRABILITY;
  const tier = getDesirabilityTier(desirability);
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
          "flip aspect-2/3 w-65 cursor-pointer",
          flipped && "is-flipped",
        )}
        onClick={() => setFlipped((f) => !f)}
      >
        <div className="flip-inner">
          <div className=" flip-face relative ">
            <BookCover
              src={bookCoverUrl(item.book)}
              title={title}
              coverSize="w-full h-full"
              isbn={item.book.isbn}
            />

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

            <div className="text-xl leading-none py-2 ">{title}</div>

            <div className="text-sm text-gray-500">{authors}</div>
            <div className="text-xs text-gray-400">{year}</div>
            <div className="text-xs text-gray-400 pb-4 ">{publisher}</div>

            <div
              className="h-3 w-full rounded-full relative"
              style={{
                background: gradient,
              }}
            >
              <div
                className="absolute inset-y-0 right-0 bg-gray-100"
                style={{ left: `${desirabilityFillPct(desirability)}%` }}
              />
            </div>
            <div
              className="text-center font-bold text-sm"
              style={{ color: tier.color }}
            >
              {tier.label}
            </div>

            <div
              className="py-4 text-center"
              onClick={(e) => e.stopPropagation()}
            >
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
