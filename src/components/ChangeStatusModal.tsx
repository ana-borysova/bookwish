import { useState } from "react";
import { WishlistItemStatus, type Book } from "../types/book";
import { useAuthContext } from "../context/AuthContext";
import { BookCover } from "./BookCover";
import { bookCoverUrl } from "../lib/coverUrl";
import { Spine } from "./Spine";
import { Button } from "./ui/Button";
import { Modal } from "./ui/Modal";

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
      className={`flex items-center gap-3 rounded-2xl p-4 border group ${checked ? "bg-gold/10 border-gold/70" : "border-white/15 bg-white/5 hover:bg-white/10"}`}
    >
      <input
        checked={checked}
        className="sr-only"
        name={optionName}
        type="radio"
        onChange={onChange}
      />

      <span
        className={`flex items-center justify-center w-5 h-5 rounded-full border-2 flex-none ${checked ? "border-gold" : "border-white/35"}`}
      >
        <span
          className={`w-2.5 h-2.5 rounded-full ${checked ? "bg-gold" : "group-hover:bg-white/25"}`}
        />
      </span>

      <span>{title}</span>
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
    <Modal onClose={onClose}>
      {isOwner && (
        <div className="text-center">
          <h3 className="font-display text-3xl font-extrabold">
            Вже отримали?
          </h3>
          <p className="text-base text-cream/60">
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
              <Spine color="var(--color-spine-neutral)" />
            </div>
          </div>

          <div className="flex gap-4 mt-6 justify-center">
            <Button variant="ghost" onClick={onClose}>
              Ні, ще чекаю!
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                onReceived(itemId);
                onClose();
              }}
            >
              Так, отримала!
            </Button>
          </div>
        </div>
      )}
      {!isOwner && isAuthenticated && step === 1 && (
        <div className="text-center">
          <h3 className="font-display text-3xl font-extrabold">
            Виконуємо бажання?
          </h3>
          <p className="text-base text-cream/60">
            Повідом усім, що хтось уже подбав саме про цю книгу!{" "}
          </p>

          <div className="flex flex-col gap-3 mt-6">
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
              <Button variant="ghost" onClick={onClose}>
                Скасувати
              </Button>
              <Button
                variant="primary"
                disabled={action === null}
                onClick={() => setStep(2)}
              >
                Продовжити
              </Button>
            </div>
          </div>
        </div>
      )}
      {!isOwner && isAuthenticated && step === 2 && (
        <div className="text-center">
          <h3 className="font-display text-3xl font-extrabold pb-1">
            Хочеш зробити сюрприз?
          </h3>
          <p className="text-base text-cream/60">
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
              <p className="text-sm text-gold bg-gold/10 border border-gold/25 rounded-xl px-4 py-2.5 text-left">
                Власник одразу побачить, хто ти. Якщо передумаєш — може бути
                запізно.
              </p>
            )}
            <div
              className={`flex gap-4 mt-3 ${isReservedFlow ? "justify-end" : "justify-between"}`}
            >
              {!isReservedFlow && (
                <Button variant="ghost" onClick={() => setStep(1)}>
                  ← Назад
                </Button>
              )}
              <Button
                variant="primary"
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
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
