import { GuestSlider } from "../components/GuestSlider";
import { Button } from "../components/ui/Button";
import { GradientText } from "../components/ui/GradientText";

export function GuestHomePage() {
  return (
    <section className="px-[clamp(3.25rem,5vw,5.5rem)]">
      <div className="grid grid-cols-[1.08fr_1fr] gap-4 items-center min-h-[calc(100vh-6rem)]">
        <div>
          <div className="uppercase tracking-[0.24em] text-sm font-semibold text-gold mb-5">
            ✦ Вішліст книжок, який здійснюється ✦
          </div>
          <h1 className="font-display font-extrabold text-[clamp(3.25rem,5.6vw,5.4rem)] leading-[1.02] tracking-[-0.005em]">
            <GradientText>Збери книги мрій</GradientText>
            <br />— і дозволь друзям здивувати тебе
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-cream max-w-2xl">
            Признач кожній книзі рівень бажаності — а друзі таємно зарезервують
            подарунок. Створи своє сузір'я мрій і поділись ним із близькими.
          </p>
          <div className="flex gap-4 mt-8">
            <Button to="/auth" variant="primary" size="basic">
              ✨ Створити список
            </Button>

            <Button to="/auth?mode=login" variant="ghost" size="basic">
              Увійти
            </Button>
          </div>
          <p className="mt-8 text-sm text-cream/85 max-w-xl">
            🎁 Надішли друзям посилання на своє зіркове небо — і вони можуть
            таємно зарезервувати книгу-подарунок, яку ти так хочеш!
          </p>
        </div>
        <GuestSlider />
      </div>
    </section>
  );
}
