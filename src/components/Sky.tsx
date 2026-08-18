import { bookCoverUrl } from "../lib/coverUrl";
import { getDesirabilityTier } from "../lib/desirability";
import type { WishlistItemWithBook } from "../types/book";
import { SkyBookCard } from "./SkyBookCard";
import { SkyEmptyCard } from "./SkyEmptyCard";

const POSITION = [
  {
    top: "top-3",
    left: "left-25",
    rotate: "-8deg",
    dur: "12s",
    delay: "0s",
  },
  {
    top: "top-8",
    left: "left-90",
    rotate: "5deg",
    dur: "13.5s",
    delay: "1.5s",
  },
  {
    top: "top-88",
    left: "left-120",
    rotate: "-6deg",
    dur: "11.5s",
    delay: "0.7s",
  },
  {
    top: "top-85",
    left: "left-0",
    rotate: "10deg",
    dur: "13s",
    delay: "2.1s",
  },
  {
    top: "top-110",
    left: "left-62",
    rotate: "-3deg",
    dur: "12.5s",
    delay: "1.1s",
  },
];

interface SkyProps {
  books: WishlistItemWithBook[];
}

export function Sky({ books }: SkyProps) {
  return (
    <div className="relative h-184">
      {POSITION.map((pos, i) => {
        const item = books[i];

        return (
          <div
            key={i}
            className={`float-cover absolute ${pos.top} ${pos.left}`}
            style={{
              ["--rot" as string]: pos.rotate,
              ["--dur" as string]: pos.dur,
              ["--delay" as string]: pos.delay,
            }}
          >
            {" "}
            {item ? (
              <SkyBookCard
                title={item.book.title}
                spineColor={getDesirabilityTier(item.desirability).color}
                coverUrl={bookCoverUrl(item.book)}
              />
            ) : (
              <SkyEmptyCard />
            )}
          </div>
        );
      })}
    </div>
  );
}
