import { BookCover } from "./BookCover";

interface SkyBookCardProps {
  title: string;
  coverUrl?: string;
  spineColor: string;
}

export function SkyBookCard({ title, coverUrl, spineColor }: SkyBookCardProps) {
  return (
    <div
      className="relative w-50 h-73 rounded-xl overflow-hidden glowpulse-cover"
      style={{
        ["--glow" as string]: spineColor,
      }}
    >
      <BookCover
        title={title}
        src={coverUrl}
        coverSize="absolute inset-0 w-full h-full"
      />
      <span
        className="spine"
        style={{
          ["--spine" as string]: spineColor,
        }}
      />

      {!coverUrl && <span className="absolute z-10 font-display">{title}</span>}
    </div>
  );
}
