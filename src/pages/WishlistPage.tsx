// import { BookCard } from "../components/BookCard";
import { useWishlist } from "../hooks/useWishlist";

export function WishlistPage() {
  const { data: books, isLoading, isError } = useWishlist("4");

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Мій список 📚</h1>

      {isLoading && (
        <p className="text-center text-gray-500">Завантаження...</p>
      )}

      {isError && (
        <p className="text-center text-red-500">Помилка. Спробуй ще раз.</p>
      )}

      {!isLoading && books?.length === 0 ? (
        <p className="text-center text-gray-500">
          Список порожній — знайди щось цікаве! 🔍
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {books?.map((book) => (
            <div>{book.id}</div>
          ))}
        </div>
      )}
    </div>
  );
}
