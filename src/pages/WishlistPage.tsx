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
import { ButtonCTA } from "../components/ButtonCTA";
import { WishlistTierFilter } from "../components/WishlistTierFilter";
import { useState } from "react";

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
    <div className="px-[clamp(2.5rem,5vw,6.5rem)] py-8">
      {isLoading && (
        <p className="text-center text-gray-500">Завантаження...</p>
      )}

      {isError && (
        <p className="text-center text-red-500">Помилка. Спробуй ще раз.</p>
      )}
      {!isLoading && !isAuthenticated && <GuestBanner />}
      <div className="flex justify-between items-end flex-wrap">
        <div className="mb-5">
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
        <WishlistTierFilter selected={tiers} onChange={setTiers} />
      </div>

      {!isLoading && books?.length === 0 ? (
        <div className="text-center relative pt-20 px-5 pb-36">
          <span
            className="twinkle-star"
            style={{ left: "38%", top: "58px", fontSize: "13px" }}
          >
            ✦
          </span>
          <span
            className="twinkle-star"
            style={{
              left: "45%",
              top: "26px",
              fontSize: "11px",
              animationDelay: "0.6s",
            }}
          >
            ✧
          </span>
          <span
            className="twinkle-star"
            style={{
              left: "57%",
              top: "44px",
              fontSize: "15px",
              animationDelay: "1.1s",
            }}
          >
            ✦
          </span>

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
              <ButtonCTA to="/search" variant="primary">
                🔍 Знайти книгу
              </ButtonCTA>
            </div>
          )}
        </div>
      ) : (
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
    </div>
  );
}
