import { useState } from "react";
import type { Book } from "../types/book";
import { AddToWishlistModal } from "./AddToWishlistModal";
import { bookCoverUrl } from "../lib/coverUrl";
import { BookCover } from "./BookCover";
import { Button } from "./ui/Button";

interface BookCardProps {
  book: Book;
  alreadyAdded?: boolean;
  onAdd: (payload: {
    book: Book;
    desirability: number;
    comment?: string;
  }) => Promise<unknown>;
}

export function BookCard({ book, onAdd, alreadyAdded }: BookCardProps) {
  const [open, setOpen] = useState(false);

  const meta = [
    book.year,
    book.publisher,
    book.pageCount && `${book.pageCount} стор.`,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="flex gap-5 p-4 rounded-2xl bg-white/5 border border-white/10 shadow-row transition hover:-translate-y-1 hover:border-gold/35">
      <BookCover
        src={bookCoverUrl(book)}
        title={book.title}
        coverSize="w-24 h-36 rounded-lg"
        isbn={book.isbn}
      />

      <div className="flex-1 min-w-0">
        <h3 className="font-display font-bold text-2xl">{book.title}</h3>
        <p className="text-base text-cream/70 mt-1">
          {book.authors?.join(", ")}
        </p>
        {meta && <p className="text-sm text-cream/40 mt-1.5">{meta}</p>}
      </div>
      <div className="flex items-end ml-auto">
        {alreadyAdded ? (
          <Button variant="ghost" size="basic" disabled>
            ✓ Вже у списку
          </Button>
        ) : (
          <Button variant="primary" size="basic" onClick={() => setOpen(true)}>
            + До списку
          </Button>
        )}
      </div>

      {open && (
        <AddToWishlistModal
          book={book}
          onClose={() => setOpen(false)}
          onSubmit={onAdd}
        />
      )}
    </div>
  );
}
