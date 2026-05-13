import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addBookToWishlist,
  getWishlist,
  markAsPurchased,
  markAsReceived,
  removeFromWishlist,
  reserveBook,
} from "../services/wishlistService";
import type { Book } from "../types/book";

export const WISHLIST_SEARCH_Q_KEY = "wishlist";

export function useWishlist(userId: string) {
  return useQuery({
    queryKey: [WISHLIST_SEARCH_Q_KEY, userId],
    queryFn: async () => {
      return getWishlist(userId!);
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}

export function useAddWishlistItem(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (book: Book) => {
      return addBookToWishlist(book, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [WISHLIST_SEARCH_Q_KEY, userId],
      });
    },
  });
}

export function useDeleteWishlistItem(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (itemId: string) => {
      return removeFromWishlist(itemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [WISHLIST_SEARCH_Q_KEY, userId],
      });
    },
  });
}

export function useReserveWishlistItem(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      itemId,
      reservedBy,
      isAnonymous,
    }: {
      itemId: string;
      reservedBy: string;
      isAnonymous: boolean;
    }) => {
      return reserveBook(itemId, reservedBy, isAnonymous);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [WISHLIST_SEARCH_Q_KEY, userId],
      });
    },
  });
}

export function useChangeToPurchased(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (itemId: string) => {
      return markAsPurchased(itemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [WISHLIST_SEARCH_Q_KEY, userId],
      });
    },
  });
}
export function useChangeToReceived(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (itemId: string) => {
      return markAsReceived(itemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [WISHLIST_SEARCH_Q_KEY, userId],
      });
    },
  });
}
