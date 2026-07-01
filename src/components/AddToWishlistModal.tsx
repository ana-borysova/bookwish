import { useState } from "react";
import { bookCoverUrl } from "../lib/coverUrl";
import type { Book } from "../types/book";
import { DEFAULT_DESIRABILITY, getDesirabilityTier } from "../lib/desirability";
import { WishlistDesirabilitySlider } from "./WishlistDesirabilitySlider";
import { AppErrorCode } from "../lib/errors";
import { BookCover } from "./BookCover";
import { ButtonSecondary } from "./ButtonSecondary";
import { ButtonPrimary } from "./ButtonPrimary";

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-8 shadow-xl "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          X
        </button>

        <h2 className="text-2xl pb-4 px-1">Додати до списку 🎁</h2>

        <div className="my-2 flex gap-1">
          <div className="flex-1 relative rounded-lg overflow-hidden">
            <BookCover
              src={bookCoverUrl(book)}
              title={book.title}
              isbn={book.isbn}
              coverSize="w-full h-full"
            />

            <span
              className="spine"
              style={{ ["--spine" as string]: tier.color }}
            />
          </div>
          <div className="mx-4 flex-2 flex flex-col">
            <div className="text-xl leading-none">{book.title}</div>

            <div className="text-sm text-gray-500 mb-2">
              <p>{book.authors?.join(", ")}</p> <p>{book.year}</p>
            </div>

            <WishlistDesirabilitySlider
              value={desirability}
              onChange={setDesirability}
            />
            <div className="text-lg text-gray-500 my-1.5">
              <p>Твій коментар (необов'язково)</p>
            </div>
            <textarea
              maxLength={200}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-gray-200 w-full p-2 rounded-md"
              placeholder="Наприклад: Хочу цю книгу з кольоровим зрізом ❤️"
            />
            <div className="text-sm text-gray-400 text-right">
              {comment.length}/200
            </div>
            {status === "success" && (
              <p className="text-green-600 text-lg">Додано! 🎉</p>
            )}
            {status === "duplicate" && (
              <p className="text-red-600 text-lg">
                Ця книжка вже є у списку 📚
              </p>
            )}
            {status === "error" && (
              <p className="text-red-600 text-lg">
                Не вдалося додати. Спробуй ще раз.
              </p>
            )}
            <div className="flex gap-5 justify-end self-end mt-auto">
              <ButtonSecondary onClick={onClose}>Скасувати</ButtonSecondary>

              <ButtonPrimary
                onClick={handleAdd}
                disabled={
                  status === "loading" ||
                  status === "success" ||
                  status === "duplicate"
                }
              >
                {status === "loading" ? "Додаю…" : "Додати"}
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
