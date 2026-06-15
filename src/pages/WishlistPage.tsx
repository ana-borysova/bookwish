import {
  useChangeToPurchased,
  useChangeToReceived,
  useDeleteWishlistItem,
  useReserveWishlistItem,
  useWishlist,
} from "../hooks/useWishlist";

import { WishlistItemCard } from "../components/WishlistItemCard";
import { useAuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";

export function WishlistPage() {
  const { user } = useAuthContext();
  const isAuthenticated = !!user;
  const { ownerId } = useParams();
  const isOwner = user?.id === ownerId;
  const { data: books, isLoading, isError } = useWishlist(ownerId!);

  const { mutate: deleteItem } = useDeleteWishlistItem(user!.id);
  const { mutate: reserveItem } = useReserveWishlistItem(ownerId!);

  const { mutate: markPurchased } = useChangeToPurchased(user!.id);
  const { mutate: markReceived } = useChangeToReceived(user!.id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 ">
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
        <div className="flex gap-4 flex-wrap">
          {books?.map((book) => (
            <WishlistItemCard
              key={book.id}
              item={book}
              isOwner={isOwner}
              onReserve={(data) => reserveItem(data)}
              onPurchase={(id) => markPurchased(id)}
              onReceived={(id) => markReceived(id)}
              onDelete={(id) => deleteItem(id)}
              onRatingChange={() => {}}
              onCommentEdit={() => {}}
              isAuthenticated={isAuthenticated}
            />
          ))}
        </div>
      )}
    </div>
  );
}
