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
      className={`flex flex-col items-center justify-center text-center p-2.5 surface-card ${coverSize ?? ""}`}
    >
      <span className="text-2xl opacity-55 mb-2">📖</span>
      <span className="font-display font-bold text-sm text-white/80 leading-tight">
        {title ? title : "Тут буде обкладинка"}
      </span>
    </div>
  );
}
