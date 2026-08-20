import { GuestSlider } from "../components/GuestSlider";
import { Button } from "../components/ui/Button";
import { GradientText } from "../components/ui/GradientText";
import { PageHeader } from "../components/ui/PageHeader";

const GUEST_HEADER_TEXT = {
  eyebrow: "✦ Вішліст книжок, який здійснюється ✦",
  title: (
    <>
      <GradientText>Збери книги мрій</GradientText>
      <br />— і дозволь друзям здивувати тебе
    </>
  ),
  subtitle:
    "Признач кожній книзі рівень бажаності — а друзі таємно зарезервують подарунок. Створи своє сузір'я мрій і поділись ним із близькими.",
};

export function GuestHomePage() {
  return (
    <section className="page-x">
      <div className="grid grid-cols-[1.08fr_1fr] gap-4 items-center min-h-[calc(100vh-6rem)]">
        <div>
          <PageHeader
            eyebrow={GUEST_HEADER_TEXT.eyebrow}
            title={GUEST_HEADER_TEXT.title}
            subtitle={GUEST_HEADER_TEXT.subtitle}
          />

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
