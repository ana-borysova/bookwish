import { LottieLight } from "lottie-react";

interface BookLoaderProps {
  caption: string;
}

export function BookLoader({ caption }: BookLoaderProps) {
  return (
    <div className="max-w-2xl text-center mx-auto">
      <LottieLight
        className="w-48 h-56 mx-auto"
        src="/reading-book.json"
        loop
        autoplay
        rendererSettings={{
          viewBoxOnly: true,
          viewBoxSize: "131 92 138 163",
        }}
      />

      <p className="text-3xl font-display text-cream/85 mt-7 ">{caption}</p>
    </div>
  );
}
