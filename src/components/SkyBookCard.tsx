import { BookCover } from "./BookCover";
import { Spine } from "./Spine";

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
      <Spine color={spineColor} />

      {!coverUrl && <span className="absolute z-10 font-display">{title}</span>}
    </div>
  );
}
