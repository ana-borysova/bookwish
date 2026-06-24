import { useState } from "react";

export interface BookCoverProps {
  src?: string;
  title: string;
  coverSize?: string;
}

export function BookCover({ src, title, coverSize }: BookCoverProps) {
  const [failed, setFailed] = useState(false);

  return src && !failed ? (
    <img
      src={src}
      alt={title}
      className={`object-cover ${coverSize ?? ""}`}
      onError={() => setFailed(true)}
    />
  ) : (
    <div
      className={`text-gray-600 text-xs text-center bg-amber-200 ${coverSize ?? ""}`}
    >
      Немає обкладинки
    </div>
  );
}
