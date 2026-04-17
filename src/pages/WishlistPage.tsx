// import { BookCard } from "../components/BookCard";
// import { useWishlist } from "../hooks/useWishlist";
// const { data: books, isLoading, isError } = useWishlist("4");
import { WishlistItemCard } from "../components/WishlistItemCard";
import { WishlistItemStatus, type WishlistItemWithBook } from "../types/book";

export function WishlistPage() {
  const DUMMY_BOOK_ITEM: WishlistItemWithBook = {
    book: {
      id: "989",
      title: "Some book title",
      thumbnail: "Future book cover",
      authors: ["One author"],
      year: 2026,
      publisher: "BookDream Publish",
    },
    id: "555",
    userId: "666",
    bookId: "777",
    status: WishlistItemStatus.PURCHASED,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 ">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Мій список 📚</h1>
      <div className="flex flex-row gap-4 flex-wrap">
        <WishlistItemCard
          item={DUMMY_BOOK_ITEM}
          onReserve={() => {}}
          onPurchase={() => {}}
          onReceived={() => {}}
          onDelete={() => {}}
          onRatingChange={() => {}}
          onCommentEdit={() => {}}
          isOwner={true}
        />{" "}
        <WishlistItemCard
          item={DUMMY_BOOK_ITEM}
          onReserve={() => {}}
          onPurchase={() => {}}
          onReceived={() => {}}
          onDelete={() => {}}
          onRatingChange={() => {}}
          onCommentEdit={() => {}}
          isOwner={true}
        />
        <WishlistItemCard
          item={DUMMY_BOOK_ITEM}
          onReserve={() => {}}
          onPurchase={() => {}}
          onReceived={() => {}}
          onDelete={() => {}}
          onRatingChange={() => {}}
          onCommentEdit={() => {}}
          isOwner={true}
        />
        <WishlistItemCard
          item={DUMMY_BOOK_ITEM}
          onReserve={() => {}}
          onPurchase={() => {}}
          onReceived={() => {}}
          onDelete={() => {}}
          onRatingChange={() => {}}
          onCommentEdit={() => {}}
          isOwner={true}
        />
      </div>
    </div>
  );
}
{
  /* {isLoading && (
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
      )} */
}
