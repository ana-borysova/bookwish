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

  const classes = `${SIZES[size]} surface-card border border-white/15 shadow-panel relative w-full max-h-[90vh] overflow-y-auto rounded-3xl p-8`;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-night/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div className={classes} onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute right-4 top-4 h-9 w-9 rounded-full bg-white/5 text-cream/55 transition hover:bg-white/15 hover:text-cream"
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
