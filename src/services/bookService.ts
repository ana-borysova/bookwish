import type { Book } from "../types/book";
import { supabase } from "./supabase";

export function mapRowToBook(row: any): Book {
  return {
    id: row.id,
    googleBooksId: row.google_books_id,
    title: row.title,
    authors: row.authors,
    thumbnail: row.thumbnail,
    year: row.year,
    publisher: row.publisher,
    pageCount: row.page_count,
    isbn: row.isbn,
  };
}

export async function searchBook(query: string): Promise<Book[]> {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .ilike("title", `%${query}%`);

  if (error) {
    throw new Error(error.message);
  }
  return (data ?? []).map(mapRowToBook);
}

export async function getBookByGoogleId(
  googleBooksId: string,
): Promise<Book | null> {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("google_books_id", googleBooksId)
    .maybeSingle();
  if (error) {
    throw new Error(error.message);
  }
  return data ? mapRowToBook(data) : null;
}

export async function addBook(book: Book): Promise<Book> {
  const bookToInsert = {
    title: book.title,
    authors: book.authors,
    thumbnail: book.thumbnail,
    year: book.year,
    publisher: book.publisher,
    page_count: book.pageCount,
    google_books_id: book.id,
  };
  const { data, error } = await supabase
    .from("books")
    .insert(bookToInsert)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return mapRowToBook(data);
}
