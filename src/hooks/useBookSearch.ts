import { useQuery } from "@tanstack/react-query";
import { searchBooks } from "../services/booksApi";
import { searchBook } from "../services/bookService";

export const BOOKS_SEARCH_Q_KEY = "books";

export function useBookSearch(searchString: string) {
  return useQuery({
    queryKey: [BOOKS_SEARCH_Q_KEY, searchString],
    queryFn: async () => {
      const dbResults = await searchBook(searchString);
      if (dbResults.length > 0) {
        return dbResults;
      }

      return searchBooks(searchString.trim());
    },
    enabled: searchString.length > 2,
    staleTime: 1000 * 60 * 5,
  });
}
