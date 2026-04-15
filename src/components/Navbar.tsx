// src/components/Navbar.tsx
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useProfile } from "../hooks/useProfiles";

export function Navbar() {
  const { user, signOut } = useAuthContext();
  const { data: profile } = useProfile();

  return (
    <nav className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-gray-900">
        📚 BookWish
      </Link>

      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm text-gray-600">
            Привіт, {profile?.username}!
          </span>
        )}
        <Link
          to="/wishlist"
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          Мій список
        </Link>

        {user && (
          <button
            onClick={signOut}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            Вийти
          </button>
        )}
      </div>
    </nav>
  );
}
