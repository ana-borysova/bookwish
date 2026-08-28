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
import { WishlistTierFilter } from "../components/WishlistTierFilter";
import { useState } from "react";
import { Button } from "../components/ui/Button";
import { GradientText } from "../components/ui/GradientText";
import { TwinkleStars } from "../components/ui/TwinkleStars";
import { PageHeader } from "../components/ui/PageHeader";

export function WishlistPage() {
  const { user } = useAuthContext();
  const isAuthenticated = !!user;
  const { ownerId } = useParams();
  const isOwner = user?.id === ownerId;
  const { data: books, isLoading, isError } = useWishlist(ownerId!);
  const { data: owner } = useProfile(ownerId);

  const [tiers, setTiers] = useState<number[]>([]);

  const { mutate: deleteItem } = useDeleteWishlistItem(ownerId!);
  const { mutate: reserveItem } = useReserveWishlistItem(ownerId!);

  const { mutate: markPurchased } = useChangeToPurchased(ownerId!);
  const { mutate: markReceived } = useChangeToReceived(ownerId!);
  const { mutate: cancelItem } = useCancelReservation(ownerId!);

  const filtered =
    tiers.length === 0
      ? books
      : books?.filter((b) => tiers.includes(b.desirability));

  const count = filtered?.length ?? 0;

  return (
    <div className="page-x py-8">
      {isLoading && (
        <p className="text-center text-cream/65 py-20">Завантаження...</p>
      )}

      {isError && (
        <p className="text-center text-rose-400">Помилка. Спробуй ще раз.</p>
      )}

      <div className="flex justify-between items-end flex-wrap mb-5">
        <div>
          <PageHeader
            size="medium"
            eyebrow="✦ Вітрина мрій ✦"
            title={
              isOwner ? (
                <>
                  <GradientText>Мій</GradientText> вішліст
                </>
              ) : (
                <>
                  Вішліст{" "}
                  <GradientText>{owner?.username ?? "Користувач"}</GradientText>
                </>
              )
            }
            subtitle={
              <>
                <b className="text-gold">{count}</b> книг · клікни картку, щоб
                перегорнути ↻
              </>
            }
          />
        </div>
        <WishlistTierFilter selected={tiers} onChange={setTiers} />
      </div>
      {!isLoading && !isAuthenticated && <GuestBanner />}
      {!isLoading && books?.length === 0 && (
        <div className="text-center relative pt-20 px-5 pb-36">
          <TwinkleStars />

          <div className="text-[3.5rem] drop-shadow-[0_0_26px_rgba(246,211,140,0.55)]">
            🌙
          </div>
          <h2 className="font-display font-extrabold text-3xl mt-6 text-cream">
            Твоє небо ще темне
          </h2>
          <p className="text-base text-cream/65 mt-3 max-w-md mx-auto leading-relaxed">
            Додай першу книгу і засвіти свою першу зірку. Що сильніше бажання,
            то яскравіше вона сяятиме.
          </p>

          {isOwner && (
            <div className="mt-7">
              <Button to="/search" variant="primary" size="basic">
                🔍 Знайти книгу
              </Button>
            </div>
          )}
        </div>
      )}
      {!isLoading && count > 0 && (
        <div className="grid grid-cols-5 gap-6 pb-16 ">
          {filtered?.map((book) => (
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
      {!isLoading && (books?.length ?? 0) > 0 && count === 0 && (
        <div className="text-center pt-20 px-5 pb-36">
          <p className="leading-relaxed text-xl mt-6 text-cream">
            🌙 На цьому рівні бажаності поки порожньо — вибери інший рівень.
          </p>
        </div>
      )}
    </div>
  );
}
