export interface Book {
  id: string;
  googleBooksId?: string;
  title: string;
  authors: string[] | undefined;
  //description?: string;
  thumbnail?: string | undefined;
  year?: number;
  publisher?: string;
  pageCount?: number;
}

export interface GoogleBooksItem {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[] | undefined;
    //description?: string;
    imageLinks?: {
      thumbnail: string;
    };
    publishedDate?: string;
    publisher?: string;
    pageCount?: number;
  };
}

export interface GoogleBooksResponse {
  totalItems: number;
  items?: GoogleBooksItem[];
}
export const WishlistItemStatus = {
  AVAILABLE: "available",
  RESERVED: "reserved",
  PURCHASED: "purchased",
  RECEIVED: "received",
} as const;

export type WishlistItemStatus =
  (typeof WishlistItemStatus)[keyof typeof WishlistItemStatus];

export interface WishlistItem {
  id: string;
  userId: string;
  bookId: string;
  desirability?: number;
  comment?: string;
  reservedBy?: string;
  isAnonymous?: boolean;
  status: WishlistItemStatus;
}

export interface WishlistItemWithBook extends WishlistItem {
  book: Book;
}
