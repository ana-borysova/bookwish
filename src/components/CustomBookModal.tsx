import { useState } from "react";
import type { CustomBookItem } from "../types/book";
import { isbnCoverUrl, normalizeIsbn } from "../lib/coverUrl";
import {
  DEFAULT_DESIRABILITY,
  getDesirabilityTier,
  gradient,
} from "../lib/desirability";
import { WishlistDesirabilitySlider } from "./WishlistDesirabilitySlider";
import { AppErrorCode } from "../lib/errors";

export interface CustomBookModalProps {
  onClose: () => void;
  onSubmit: (payload: {
    input: CustomBookItem;
    desirability: number;
    comment?: string;
  }) => Promise<unknown>;
}

export function CustomBookModal({ onClose, onSubmit }: CustomBookModalProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [publisher, setPublisher] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [comment, setComment] = useState("");
  const [isbn, setIsbn] = useState("");
  const [desirability, setDesirability] = useState(DEFAULT_DESIRABILITY);
  const [coverError, setCoverError] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "duplicate" | "error"
  >("idle");

  const normalizedIsbn = normalizeIsbn(isbn);
  const tier = getDesirabilityTier(desirability);
  const showCover = normalizedIsbn !== null && !coverError;
  const canSubmit = title.trim() !== "" && author.trim() !== "";

  async function handleAdd() {
    if (!canSubmit) {
      return;
    }
    setStatus("loading");

    try {
      await onSubmit({
        input: {
          title: title.trim(),
          authors: author
            .split(",")
            .map((a) => a.trim())
            .filter(Boolean),
          isbn: normalizedIsbn ?? undefined,
          year: year.trim() ? Number(year.trim()) : undefined,
          publisher: publisher.trim() || undefined,
          pageCount: pageCount.trim() ? Number(pageCount.trim()) : undefined,
        },
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
        <h2 className="text-2xl">Додати книгу 📖</h2>
        <div className="my-2 flex gap-1">
          <div className="flex-1 relative rounded-lg overflow-hidden">
            {showCover ? (
              <img
                src={isbnCoverUrl(normalizedIsbn!)}
                alt={title}
                className="w-full h-full object-cover"
                onError={() => setCoverError(true)}
              />
            ) : (
              <div className="w-full h-full object-cover text-gray-400 text-xs text-center bg-amber-200">
                Немає обкладинки
              </div>
            )}

            <span
              className="spine"
              style={{ ["--spine" as string]: tier.color }}
            />
          </div>
          <div className="mx-4 flex-2 flex flex-col gap-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-200 w-full p-2 rounded-md"
              placeholder="Назва *"
            />
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="bg-gray-200 w-full p-2 rounded-md"
              placeholder="Автор * (кілька — через кому)"
            />
            <input
              value={isbn}
              onChange={(e) => {
                setIsbn(e.target.value);
                setCoverError(false);
              }}
              className="bg-gray-200 w-full p-2 rounded-md"
              placeholder="ISBN (необов'язково)"
            />
            <div className="flex gap-2">
              <input
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="bg-gray-200 w-full p-2 rounded-md"
                placeholder="Рік (необов'язково)"
              />
              <input
                value={pageCount}
                onChange={(e) => setPageCount(e.target.value)}
                className="bg-gray-200 w-full p-2 rounded-md"
                placeholder="Сторінок (необов'язково)"
              />
            </div>
            <input
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              className="bg-gray-200 w-full p-2 rounded-md"
              placeholder="Видавництво (необов'язково)"
            />
            <WishlistDesirabilitySlider
              value={desirability}
              onChange={setDesirability}
            />{" "}
          </div>
        </div>
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
          <p className="text-red-600 text-lg">Ця книжка вже є у списку 📚</p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-lg">
            Не вдалося додати. Спробуй ще раз.
          </p>
        )}

        <div className="flex gap-5 justify-end self-end mt-auto">
          <button onClick={onClose}>Скасувати</button>
          <button
            className="rounded-full whitespace-nowrap px-4 py-1 disabled:opacity-50"
            style={{ backgroundImage: gradient }}
            onClick={handleAdd}
            disabled={
              !canSubmit ||
              status === "loading" ||
              status === "success" ||
              status === "duplicate"
            }
          >
            {status === "loading" ? "Додаю…" : "Додати"}
          </button>
        </div>
      </div>
    </div>
  );
}
