import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useBookSearch } from "../hooks/useBookSearch";
import { BookCard } from "../components/BookCard";
import { useAddWishlistItem } from "../hooks/useWishlist";
import { useAuthContext } from "../context/AuthContext";

export function SearchPage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);
  const { user } = useAuthContext();
  const { data, isLoading, isError } = useBookSearch(debouncedQuery);

  const { mutate } = useAddWishlistItem(user!.id);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Пошук книг</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Введіть назву або автора..."
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

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
            onAdd={(book) => {
              mutate({ book });
            }}
          />
        ))}
      </div>
    </div>
  );
}
