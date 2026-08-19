import { DESIRABILITY_TIERS } from "../lib/desirability";
import { HintBubble } from "./HintBubble";
import { SkyBookCard } from "./SkyBookCard";

const SLIDER_BOOKS = [
  {
    top: "top-3",
    left: "left-25",
    rotate: "-8deg",
    fx: "560px",
    fy: "-40px",
    spin: "35deg",
    delay: "0s",
    title: "Каравал",
    coverUrl:
      "https://books.google.com/books/content?id=OxF4EAAAQBAJ&printsec=frontcover&img=1&zoom=0&source=gbs_api",
    spineColor: DESIRABILITY_TIERS[4].color,
  },
  {
    top: "top-8",
    left: "left-90",
    rotate: "5deg",
    fx: "-560px",
    fy: "-30px",
    spin: "-40deg",
    delay: "0.4s",
    title: "Легенда",
    coverUrl:
      "https://books.google.com/books/content?id=M8k9EQAAQBAJ&printsec=frontcover&img=1&zoom=0&source=gbs_api",
    spineColor: DESIRABILITY_TIERS[3].color,
  },
  {
    top: "top-88",
    left: "left-120",
    rotate: "-6deg",
    fx: "-580px",
    fy: "20px ",
    spin: "-30deg",
    delay: "0.8s",
    title: "Фінал",
    coverUrl:
      "https://books.google.com/books/content?id=hck9EQAAQBAJ&printsec=frontcover&img=1&zoom=0&source=gbs_api",
    spineColor: DESIRABILITY_TIERS[1].color,
  },
  {
    top: "top-85",
    left: "left-0",
    rotate: "10deg",
    fx: "560px",
    fy: "30px",
    spin: "45deg",
    delay: "1.2s",
    title: "Братство Персня",
    coverUrl:
      "https://books.google.com/books/content?id=2AdoEAAAQBAJ&printsec=frontcover&img=1&zoom=0&source=gbs_api",
    spineColor: DESIRABILITY_TIERS[3].color,
  },
  {
    top: "top-110",
    left: "left-62",
    rotate: "-3deg",
    fx: "30px",
    fy: "-440px",
    spin: "20deg",
    delay: "1.6s",
    title: "Дві вежі",
    coverUrl:
      "https://books.google.com/books/content?id=HmhoEAAAQBAJ&printsec=frontcover&img=1&zoom=0&source=gbs_api",
    spineColor: DESIRABILITY_TIERS[1].color,
  },
];

const HINT_BUBBLES = [
  {
    icon: "📚",
    title: "Додай книги-мрії",
    text: "Знайди за назвою чи автором — або додай вручну. Обкладинка підтягнеться сама",
    borderRadius: "42px 34px 44px 30px",
    top: "top-1",
    left: "left-4",
    rotate: "-5deg",
    bar: false,
    delay: "0s",
  },
  {
    icon: "✨",
    title: "Признач бажаність",
    text: `Від "було б непогано" до "🔥 Мрія!" — покажи, чого прагнеш найбільше`,
    borderRadius: "34px 44px 30px 42px",
    top: "top-45",
    left: "left-88",
    rotate: "5deg",
    bar: true,
    delay: "0.18s",
  },
  {
    icon: "🎁",
    title: "Друзі дарують тобі",
    text: "Вони таємно резервують книгу з твого списку — сюрприз лишається сюрпризом",
    borderRadius: "40px 30px 44px 36px",
    top: "top-85",
    left: "left-2",
    rotate: "-4deg",
    bar: false,
    delay: ".36s",
  },
  {
    icon: "💝",
    title: "Даруй друзям",
    text: "Зазирни в список друга, тихо зарезервуй книгу — і розкрий свій намір, лише якщо схочеш",
    borderRadius: "36px 44px 32px 42px",
    top: "top-120",
    left: "left-90",
    rotate: "4deg",
    bar: false,
    delay: "0.54s",
  },
];

export function GuestSlider() {
  return (
    <div className="relative h-184">
      {SLIDER_BOOKS.map((book, i) => {
        return (
          <div
            key={i}
            className={`book-fly absolute ${book.top} ${book.left}`}
            style={{
              ["--rot" as string]: book.rotate,
              ["--fx" as string]: book.fx,
              ["--fy" as string]: book.fy,
              ["--spin" as string]: book.spin,
              ["--delay" as string]: book.delay,
            }}
          >
            <SkyBookCard
              title={book.title}
              spineColor={book.spineColor}
              coverUrl={book.coverUrl}
            />
          </div>
        );
      })}

      {HINT_BUBBLES.map((bubble, i) => {
        return (
          <div
            key={i}
            className={`hint-pop absolute ${bubble.top} ${bubble.left}`}
            style={{
              ["--rot" as string]: bubble.rotate,
              ["--delay" as string]: bubble.delay,
            }}
          >
            <HintBubble
              title={bubble.title}
              icon={bubble.icon}
              text={bubble.text}
              borderRadius={bubble.borderRadius}
              bar={bubble.bar}
            />
          </div>
        );
      })}
    </div>
  );
}
