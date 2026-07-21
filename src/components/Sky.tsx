import { SkyBookCard } from "./SkyBookCard";

const DUMMY_COVERS = [
  {
    title: "Caraval",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780747532699-L.jpg",
    spineColor: "#e11d48",
    top: "top-3",
    left: "left-25",
    rotate: "-8deg",
    dur: "12s",
    delay: "0s",
  },
  {
    title: "Legendary",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780747532699-L.jpg",
    spineColor: "#f59e0b",
    top: "top-8",
    left: "left-90",
    rotate: "5deg",
    dur: "13.5s",
    delay: "1.5s",
  },
  {
    title: "Finale",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780747532699-L.jpg",
    spineColor: "#e11d48",
    top: "top-88",
    left: "left-120",
    rotate: "-6deg",
    dur: "11.5s",
    delay: "0.7s",
  },
  {
    title: "The Lord of the Rings",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780747532699-L.jpg",
    spineColor: "#f59e0b",
    top: "top-85",
    left: "left-0",
    rotate: "10deg",
    dur: "13s",
    delay: "2.1s",
  },
  {
    title: "Harry Potter",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780747532699-L.jpg",
    spineColor: "#f59e0b",
    top: "top-110",
    left: "left-62",
    rotate: "-3deg",
    dur: "12.5s",
    delay: "1.1s",
  },
];

export function Sky() {
  return (
    <div className="relative h-184">
      {DUMMY_COVERS.map((cover) => {
        return (
          <div
            key={cover.title}
            className={`float-cover absolute ${cover.top} ${cover.left}`}
            style={{
              ["--rot" as string]: cover.rotate,
              ["--dur" as string]: cover.dur,
              ["--delay" as string]: cover.delay,
            }}
          >
            <SkyBookCard
              title={cover.title}
              spineColor={cover.spineColor}
              coverUrl={cover.coverUrl}
            />
          </div>
        );
      })}
    </div>
  );
}
