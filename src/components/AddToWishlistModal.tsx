import { useState } from "react";
import { bookCoverUrl } from "../lib/coverUrl";
import type { Book } from "../types/book";
import { DEFAULT_DESIRABILITY, getDesirabilityTier } from "../lib/desirability";
import { WishlistDesirabilitySlider } from "./WishlistDesirabilitySlider";
import { AppErrorCode } from "../lib/errors";
import { BookCover } from "./BookCover";
import { Spine } from "./Spine";
import { Button } from "./ui/Button";
import { Modal } from "./ui/Modal";

export interface AddToWishlistModalProps {
  book: Book;
  onClose: () => void;
  onSubmit: (payload: {
    book: Book;
    desirability: number;
    comment?: string;
  }) => Promise<unknown>;
}

export function AddToWishlistModal({
  book,
  onClose,
  onSubmit,
}: AddToWishlistModalProps) {
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "duplicate" | "error"
  >("idle");

  const [desirability, setDesirability] = useState(DEFAULT_DESIRABILITY);
  const tier = getDesirabilityTier(desirability);

  async function handleAdd() {
    setStatus("loading");
    try {
      await onSubmit({
        book,
        desirability,
        comment: comment.trim() || undefined,
      });
      setStatus("success");
      setTimeout(onClose, 1200);
    } catch (e) {
      if (
        (e as { code?: string }).code === AppErrorCode.DUPLICATE_WISHLIST_ITEM
      ) {
        setStatus("duplicate");
      } else {
        setStatus("error");
      }
    }
  }

  return (
    <Modal size="lg" onClose={onClose}>
      <h2 className="font-display text-3xl font-extrabold pb-4 px-1">
        Додати до списку
      </h2>

      <div className="my-2 flex gap-6">
        <div className="w-52 shrink-0 relative rounded-xl overflow-hidden">
          <BookCover
            src={bookCoverUrl(book)}
            title={book.title}
            isbn={book.isbn}
            coverSize="w-full h-full"
          />

          <Spine color={tier.color} />
        </div>
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="font-display text-2xl font-bold leading-tight">
            {book.title}
          </div>

          <div className="text-sm text-cream/60 mb-2">
            {[book.authors?.join(", "), book.year].filter(Boolean).join(" | ")}
          </div>

          <WishlistDesirabilitySlider
            value={desirability}
            onChange={setDesirability}
          />
          <div className="text-base text-cream/60 mt-2.5 mb-1.5">
            <p>Твій коментар (необов'язково)</p>
          </div>
          <textarea
            maxLength={200}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="field resize-y min-h-16"
            placeholder="Наприклад: Хочу цю книгу з кольоровим зрізом ❤️"
          />
          <div className="text-sm text-cream/40 text-right mt-1 mb-2">
            {comment.length}/200
          </div>
          {status === "success" && (
            <p className="text-avail text-lg">Додано! 🎉</p>
          )}
          {status === "duplicate" && (
            <p className="text-rose-300 text-lg">Ця книжка вже є у списку 📚</p>
          )}
          {status === "error" && (
            <p className="text-rose-300 text-lg">
              Не вдалося додати. Спробуй ще раз.
            </p>
          )}
          <div className="flex gap-5 justify-end self-end mt-auto">
            <Button variant="ghost" onClick={onClose}>
              Скасувати
            </Button>
            <Button
              variant="primary"
              onClick={handleAdd}
              disabled={
                status === "loading" ||
                status === "success" ||
                status === "duplicate"
              }
            >
              {status === "loading" ? "Додаю…" : "Додати"}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
