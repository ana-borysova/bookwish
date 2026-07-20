import { ButtonCTA } from "../components/ButtonCTA";
import { useAuthContext } from "../context/AuthContext";
import { gradient } from "../lib/desirability";

export function HomePage() {
  const { user } = useAuthContext();

  return (
    <section className="px-[clamp(3.25rem,5vw,5.5rem)]">
      <div className="grid grid-cols-[1.08fr_1fr] gap-4 items-center min-h-[calc(100vh-6rem)]">
        <div>
          <div className="uppercase tracking-[0.24em] text-sm font-semibold text-gold mb-5">
            ✦ Сузір'я твоїх мрій ✦
          </div>
          <h1 className="font-display font-extrabold text-[clamp(3.25rem,5.6vw,5.4rem)] leading-[1.02] tracking-[-0.005em]">
            Кожна мрія - своя{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: gradient }}
            >
              зірка
            </span>{" "}
            на небі
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-cream max-w-2xl">
            Що дужче ти прагнеш книгу, то яскравіше вона світить у твоєму
            нічному небі. Признач кожній рівень бажаності — від «було б
            непогано» до «🔥 Мрія!» — а друзі підуть на світло й таємно
            подарують тобі сюрприз.
          </p>
          <div className="mt-6 flex gap-4 items-center flex-wrap text-sm text-cream/80">
            <span>
              <b className="text-gold font-bold">✦ 6</b> книг у списку
            </span>
            <span className="text-cream/30">·</span>
            <span>
              <b className="text-gold font-bold">🔥 2 </b>мрії
            </span>
            <span className="text-cream/30">·</span>
            <span>
              <b className="text-gold font-bold">🎁 1</b> зарезервовано
            </span>
          </div>
          <div className="flex gap-4 mt-8">
            <ButtonCTA to={`/wishlist/${user?.id}`} variant="primary">
              📚 Мій список
            </ButtonCTA>
            <ButtonCTA to="/search" variant="ghost">
              🔍 Пошук
            </ButtonCTA>
          </div>
          <p className="mt-8 text-sm text-cream/85 max-w-xl">
            🎁 Друзі бачать твоє небо — і можуть таємно зарезервувати
            книгу-подарунок, поки ти й не здогадуєшся.
          </p>
        </div>
        <div>Зображення</div>
      </div>
    </section>
  );
}
