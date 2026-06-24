import { coverUrl } from "../lib/coverUrl";
import type { Book, GoogleBooksItem, GoogleBooksResponse } from "../types/book";

const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
const BASE_URL = "https://www.googleapis.com/books/v1";

function mapToBook(item: GoogleBooksItem): Book {
  const info = item.volumeInfo;

  return {
    id: item.id,
    googleBooksId: item.id,
    title: info.title,
    authors: info.authors,
    thumbnail: info.imageLinks?.thumbnail.replace("http://", "https://"),
    year: Number(info.publishedDate?.slice(0, 4)),
    publisher: info.publisher ?? "Невідоме видавництво",
    pageCount: info.pageCount,
  };
}

export async function searchBooks(query: string): Promise<Book[]> {
  const url = `${BASE_URL}/volumes?q=${encodeURIComponent(query)}&orderBy=relevance&printType=books&maxResults=20&key=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Помилка запиту до API");
  }

  const data: GoogleBooksResponse = await res.json();
  return (data.items ?? [])
    .filter((item) => item.volumeInfo.authors)
    .filter((item) => item.volumeInfo.imageLinks?.thumbnail)
    .filter((item) => item.volumeInfo.language !== "ru")
    .map(mapToBook);
}

export async function fetchCoverByIsbn(isbn: string): Promise<string | null> {
  const url = `${BASE_URL}/volumes?q=${encodeURIComponent(`isbn:${isbn}`)}&maxResults=1&key=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Помилка запиту до API");
  }

  const data: GoogleBooksResponse = await res.json();
  return coverUrl(data.items?.[0]?.volumeInfo.imageLinks?.thumbnail) ?? null;
}
