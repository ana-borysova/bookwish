import type { Book } from "../types/book";
import { supabase } from "./supabase";

export async function searchBook(query: string): Promise<Book[]> {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .ilike("title", `%${query}%`);

  if (error) {
    throw new Error(error.message);
  }
  return data ?? [];
}

export async function addBook(book: Book): Promise<Book> {
  const { id, ...rest } = book;
  const bookToInsert = { ...rest, googleBooksId: id };
  const { data, error } = await supabase
    .from("books")
    .insert(bookToInsert)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}
