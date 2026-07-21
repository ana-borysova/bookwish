import { gradient } from "../lib/desirability";

interface HintBubbleProps {
  icon: string;
  title: string;
  text: string;
  bar?: boolean;
  borderRadius: string;
}

export function HintBubble({
  icon,
  title,
  text,
  bar,
  borderRadius,
}: HintBubbleProps) {
  return (
    <div
      className="max-w-80 px-6 py-5 border border-white/15 backdrop-blur-sm bg-linear-to-br from-white/10 to-white/[0.035]"
      style={{
        ["borderRadius" as string]: borderRadius,
      }}
    >
      <div className="flex items-center gap-4">
        <span
          className="w-14 h-14 rounded-full flex items-center
  justify-center text-2xl border border-white/20"
        >
          {icon}
        </span>
        <h2 className="font-display font-extrabold text-2xl">{title}</h2>
      </div>
      <p className="mt-3 text-cream/80 leading-relaxed">{text}</p>
      {bar && (
        <div
          className="mt-3 h-2 rounded-full"
          style={{
            background: gradient,
          }}
        ></div>
      )}
    </div>
  );
}
