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
import { GuestBanner } from "../components/GuestBanner";
import { useProfile } from "../hooks/useProfiles";

export function WishlistPage() {
  const { user } = useAuthContext();
  const isAuthenticated = !!user;
  const { ownerId } = useParams();
  const isOwner = user?.id === ownerId;
  const { data: books, isLoading, isError } = useWishlist(ownerId!);
  const { data: owner } = useProfile(ownerId);

  const { mutate: deleteItem } = useDeleteWishlistItem(ownerId!);
  const { mutate: reserveItem } = useReserveWishlistItem(ownerId!);

  const { mutate: markPurchased } = useChangeToPurchased(ownerId!);
  const { mutate: markReceived } = useChangeToReceived(ownerId!);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 ">
      {isLoading && (
        <p className="text-center text-gray-500">Завантаження...</p>
      )}

      {isError && (
        <p className="text-center text-red-500">Помилка. Спробуй ще раз.</p>
      )}
      {!isLoading && !isAuthenticated && <GuestBanner />}

      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {isOwner
          ? "Мій список 📚"
          : `Список: ${owner?.username ?? "Користувач"} 📚`}
      </h1>

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
