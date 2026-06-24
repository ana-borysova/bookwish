import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchCoverByIsbn } from "../services/booksApi";

export interface BookCoverProps {
  src?: string;
  title: string;
  isbn?: string;
  coverSize?: string;
}

export function BookCover({ src, title, isbn, coverSize }: BookCoverProps) {
  const [failed, setFailed] = useState(false);
  const [googleFailed, setGoogleFailed] = useState(false);

  const { data: googleSrc } = useQuery({
    queryKey: ["google-cover", isbn],
    queryFn: () => fetchCoverByIsbn(isbn!),
    enabled: failed && !!isbn,
  });

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={title}
        className={`object-cover ${coverSize ?? ""}`}
        onError={() => setFailed(true)}
      />
    );
  }

  if (googleSrc && !googleFailed) {
    return (
      <img
        src={googleSrc}
        alt={title}
        className={`object-cover ${coverSize ?? ""}`}
        onError={() => setGoogleFailed(true)}
      />
    );
  }

  return (
    <div
      className={`text-gray-600 text-xs text-center bg-amber-200 ${coverSize ?? ""}`}
    >
      Немає обкладинки
    </div>
  );
}
