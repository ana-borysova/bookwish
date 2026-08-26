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
import { Button } from "../components/ui/Button";
import { PageHeader } from "../components/ui/PageHeader";
import { GradientText } from "../components/ui/GradientText";

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
    <div className="page-x py-8">
      <PageHeader
        size="medium"
        eyebrow="✦ Знайди свою наступну зірку ✦"
        title={
          <>
            <GradientText>Пошук</GradientText> книг
          </>
        }
        subtitle="Напиши назву чи автора — і додай знахідку до свого нічного неба"
      />

      <div className="flex mb-6 mt-6 gap-5">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Введіть назву або автора..."
          className="field rounded-full h-14 px-6 text-lg flex-1"
        />
        <Button
          onClick={() => setIsManualOpen(true)}
          variant="ghost"
          size="basic"
        >
          + Додати вручну
        </Button>
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
