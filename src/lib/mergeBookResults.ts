import type { Book } from "../types/book";

export function mergeBookResults(dbBooks: Book[], googleBooks: Book[]): Book[] {
  const dbGoogleIds = new Set(
    dbBooks
      .map((book) => book.googleBooksId)
      .filter((id): id is string => Boolean(id)),
  );
  return [
    ...dbBooks,
    ...googleBooks.filter(
      (book) => !book.googleBooksId || !dbGoogleIds.has(book.googleBooksId),
    ),
  ];
}
