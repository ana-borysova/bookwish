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
import { SearchState } from "../components/ui/SearchState";
import { BookLoader } from "../components/ui/BookLoader";

export function SearchPage() {
  const [query, setQuery] = useState("");
  const [isManualOpen, setIsManualOpen] = useState(false);

  const debouncedQuery = useDebounce(query);
  const { user } = useAuthContext();
  const { data, isLoading, isError, refetch } = useBookSearch(debouncedQuery);

  const { data: wishlist } = useWishlist(user!.id);
  const addedIds = new Set(
    wishlist?.map((i) => i.book.googleBooksId).filter(Boolean),
  );

  const { mutateAsync } = useAddWishlistItem(user!.id);
  const { mutateAsync: addManual } = useAddCustomWishlistItem(user!.id);

  const isIdle = debouncedQuery.trim().length < 3;

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

      {isIdle && (
        <SearchState
          icon="🔭"
          title="Небо чекає на пошук"
          description="Почни писати назву або ім'я автора — і знайди книгу, яка засвітиться у твоєму списку мрій."
        />
      )}

      {isLoading && <BookLoader caption="Гортаємо сторінки..." />}

      {isError && (
        <SearchState
          icon="☁️"
          title="Щось пішло не так"
          description="Не вдалося дотягнутися до каталогу. Перевір з'єднання і спробуй ще раз"
        >
          <Button
            variant="primary"
            size="basic"
            onClick={() => {
              refetch();
            }}
          >
            ↻ Спробувати ще раз
          </Button>
        </SearchState>
      )}

      {!isLoading && data?.length === 0 && (
        <SearchState
          icon="🌙"
          title="Нічого не знайшлося"
          description="Спробуй інакше написати назву чи автора — або додай книгу вручну, якщо її ще нема в жодному каталозі"
        >
          <Button
            variant="ghost"
            size="basic"
            onClick={() => {
              setIsManualOpen(true);
            }}
          >
            + Додати вручну
          </Button>
        </SearchState>
      )}

      {!isLoading && !!data?.length && (
        <p className="text-base text-cream/60 mt-5 mb-4">
          Знайдено <b className="text-gold">{data.length}</b> книг
        </p>
      )}

      <div className="flex flex-col gap-4 pb-16">
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
