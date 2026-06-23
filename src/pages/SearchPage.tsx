import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useBookSearch } from "../hooks/useBookSearch";
import { BookCard } from "../components/BookCard";
import {
  useAddCustomWishlistItem,
  useAddWishlistItem,
  useWishlist,
} from "../hooks/useWishlist";
import { useAuthContext } from "../context/AuthContext";
import { CustomBookModal } from "../components/CustomBookModal";

export function SearchPage() {
  const [query, setQuery] = useState("");
  const [isManualOpen, setIsManualOpen] = useState(false);

  const debouncedQuery = useDebounce(query);
  const { user } = useAuthContext();
  const { data, isLoading, isError } = useBookSearch(debouncedQuery);

  const { data: wishlist } = useWishlist(user!.id);
  const addedIds = new Set(
    wishlist?.map((i) => i.book.googleBooksId).filter(Boolean),
  );

  const { mutateAsync } = useAddWishlistItem(user!.id);
  const { mutateAsync: addManual } = useAddCustomWishlistItem(user!.id);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 ">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Пошук книг</h1>
      <div className="flex mb-6 gap-5">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Введіть назву або автора..."
          className="w-full border border-gray-300 rounded-lg py-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={() => setIsManualOpen(true)}
          className="whitespace-nowrap rounded-lg border border-gray-300 px-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          + Додати вручну
        </button>
      </div>

      {isLoading && (
        <p className="text-center text-gray-500">Завантаження...</p>
      )}

      {isError && (
        <p className="text-center text-red-500">Помилка. Спробуй ще раз.</p>
      )}

      {!isLoading && data?.length === 0 && (
        <p className="text-center text-gray-500">Нічого не знайдено 😔</p>
      )}

      <div className="flex flex-col gap-4">
        {data?.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onAdd={(payload) => mutateAsync(payload)}
            alreadyAdded={addedIds.has(book.googleBooksId)}
          />
        ))}
      </div>
      {isManualOpen && (
        <CustomBookModal
          onClose={() => setIsManualOpen(false)}
          onSubmit={(payload) => addManual(payload)}
        />
      )}
    </div>
  );
}
