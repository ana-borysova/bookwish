import { useState } from "react";
import { WishlistItemStatus } from "../types/book";
import { useAuthContext } from "../context/AuthContext";

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

  const { user } = useAuthContext();
  const userId = user?.id;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-8 shadow-xl "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          X
        </button>

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
                  //className="hidden"
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
                  //className="hidden"
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
                  //className="hidden"
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
                  //className="hidden"
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
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
