import { Sky } from "../components/Sky";
import { Button } from "../components/ui/Button";
import { GradientText } from "../components/ui/GradientText";
import { PageHeader } from "../components/ui/PageHeader";
import { useAuthContext } from "../context/AuthContext";
import { useWishlist } from "../hooks/useWishlist";
import { WishlistItemStatus } from "../types/book";

const HEADER_TEXT = {
  eyebrow: "✦ Сузір'я твоїх мрій ✦",
  title: (
    <>
      Кожна мрія - своя <GradientText>зірка</GradientText> на небі
    </>
  ),
  subtitle:
    "Що дужче ти прагнеш книгу, то яскравіше вона світить у твоєму нічному небі. Признач кожній рівень бажаності — від «було б непогано» до «🔥 Мрія!» — а друзі підуть на світло й таємно подарують тобі сюрприз.",
};

export function HomePage() {
  const { user } = useAuthContext();
  const { data: wishlist } = useWishlist(user!.id);
  const books = wishlist?.slice(0, 5) ?? [];

  const booksInList = wishlist?.length ?? 0;
  const dreamBooksInList =
    wishlist?.filter((item) => item.desirability === 5).length ?? 0;
  const booksReserved =
    wishlist?.filter((item) => item.status === WishlistItemStatus.RESERVED)
      .length ?? 0;

  return (
    <section className="page-x">
      <div className="grid grid-cols-[1.08fr_1fr] gap-4 items-center min-h-[calc(100vh-6rem)]">
        <div>
          <PageHeader
            eyebrow={HEADER_TEXT.eyebrow}
            title={HEADER_TEXT.title}
            subtitle={HEADER_TEXT.subtitle}
          />

          <div className="mt-6 flex gap-4 items-center flex-wrap text-sm text-cream/80">
            <span>
              <b className="text-gold font-bold">✦ {booksInList}</b> книг у
              списку
            </span>
            <span className="text-cream/30">·</span>
            <span>
              <b className="text-gold font-bold">🔥 {dreamBooksInList} </b>мрії
            </span>
            <span className="text-cream/30">·</span>
            <span>
              <b className="text-gold font-bold">🎁 {booksReserved}</b>{" "}
              зарезервовано
            </span>
          </div>
          <div className="flex gap-4 mt-8">
            <Button to={`/wishlist/${user?.id}`} variant="primary" size="basic">
              📚 Мій список
            </Button>

            <Button to="/search" variant="ghost" size="basic">
              🔍 Пошук
            </Button>
          </div>
          <p className="mt-8 text-sm text-cream/85 max-w-xl">
            🎁 Друзі бачать твоє небо — і можуть таємно зарезервувати
            книгу-подарунок, поки ти й не здогадуєшся.
          </p>
        </div>

        <Sky books={books} />
      </div>
    </section>
  );
}
