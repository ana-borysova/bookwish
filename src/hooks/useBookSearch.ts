import { useQuery } from "@tanstack/react-query";
import { searchBooks } from "../services/booksApi";
import { searchBook } from "../services/bookService";
import { mergeBookResults } from "../lib/mergeBookResults";

export const BOOKS_SEARCH_Q_KEY = "books";

export function useBookSearch(searchString: string) {
  return useQuery({
    queryKey: [BOOKS_SEARCH_Q_KEY, searchString],
    queryFn: async () => {
      const query = searchString.trim();
      const [dbResult, googleResult] = await Promise.allSettled([
        searchBook(query),
        searchBooks(query),
      ]);

      if (
        dbResult.status === "rejected" &&
        googleResult.status === "rejected"
      ) {
        throw new Error("Не вдалося виконати пошук");
      }

      const dbBooks = dbResult.status === "fulfilled" ? dbResult.value : [];
      const googleBooks =
        googleResult.status === "fulfilled" ? googleResult.value : [];

      return mergeBookResults(dbBooks, googleBooks);
    },
    enabled: searchString.length > 2,
    staleTime: 1000 * 60 * 5,
  });
}
