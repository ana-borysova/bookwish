import ReactDOM from "react-dom";
import { ButtonSecondary } from "./ButtonSecondary";
import { ButtonPrimary } from "./ButtonPrimary";
import { BookCover } from "./BookCover";
import { bookCoverUrl } from "../lib/coverUrl";
import type { Book } from "../types/book";

interface ConfirmDialogProps {
  book?: Book;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  book,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onCancel}
    >
      <div
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-8 shadow-xl "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          onClick={onCancel}
        >
          ✕
        </button>

        <div className="py-2 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
          <p className="text-gray-500 text-base">{message}</p>
          <div className="flex justify-center my-4">
            {book && (
              <div className="relative w-36 aspect-2/3 rounded-lg overflow-hidden">
                <BookCover
                  src={bookCoverUrl(book)}
                  title={book.title}
                  isbn={book.isbn}
                  coverSize="w-full h-full"
                />
                <span
                  className="spine"
                  style={{ ["--spine" as string]: "#f59e0b" }}
                />
              </div>
            )}
          </div>
          <div className="flex gap-4 justify-center">
            <ButtonSecondary onClick={onCancel}>{cancelLabel}</ButtonSecondary>
            <ButtonPrimary onClick={onConfirm}>{confirmLabel}</ButtonPrimary>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
