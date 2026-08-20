import ReactDOM from "react-dom";
import { useEffect, type ReactNode } from "react";

interface ModalProps {
  open?: boolean;
  size?: "sm" | "lg";
  onClose: () => void;
  children: ReactNode;
}

const SIZES = {
  sm: "max-w-md",
  lg: "max-w-3xl",
};

export function Modal({
  open = true,
  size = "sm",
  onClose,
  children,
}: ModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  const classes = `${SIZES[size]} relative w-full max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-8 shadow-xl`;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div className={classes} onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>

        {children}
      </div>
    </div>,
    document.body,
  );
}
