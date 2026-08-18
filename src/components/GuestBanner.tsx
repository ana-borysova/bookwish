import { Link } from "react-router-dom";

export function GuestBanner() {
  return (
    <div
      className="bg-white/5 flex items-center justify-center gap-4 flex-wrap rounded-4xl px-1 py-1 mb-8 text-2xl border
  border-white/15"
    >
      <span>
        Ти переглядаєш це небо як гість. Увійди — і зможеш бронювати подарунки
        🎁
      </span>
      <div className="flex gap-6 m-2 font-semibold text-cream">
        <Link
          className="hover:[text-shadow:0_0_14px_var(--color-gold)]"
          to="/auth?mode=login"
        >
          Увійти
        </Link>
        <Link
          className="text-gold hover:[text-shadow:0_0_14px_var(--color-gold)]"
          to="/auth?mode=register"
        >
          Зареєструватися
        </Link>
      </div>
    </div>
  );
}
