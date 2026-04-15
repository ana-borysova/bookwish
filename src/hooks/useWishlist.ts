import { useQuery } from "@tanstack/react-query";

import { getWishlist } from "../services/wishlistService";

export const WISHLIST_SEARCH_Q_KEY = "wishlist";

export function useWishlist(userId: string | undefined) {
  return useQuery({
    queryKey: [WISHLIST_SEARCH_Q_KEY, userId],
    queryFn: async () => {
      return getWishlist(userId!);
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}
