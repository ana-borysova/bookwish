// src/components/Navbar.tsx
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useProfile } from "../hooks/useProfiles";

export function Navbar() {
  const { user, signOut } = useAuthContext();
  const { data: profile } = useProfile();

  return (
    <nav className="px-[clamp(40px,5vw,110px)] py-7 flex justify-between items-center">
      <Link
        to="/"
        className="flex items-center gap-3 font-display font-extrabold text-[26px] text-cream"
      >
        📚 BookWish
      </Link>

      <div className="flex items-center gap-8 text-base">
        {user && (
          <span className="text-cream/70">Привіт, {profile?.username}!</span>
        )}
        <Link
          to="/wishlist"
          className="text-gold/80 font-semibold hover:text-gold transition-colors"
        >
          Мій список
        </Link>

        {user && (
          <button
            onClick={signOut}
            className="text-cream/70 hover:text-cream transition-colors"
          >
            Вийти
          </button>
        )}
      </div>
    </nav>
  );
}
