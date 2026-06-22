import { DEFAULT_DESIRABILITY } from "../lib/desirability";
import { AppErrorCode } from "../lib/errors";
import {
  WishlistItemStatus,
  type Book,
  type WishlistItem,
  type WishlistItemWithBook,
} from "../types/book";
import { addBook, getBookByGoogleId, mapRowToBook } from "./bookService";
import { supabase } from "./supabase";

export function mapRowToWishlistItem(row: any): WishlistItemWithBook {
  return {
    id: row.id,
    userId: row.user_id,
    bookId: row.book_id,
    desirability: row.desirability,
    comment: row.comment,
    reservedBy: row.reserved_by,
    isAnonymous: row.is_anonymous,
    status: row.status,
    book: mapRowToBook(row.books),
  };
}

export async function getWishlist(
  userId: string,
): Promise<WishlistItemWithBook[]> {
  const { data, error } = await supabase
    .from("wishlist_item")
    .select("*, books(*)")
    .eq("user_id", userId)
    .order("desirability", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data.map(mapRowToWishlistItem);
}

export async function addToWishlist(
  book: Book,
  userId: string,
  desirability = DEFAULT_DESIRABILITY,
  comment?: string,
): Promise<WishlistItem> {
  const { data, error } = await supabase
    .from("wishlist_item")
    .insert({
      user_id: userId,
      book_id: book.id,
      desirability: desirability,
      comment: comment ?? null,

      status: WishlistItemStatus.AVAILABLE,
    })
    .select()
    .single();

  if (error?.code === "23505") {
    throw Object.assign(new Error("Wishlist item already exists"), {
      code: AppErrorCode.DUPLICATE_WISHLIST_ITEM,
    });
  }

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function addBookToWishlist(
  book: Book,
  userId: string,
  desirability?: number,
  comment?: string,
) {
  if (!book.googleBooksId) {
    throw new Error("Book must have a googleBooksId");
  }
  let savedBook = await getBookByGoogleId(book.googleBooksId);
  if (savedBook === null) {
    savedBook = await addBook(book);
  }
  await addToWishlist(savedBook, userId, desirability, comment);
}

export async function removeFromWishlist(id: string): Promise<void> {
  const { error } = await supabase.from("wishlist_item").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function reserveBook(
  id: string,
  reservedBy: string,
  isAnonymous: boolean,
): Promise<WishlistItem> {
  const { data, error } = await supabase
    .from("wishlist_item")
    .update({
      reserved_by: reservedBy,
      is_anonymous: isAnonymous,
      status: WishlistItemStatus.RESERVED,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function markAsPurchased(
  id: string,
  reservedBy: string,
  isAnonymous: boolean,
): Promise<WishlistItem> {
  const { data, error } = await supabase
    .from("wishlist_item")
    .update({
      reserved_by: reservedBy,
      is_anonymous: isAnonymous,
      status: WishlistItemStatus.PURCHASED,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  if (!data) {
    throw new Error("Wishlist item not found");
  }
  return data;
}

export async function markAsReceived(id: string): Promise<WishlistItem> {
  const { data, error } = await supabase
    .from("wishlist_item")
    .update({ status: WishlistItemStatus.RECEIVED })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  if (!data) {
    throw new Error("Wishlist item not found");
  }
  return data;
}

export async function cancelReservation(id: string): Promise<WishlistItem> {
  const { data, error } = await supabase
    .from("wishlist_item")
    .update({
      reserved_by: null,
      is_anonymous: null,
      status: WishlistItemStatus.AVAILABLE,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  if (!data) {
    throw new Error("Wishlist item not found");
  }
  return data;
}
