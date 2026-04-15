import {
  WishlistItemStatus,
  type Book,
  type WishlistItem,
  type WishlistItemWithBook,
} from "../types/book";
import { supabase } from "./supabase";

export async function getWishlist(
  userId: string,
): Promise<WishlistItemWithBook[]> {
  const { data, error } = await supabase
    .from("wishlist_item")
    .select("*, books(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function addToWishlist(
  book: Book,
  userId: string,
): Promise<WishlistItem> {
  const { data, error } = await supabase
    .from("wishlist_item")
    .insert({
      user_id: userId,
      book_id: book.id,
      status: WishlistItemStatus.AVAILABLE,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
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

export async function markAsPurchased(id: string): Promise<WishlistItem> {
  const { data, error } = await supabase
    .from("wishlist_item")
    .update({ status: WishlistItemStatus.PURCHASED })
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
