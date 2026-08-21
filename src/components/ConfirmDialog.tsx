import { BookCover } from "./BookCover";
import { bookCoverUrl } from "../lib/coverUrl";
import type { Book } from "../types/book";
import { Spine } from "./Spine";
import { Button } from "./ui/Button";
import { Modal } from "./ui/Modal";

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
  return (
    <Modal onClose={onCancel}>
      <div className="py-2 text-center">
        <h2 className="font-display text-3xl font-extrabold pb-2">{title}</h2>
        <p className="text-sm text-cream/60">{message}</p>
        <div className="flex justify-center my-4">
          {book && (
            <div className="relative w-36 aspect-2/3 rounded-lg overflow-hidden">
              <BookCover
                src={bookCoverUrl(book)}
                title={book.title}
                isbn={book.isbn}
                coverSize="w-full h-full"
              />
              <Spine color="var(--color-spine-neutral)" />
            </div>
          )}
        </div>
        <div className="flex gap-4 justify-center">
          <Button variant="ghost" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
