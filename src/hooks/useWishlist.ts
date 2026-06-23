import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addBookToWishlist,
  addCustomBookToWishlist,
  cancelReservation,
  getWishlist,
  markAsPurchased,
  markAsReceived,
  removeFromWishlist,
  reserveBook,
} from "../services/wishlistService";
import type { Book, CustomBookItem } from "../types/book";
import { BOOKS_SEARCH_Q_KEY } from "./useBookSearch";

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
    mutationFn: async ({
      book,
      desirability,
      comment,
    }: {
      book: Book;
      desirability?: number;
      comment?: string;
    }) => {
      return addBookToWishlist(book, userId, desirability, comment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [WISHLIST_SEARCH_Q_KEY, userId],
      });
    },
  });
}

export function useAddCustomWishlistItem(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      input,
      desirability,
      comment,
    }: {
      input: CustomBookItem;
      desirability?: number;
      comment?: string;
    }) => {
      return addCustomBookToWishlist(input, userId, desirability, comment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [WISHLIST_SEARCH_Q_KEY, userId],
      });
      queryClient.invalidateQueries({ queryKey: [BOOKS_SEARCH_Q_KEY] });
    },
  });
}

export function useDeleteWishlistItem(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (itemId: string) => {
      return removeFromWishlist(itemId);
    },
    onSettled: () => {
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
    mutationFn: async ({
      itemId,
      reservedBy,
      isAnonymous,
    }: {
      itemId: string;
      reservedBy: string;
      isAnonymous: boolean;
    }) => {
      return markAsPurchased(itemId, reservedBy, isAnonymous);
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

export function useCancelReservation(ownerId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (itemId: string) => {
      return cancelReservation(itemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [WISHLIST_SEARCH_Q_KEY, ownerId],
      });
    },
  });
}
