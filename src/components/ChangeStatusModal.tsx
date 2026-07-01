import { useState } from "react";
import { WishlistItemStatus, type Book } from "../types/book";
import { useAuthContext } from "../context/AuthContext";
import { ButtonPrimary } from "./ButtonPrimary";
import { ButtonSecondary } from "./ButtonSecondary";
import { BookCover } from "./BookCover";
import { bookCoverUrl } from "../lib/coverUrl";

interface ChangeStatusModalProps {
  status: WishlistItemStatus;
  book: Book;
  isAuthenticated: boolean;
  isOwner: boolean;
  isAnonymous: boolean;
  itemId: string;
  onReserve: (data: {
    itemId: string;
    reservedBy: string;
    isAnonymous: boolean;
  }) => void;
  onPurchase: (data: {
    itemId: string;
    reservedBy: string;
    isAnonymous: boolean;
  }) => void;
  onReceived: (id: string) => void;
  onClose: () => void;
}

interface RadioOptionProps {
  optionName: string;
  checked: boolean;
  title: string;
  onChange: () => void;
}

type Action = "reserve" | "purchase" | null;

function RadioOption({
  checked,
  optionName,
  title,
  onChange,
}: RadioOptionProps) {
  return (
    <label
      className={`flex items-center gap-3 rounded-xl p-4 border group ${checked ? "bg-amber-50 border-amber-500" : "border-gray-200 hover:bg-gray-100"}`}
    >
      <input
        checked={checked}
        className="sr-only"
        name={optionName}
        type="radio"
        onChange={onChange}
      />

      <span
        className={`flex items-center justify-center w-5 h-5 rounded-full border-2 flex-none ${checked ? "border-amber-500" : "border-gray-300"}`}
      >
        <span
          className={`w-2.5 h-2.5 rounded-full ${checked ? "bg-amber-500" : "group-hover:bg-gray-300"}`}
        />
      </span>

      <span className="text-gray-900">{title}</span>
    </label>
  );
}

export function ChangeStatusModal({
  status,
  book,
  isAuthenticated,
  isOwner,
  itemId,
  isAnonymous: initialIsAnonymous,
  onReserve,
  onPurchase,
  onReceived,
  onClose,
}: ChangeStatusModalProps) {
  const isReservedFlow = status === WishlistItemStatus.RESERVED;

  const [step, setStep] = useState<1 | 2>(isReservedFlow ? 2 : 1);
  const [action, setAction] = useState<Action>(
    isReservedFlow ? "purchase" : null,
  );
  const [isAnonymous, setIsAnonymous] = useState(
    isReservedFlow ? initialIsAnonymous : true,
  );

  const { user } = useAuthContext();
  const userId = user?.id;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-8 shadow-xl "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>

        {isOwner && (
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900">
              Вже отримали?🎁
            </h3>
            <p className="text-gray-500 text-sm">
              Ця книжка вже у твоїй колекції?
            </p>
            <div className="flex justify-center my-7">
              <div className="flicker-cover relative w-36 aspect-2/3 rounded-lg overflow-hidden">
                <BookCover
                  src={bookCoverUrl(book)}
                  title={book.title}
                  isbn={book.isbn}
                  coverSize="w-full h-full"
                />
                <span
                  className="spine"
                  style={{ ["--spine" as string]: "#f59e0b" }}
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6 justify-center">
              <ButtonSecondary onClick={onClose}>Ні, ще чекаю!</ButtonSecondary>
              <ButtonPrimary
                onClick={() => {
                  onReceived(itemId);
                  onClose();
                }}
              >
                Так, отримала!
              </ButtonPrimary>
            </div>
          </div>
        )}
        {!isOwner && isAuthenticated && step === 1 && (
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900">
              Виконуємо бажання?🎁
            </h3>
            <p className="text-gray-500 text-sm">
              Повідом усім, що хтось уже подбав саме про цю книгу!{" "}
            </p>

            <div className="flex flex-col gap-3 mt-5">
              <RadioOption
                checked={action === "reserve"}
                optionName="purchase_status"
                onChange={() => setAction("reserve")}
                title="Так, я збираюся купити цю книгу"
              />

              <RadioOption
                checked={action === "purchase"}
                optionName="purchase_status"
                onChange={() => setAction("purchase")}
                title="Так, я вже купив цю книгу!"
              />
              <div className="flex gap-4 mt-3 justify-end">
                <ButtonSecondary onClick={onClose}>Скасувати</ButtonSecondary>
                <ButtonPrimary
                  disabled={action === null}
                  onClick={() => setStep(2)}
                >
                  Продовжити
                </ButtonPrimary>
              </div>
            </div>
          </div>
        )}
        {!isOwner && isAuthenticated && step === 2 && (
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 pb-1">
              Хочеш зробити сюрприз?🎁
            </h3>
            <p className="text-gray-500 text-sm">
              Обери, чи хочеш ти залишитись анонімним, чи повідомиш власнику хто
              ти
            </p>
            <div className="flex flex-col gap-3 mt-3">
              <RadioOption
                checked={isAnonymous}
                optionName="anonymity"
                onChange={() => setIsAnonymous(true)}
                title="Залишитись анонімним"
              />
              <RadioOption
                checked={!isAnonymous}
                optionName="anonymity"
                onChange={() => setIsAnonymous(false)}
                title="Розповісти, хто я"
              />

              {!isAnonymous && (
                <p className="text-gray-500 text-sm">
                  Власник одразу побачить, хто ти. Якщо передумаєш — може бути
                  запізно.
                </p>
              )}
              <div
                className={`flex gap-4 mt-3 ${isReservedFlow ? "justify-end" : "justify-between"}`}
              >
                {!isReservedFlow && (
                  <ButtonSecondary onClick={() => setStep(1)}>
                    ← Назад
                  </ButtonSecondary>
                )}
                <ButtonPrimary
                  disabled={!userId}
                  onClick={() => {
                    if (!userId) {
                      return;
                    }
                    if (action === "reserve") {
                      onReserve({
                        itemId: itemId,
                        isAnonymous: isAnonymous,
                        reservedBy: userId,
                      });
                      onClose();
                    }

                    if (action === "purchase") {
                      onPurchase({
                        itemId,
                        reservedBy: userId,
                        isAnonymous,
                      });
                      onClose();
                    }
                  }}
                >
                  Підтвердити
                </ButtonPrimary>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
