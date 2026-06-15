import { Link } from "react-router-dom";

export function GuestBanner() {
  return (
    <div className=" text-lg text-center mb-8">
      <h1>
        Ви переглядаєте список як гість. Увійдіть, щоб бронювати подарунки 🎁
      </h1>
      <div className="flex gap-6 justify-center m-2">
        <Link
          className="text-xl hover:text-yellow-600  hover:border-b-amber-600 transition-colors"
          to="/auth?mode=login"
        >
          Увійти
        </Link>
        <Link
          className="text-xl  hover:text-yellow-600 hover:border-b-amber-600 transition-colors"
          to="/auth?mode=register"
        >
          Зареєструватися
        </Link>
      </div>
    </div>
  );
}
