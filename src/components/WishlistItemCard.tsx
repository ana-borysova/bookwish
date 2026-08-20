import { useState } from "react";
import { WishlistItemStatus, type WishlistItemWithBook } from "../types/book";
import { ChangeStatusButton } from "./ChangeStatusButton";
import { StatusBadge } from "./StatusBadge";
import { ChangeStatusModal } from "./ChangeStatusModal";
import { ConfirmDialog } from "./ConfirmDialog";
import {
  getDesirabilityTier,
  desirabilityFillPct,
  gradient,
} from "../lib/desirability";
import clsx from "clsx";
import { bookCoverUrl } from "../lib/coverUrl";
import { BookCover } from "./BookCover";
import { Spine } from "./Spine";
import { Button } from "./ui/Button";

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

  const desirability = item.desirability;
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
          "flip aspect-2/3 cursor-pointer",
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

            <Spine color={tier.color} />
            <span
              className="absolute top-2 right-2 z-10 whitespace-nowrap rounded-full px-3 py-1 text-sm font-bold shadow-lg"
              style={{
                background: tier.color,
                color: tier.textColor,
              }}
            >
              {tier.label}
            </span>

            <span className="absolute bottom-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-sm text-white/90 transition hover:bg-black/90 hover:text-white">
              ↻
            </span>
          </div>

          <div className="flip-face flip-back flex flex-col gap-0.5 surface-card border border-white/12 p-4 overflow-y-auto">
            <div className="flex justify-between py-1">
              <StatusBadge status={status} />
              {isOwner && (
                <Button
                  variant="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirm("delete");
                  }}
                >
                  ✕
                </Button>
              )}
              {isReserver &&
                (status === WishlistItemStatus.RESERVED ||
                  status === WishlistItemStatus.PURCHASED) && (
                  <Button
                    variant="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirm("cancel");
                    }}
                  >
                    ✕
                  </Button>
                )}
            </div>

            <div className="font-display text-cream leading-none pt-3 pb-1.5 text-lg">
              {title}
            </div>

            <div className="text-base text-white/70">{authors}</div>
            <div className="text-sm text-white/40">{year}</div>
            <div className="text-sm text-white/40 pb-4 ">{publisher}</div>

            <div
              className="h-3 w-full rounded-full relative overflow-hidden"
              style={{
                background: gradient,
              }}
            >
              <div
                className="absolute inset-y-0 right-0 bg-track"
                style={{ left: `${desirabilityFillPct(desirability)}%` }}
              />
            </div>
            <div
              className="text-center font-bold text-sm"
              style={{
                color: tier.color,
                textShadow: `0 0 12px ${tier.color}`,
              }}
            >
              {tier.label}
            </div>

            <div
              className="mt-auto text-center"
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
      {isModalOpen && (
        <ChangeStatusModal
          onClose={onCloseModal}
          status={status}
          book={item.book}
          isAuthenticated={isAuthenticated}
          isOwner={isOwner}
          isAnonymous={item.isAnonymous ?? false}
          itemId={item.id}
          onReserve={onReserve}
          onReceived={onReceived}
          onPurchase={onPurchase}
        />
      )}
      {confirm === "delete" && (
        <ConfirmDialog
          book={item.book}
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
          book={item.book}
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
