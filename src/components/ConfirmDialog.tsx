import ReactDOM from "react-dom";

interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onCancel}
    >
      <div
        className="relative w-full max-w-xl max-h-[80vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          onClick={onCancel}
        >
          ✕
        </button>

        <div className="p-2 text-center">
          <h2 className="text-xl p-1">{title}</h2>
          <p className="p-1">{message}</p>
          <div className="py-3">
            <button
              className="py-2 px-3 hover:text-yellow-600 hover:border-b-2 hover:border-b-amber-600 transition-colors"
              onClick={onConfirm}
            >
              {confirmLabel}
            </button>
            <button
              className="py-2 px-3 hover:text-yellow-600 hover:border-b-2 hover:border-b-amber-600 transition-colors"
              onClick={onCancel}
            >
              {cancelLabel}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
