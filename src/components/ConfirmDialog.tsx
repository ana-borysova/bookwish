import ReactDOM from "react-dom";

interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onCancel}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-8 shadow-xl "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          onClick={onCancel}
        >
          X
        </button>

        <div>
          <h2>{title}</h2>
          <p>{message}</p>
          <div>
            <button onClick={onConfirm}>{confirmLabel}</button>
            <button onClick={onCancel}> Ні, повернутися назад</button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
