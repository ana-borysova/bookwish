import {
  useCancelReservation,
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
import { gradient } from "../lib/desirability";

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
  const { mutate: cancelItem } = useCancelReservation(ownerId!);

  const count = books?.length ?? 0;

  return (
    <div className="px-[clamp(2.5rem,5vw,6.5rem)] py-8">
      {isLoading && (
        <p className="text-center text-gray-500">Завантаження...</p>
      )}

      {isError && (
        <p className="text-center text-red-500">Помилка. Спробуй ще раз.</p>
      )}
      {!isLoading && !isAuthenticated && <GuestBanner />}

      <div>
        <p className="uppercase text-xs font-semibold mb-3.5 tracking-[0.24em] text-gold">
          ✦ Вітрина мрій ✦
        </p>
        <h1 className="font-display font-extrabold leading-[1.02] text-[clamp(2.625rem,4.6vw,4rem)]">
          {isOwner ? (
            <>
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: gradient }}
              >
                Мій
              </span>{" "}
              вішліст
            </>
          ) : (
            <>
              Вішліст{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: gradient }}
              >
                {owner?.username ?? "Користувач"}
              </span>
            </>
          )}
        </h1>
        <p className="mt-2.5 text-base text-cream/70">
          <b className="text-gold">{count}</b> книг · клікни картку, щоб
          перегорнути ↻
        </p>
      </div>

      {!isLoading && books?.length === 0 ? (
        <p className="text-center text-gray-500">
          Список порожній — знайди щось цікаве! 🔍
        </p>
      ) : (
        <div className="flex gap-9 flex-wrap">
          {books?.map((book) => (
            <WishlistItemCard
              key={book.id}
              item={book}
              isOwner={isOwner}
              onReserve={(data) => reserveItem(data)}
              onPurchase={(data) => markPurchased(data)}
              onReceived={(id) => markReceived(id)}
              onDelete={(id) => deleteItem(id)}
              onCancelReservation={(id) => cancelItem(id)}
              onRatingChange={() => {}}
              onCommentEdit={() => {}}
              isAuthenticated={isAuthenticated}
              currentUserId={user?.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
