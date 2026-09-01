import { useState } from "react";
import type { CustomBookItem } from "../types/book";
import { isbnCoverUrl, normalizeIsbn } from "../lib/coverUrl";
import { DEFAULT_DESIRABILITY, getDesirabilityTier } from "../lib/desirability";
import { WishlistDesirabilitySlider } from "./WishlistDesirabilitySlider";
import { AppErrorCode } from "../lib/errors";
import { BookCover } from "./BookCover";
import { Spine } from "./Spine";
import { Button } from "./ui/Button";
import { Modal } from "./ui/Modal";

export interface CustomBookModalProps {
  onClose: () => void;
  onSubmit: (payload: {
    input: CustomBookItem;
    desirability: number;
    comment?: string;
  }) => Promise<unknown>;
}

function parseIntField(raw: string, min: number, max: number): number | null {
  const trimmed = raw.trim();
  if (trimmed === "") {
    return null;
  }

  const value = Number(trimmed);
  if (!Number.isInteger(value) || value < min || value > max) {
    return null;
  }

  return value;
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

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "duplicate" | "error"
  >("idle");

  const maxYear = new Date().getFullYear() + 1;

  const normalizedIsbn = normalizeIsbn(isbn);
  const parsedYear = parseIntField(year, 1450, maxYear);
  const parsedPageCount = parseIntField(pageCount, 1, 5000);
  const yearError = year.trim() !== "" && parsedYear === null;
  const pageCountError = pageCount.trim() !== "" && parsedPageCount === null;
  const isbnError = isbn.trim() !== "" && normalizedIsbn === null;

  const canSubmit =
    title.trim() !== "" &&
    author.trim() !== "" &&
    !yearError &&
    !pageCountError &&
    !isbnError;
  const tier = getDesirabilityTier(desirability);

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
          year: parsedYear ?? undefined,
          publisher: publisher.trim() || undefined,
          pageCount: parsedPageCount ?? undefined,
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
    <Modal size="lg" onClose={onClose}>
      <h2 className="font-display text-3xl font-extrabold">Додати книгу</h2>
      <div className="my-2 flex gap-6">
        <div className="w-52 shrink-0 relative rounded-xl overflow-hidden">
          <BookCover
            key={normalizedIsbn ?? "none"}
            src={normalizedIsbn ? isbnCoverUrl(normalizedIsbn) : undefined}
            title={title}
            isbn={normalizedIsbn ?? undefined}
            coverSize="w-full h-full"
          />

          <Spine color={tier.color} />
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          <input
            value={title}
            maxLength={300}
            onChange={(e) => setTitle(e.target.value)}
            className="field"
            placeholder="Назва *"
          />
          <input
            value={author}
            maxLength={400}
            onChange={(e) => setAuthor(e.target.value)}
            className="field"
            placeholder="Автор * (кілька — через кому)"
          />
          <input
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            className="field"
            placeholder="ISBN (необов'язково)"
          />
          {isbnError && (
            <p className="text-rose-300 text-sm">
              ISBN має містити 10 або 13 цифр
            </p>
          )}
          <div className="flex gap-2">
            <input
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="field"
              placeholder="Рік (необов'язково)"
            />
            <input
              value={pageCount}
              onChange={(e) => setPageCount(e.target.value)}
              className="field"
              placeholder="Сторінок (необов'язково)"
            />
          </div>
          {yearError && (
            <p className="text-rose-300 text-sm">
              Рік має бути числом від 1450 до {maxYear}
            </p>
          )}
          {pageCountError && (
            <p className="text-rose-300 text-sm">
              Сторінок має бути від 1 до 5000
            </p>
          )}
          <input
            value={publisher}
            maxLength={200}
            onChange={(e) => setPublisher(e.target.value)}
            className="field"
            placeholder="Видавництво (необов'язково)"
          />
        </div>
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
      {status === "success" && <p className="text-avail text-lg">Додано! 🎉</p>}
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
            !canSubmit ||
            status === "loading" ||
            status === "success" ||
            status === "duplicate"
          }
        >
          {status === "loading" ? "Додаю…" : "Додати"}
        </Button>
      </div>
    </Modal>
  );
}
