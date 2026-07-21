import { Link } from "react-router-dom";

export function GuestNavbar() {
  return (
    <nav className="px-[clamp(3.25rem,5vw,5.5rem)] py-7 flex justify-between items-center">
      <Link
        to="/"
        className="flex items-center gap-3 font-display font-extrabold text-[26px] text-cream"
      >
        📚 BookWish
      </Link>

      <div className="flex items-center gap-8 text-base">
        <Link
          to="/auth"
          className="text-gold/80 font-semibold hover:text-gold transition-colors"
        >
          Зареєструватись
        </Link>
        <Link
          to="/auth?mode=login"
          className="font-semibold hover:text-gold transition-colors"
        >
          Увійти
        </Link>
      </div>
    </nav>
  );
}
