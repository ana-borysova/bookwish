import { useState } from "react";
import { useProfile } from "../hooks/useProfiles";
import type { WishlistItemStatus } from "../types/book";

interface ChangeStatusModalProps {
  status: WishlistItemStatus;
  isAuthenticated: boolean;
  isOwner: boolean;
  isReserver: boolean;
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

type Action = "reserve" | "purchase" | null;

export function ChangeStatusModal({
  isAuthenticated,
  isOwner,
  itemId,
  onReserve,
  onPurchase,
  onClose,
}: ChangeStatusModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [action, setAction] = useState<Action>(null);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const { data: profile } = useProfile();

  return (
    <div>
      {isOwner && (
        <div>
          <h3>Вже отримали?🎁</h3>

          <button>Так, отримала!</button>
          <button>Ні, ще чекаю!</button>
        </div>
      )}
      {!isOwner && isAuthenticated && step === 1 && (
        <div>
          <h3>Виконуємо бажання?🎁</h3>
          <p>Повідом усім, що хто вже подбав саме про цю книгу! </p>
          <div>
            <label>
              <input
                checked={action === "reserve"}
                className="hidden"
                name="purchase_status"
                type="radio"
                onChange={() => setAction("reserve")}
              />
              <div>
                <div>
                  <div></div>
                </div>
                <span>Так, я збираюся купити цю книгу</span>
              </div>
            </label>

            <label>
              <input
                checked={action === "purchase"}
                className="hidden"
                name="purchase_status"
                type="radio"
                onChange={() => setAction("purchase")}
              />
              <div>
                <div>
                  <div></div>
                </div>
                <span>Так, я вже купив цю книгу!</span>
              </div>
            </label>
            <button disabled={action === null} onClick={() => setStep(2)}>
              Далі
            </button>
          </div>
        </div>
      )}
      {!isOwner && isAuthenticated && step === 2 && (
        <div>
          <h3>Хочеш зробити сюрприз?🎁</h3>
          <p>
            Оберии, чи хочеш ти залишитись анонімним, чи повідомиш власнику хто
            ти
          </p>
          <div>
            <label>
              <input
                checked={isAnonymous}
                className="hidden"
                name="purchase_status"
                type="radio"
                onChange={() => setIsAnonymous(true)}
              />
              <div>
                <div>
                  <div></div>
                </div>
                <span>Залишитись анонімним</span>
              </div>
            </label>

            <label>
              <input
                checked={!isAnonymous}
                className="hidden"
                name="purchase_status"
                type="radio"
                onChange={() => setIsAnonymous(false)}
              />
              <div>
                <div>
                  <div></div>
                </div>
                <span>Скажи їй хто я</span>
              </div>
            </label>
            <button
              disabled={action === null}
              onClick={() => {
                if (action === "reserve") {
                  onReserve({
                    itemId: itemId,
                    isAnonymous: isAnonymous,
                    reservedBy: profile
                      ? profile.name + " " + profile.surname
                      : "Імя не вказано",
                  });
                  onClose();
                }
                if (action === "purchase") {
                  onPurchase({ itemId, reservedBy: "", isAnonymous });
                  onClose();
                }
              }}
            >
              Підтвердити
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
