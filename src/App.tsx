import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { SearchPage } from "./pages/SearchPage";
import { WishlistPage } from "./pages/WishlistPage";
import { AuthPage } from "./pages/AuthPage";
import { useAuthContext } from "./context/AuthContext";
import { HomePage } from "./pages/HomePage";
import { StarField } from "./components/StarField";
import { GuestHomePage } from "./pages/GuestHomePage";
import { GuestNavbar } from "./components/GuestNavbar";

function App() {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span>Завантаження...</span>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <StarField />
      {user ? <Navbar /> : <GuestNavbar />}
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <GuestHomePage />} />
        <Route
          path="/wishlist"
          element={
            user ? (
              <Navigate to={`/wishlist/${user.id}`} />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route path={`/wishlist/:ownerId`} element={<WishlistPage />} />
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/" />}
        />
        <Route
          path="/search"
          element={user ? <SearchPage /> : <Navigate to="/auth" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
