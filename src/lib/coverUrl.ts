export function coverUrl(thumbnail?: string): string | undefined {
  if (!thumbnail) {
    return thumbnail;
  }

  return thumbnail
    .replace("http://", "https://")
    .replace("&edge=curl", "")
    .replace("zoom=1", "zoom=0");
}

export function normalizeIsbn(raw: string): string | null {
  const cleaned = raw.replace(/[^0-9Xx]/g, "").toUpperCase();
  if (cleaned.length === 10 || cleaned.length === 13) {
    return cleaned;
  }
  return null;
}

export function isbnCoverUrl(isbn: string): string {
  return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`;
}

export function bookCoverUrl(book: {
  thumbnail?: string;
  isbn?: string;
}): string | undefined {
  if (book.thumbnail) {
    return coverUrl(book.thumbnail);
  }

  if (book.isbn) {
    return isbnCoverUrl(book.isbn);
  }
}
