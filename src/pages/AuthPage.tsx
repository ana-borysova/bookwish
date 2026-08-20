import { useState } from "react";
import { supabase } from "../services/supabase";
import { useSearchParams } from "react-router-dom";
import { GradientText } from "../components/ui/GradientText";
import { PageHeader } from "../components/ui/PageHeader";
import { gradient } from "../lib/desirability";
import clsx from "clsx";
import { Button } from "../components/ui/Button";

const TEXT_REGISTER = {
  eyebrow: "✦ Сузір'я бажань чекає на тебе ✦",
  title: (
    <>
      Створи своє <GradientText>небо мрій</GradientText>
    </>
  ),
  subtitle:
    "Збери книги, про які мрієш, признач кожній яскравість — і дозволь друзям дивувати тебе.",
};

const TEXT_LOGIN = {
  eyebrow: "✦ Сузір'я бажань чекає на тебе ✦",
  title: (
    <>
      З поверненням у своє <GradientText>небо мрій</GradientText>
    </>
  ),
  subtitle: "Увійди — і подивись, чи не зарезервував хтось тобі подарунок.",
};

const AUTH_ERRORS: Record<string, string> = {
  invalid_credentials:
    "Не впізнаємо цю пару email і пароля. Перевір — і спробуй ще раз.",
  user_already_exists: "Цей email уже зареєстрований. Спробуй увійти.",
  weak_password: "Пароль закороткий — потрібно щонайменше 6 символів.",
  email_address_invalid: "Схоже, email написано з помилкою.",
  email_not_confirmed: "Спершу підтверди email — лист уже в скриньці.",
  validation_failed: "Заповни всі поля.",
  over_email_send_rate_limit: "Забагато спроб поспіль. Зачекай хвилинку.",
};

function authErrorMessage(code?: string) {
  return (code && AUTH_ERRORS[code]) || "Щось пішло не так. Спробуй ще раз.";
}

export function AuthPage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(mode === "login");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);

    try {
      if (!isLogin) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { username } },
        });
        if (error) {
          setError(authErrorMessage(error.code));
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setError(authErrorMessage(error.code));
        }
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 ">
      <div className="text-center mb-6">
        <PageHeader
          {...(isLogin ? TEXT_LOGIN : TEXT_REGISTER)}
          size="compact"
        />
      </div>
      <div className="surface-card border border-white/15 rounded-3xl p-8 shadow-panel mb-6">
        <div className="flex rounded-full p-1 mb-6 bg-white/5 border border-white/15">
          <button
            onClick={() => setIsLogin(true)}
            style={isLogin ? { backgroundImage: gradient } : undefined}
            className={clsx(
              "flex-1 rounded-full py-2.5 font-semibold transition",
              isLogin ? "text-white" : "text-cream/65",
            )}
          >
            Увійти
          </button>
          <button
            onClick={() => setIsLogin(false)}
            style={!isLogin ? { backgroundImage: gradient } : undefined}
            className={clsx(
              "flex-1 rounded-full py-2.5 font-semibold transition",
              !isLogin ? "text-white" : "text-cream/65",
            )}
          >
            Зареєструватись
          </button>
        </div>

        <div className="flex flex-col gap-3.5">
          {!isLogin && (
            <input
              type="text"
              placeholder="Ім'я"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="field"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="field"
          />

          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="field"
          />
        </div>

        {error && (
          <p className="mt-3.5 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-left text-rose-200">
            {error}
          </p>
        )}

        <div className="mt-5">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            variant="primary"
            size="basic"
            fullWidth
          >
            {loading
              ? "Завантаження..."
              : isLogin
                ? "Увійти"
                : "Зареєструватись"}
          </Button>
        </div>
      </div>
    </div>
  );
}
