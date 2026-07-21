import { SkyBookCard } from "./SkyBookCard";

const DUMMY_COVERS = [
  {
    title: "Caraval",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780747532699-L.jpg",
    spineColor: "#e11d48",
    top: "top-3",
    left: "left-25",
    rotate: "-8deg",
  },
  {
    title: "Legendary",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780747532699-L.jpg",
    spineColor: "#e11d48",
    top: "top-8",
    left: "left-90",
    rotate: "5deg",
  },
  {
    title: "Finale",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780747532699-L.jpg",
    spineColor: "#e11d48",
    top: "top-85",
    left: "left-120",
    rotate: "-6deg",
  },
  {
    title: "The Lord of the Rings",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780747532699-L.jpg",
    spineColor: "#e11d48",
    top: "top-85",
    left: "left-0",
    rotate: "10deg",
  },
  {
    title: "Harry Potter",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780747532699-L.jpg",
    spineColor: "#e11d48",
    top: "top-110",
    left: "left-62",
    rotate: "-3deg",
  },
];

export function Sky() {
  return (
    <div className="relative h-184">
      {DUMMY_COVERS.map((cover) => {
        return (
          <div
            key={cover.title}
            className={`absolute ${cover.top} ${cover.left}`}
            style={{ transform: `rotate(${cover.rotate})` }}
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
