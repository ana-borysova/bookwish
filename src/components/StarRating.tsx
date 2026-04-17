import { useState } from "react";
import { Star } from "./Star";

interface starRatingProps {
  value?: number;
  onStarChange: (value: number) => void;
}

export default function StarRating({
  value = 0,
  onStarChange,
}: starRatingProps) {
  const [tempRating, setTempRating] = useState(0);

  return (
    <div className="flex gap-4 center ">
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            full={tempRating ? tempRating >= i + 1 : value >= i + 1}
            onRate={() => onStarChange(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
          />
        ))}
      </div>
    </div>
  );
}
