import { useState } from "react";
import { useProfile } from "../hooks/useProfiles";
import { WishlistItemStatus } from "../types/book";

interface ChangeStatusModalProps {
  status: WishlistItemStatus;
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

type Action = "reserve" | "purchase" | null;

export function ChangeStatusModal({
  status,
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

  const { data: profile } = useProfile();
  const username = profile?.username;

  return (
    <div>
      {isOwner && (
        <div>
          <h3>Вже отримали?🎁</h3>

          <button
            onClick={() => {
              onReceived(itemId);
              onClose();
            }}
          >
            Так, отримала!
          </button>
          <button onClick={onClose}>Ні, ще чекаю!</button>
        </div>
      )}
      {!isOwner && isAuthenticated && step === 1 && (
        <div>
          <h3>Виконуємо бажання?🎁</h3>
          <p>Повідом усім, що хтось уже подбав саме про цю книгу! </p>
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
            Обери, чи хочеш ти залишитись анонімним, чи повідомиш власнику хто
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

            {!isAnonymous && (
              <p>
                Власник одразу побачить, хто ти. Якщо передумаєш — може бути
                запізно.
              </p>
            )}
            <button
              disabled={!username}
              onClick={() => {
                if (action === "reserve") {
                  onReserve({
                    itemId: itemId,
                    isAnonymous: isAnonymous,
                    reservedBy: username ?? "Таємний виконувач бажань",
                  });
                  onClose();
                }
                if (action === "purchase") {
                  onPurchase({
                    itemId,
                    reservedBy: username ?? "Таємний виконувач бажань",
                    isAnonymous,
                  });
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
