import { useState } from "react";
import type { Book } from "../types/book";
import { AddToWishlistModal } from "./AddToWishlistModal";
import { bookCoverUrl } from "../lib/coverUrl";
import { BookCover } from "./BookCover";

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

  return (
    <div className="flex gap-4 rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      <BookCover
        src={bookCoverUrl(book)}
        title={book.title}
        coverSize="w-24 h-36 rounded"
      />

      <div className="flex flex-col gap-1 flex-1">
        <h3 className="font-semibold text-gray-900 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-gray-500">{book.authors?.join(", ")}</p>
        {book.year && <p className="text-xs text-gray-400">{book.year}</p>}
        {book.publisher && (
          <p className="text-xs text-gray-400">{book.publisher}</p>
        )}
        {book.pageCount && (
          <p className="text-xs text-gray-400">{book.pageCount} стор.</p>
        )}

        {alreadyAdded ? (
          <button
            disabled={true}
            className={`mt-auto self-start text-sm px-4 py-1.5 rounded-full transition-colors ${" bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          >
            Вже у списку
          </button>
        ) : (
          <button
            onClick={() => setOpen(true)}
            className={`mt-auto self-start text-sm px-4 py-1.5 rounded-full transition-colors ${"bg-blue-100 text-blue-600 hover:bg-blue-200"}`}
          >
            До списку
          </button>
        )}

        {open && (
          <AddToWishlistModal
            book={book}
            onClose={() => setOpen(false)}
            onSubmit={onAdd}
          />
        )}
      </div>
    </div>
  );
}
