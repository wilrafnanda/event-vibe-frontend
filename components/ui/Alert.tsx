import React from "react";

interface AlertProps {
  type: "error" | "success" | "info" | "warning";
  message: string | null | undefined;
  onClose?: () => void;
  className?: string;
}

export default function Alert({
  type,
  message,
  onClose,
  className = "",
}: AlertProps) {
  if (!message) return null;

  const typeStyles = {
    error: {
      container: "bg-red-50 border-red-200 text-red-700",
      icon: (
        <svg
          className="w-5 h-5 text-red-500 shrink-0 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    success: {
      container: "bg-green-50 border-green-200 text-green-700",
      icon: (
        <svg
          className="w-5 h-5 text-green-500 shrink-0 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    warning: {
      container: "bg-amber-50 border-amber-200 text-amber-700",
      icon: (
        <svg
          className="w-5 h-5 text-amber-500 shrink-0 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
    },
    info: {
      container: "bg-blue-50 border-blue-200 text-blue-700",
      icon: (
        <svg
          className="w-5 h-5 text-blue-500 shrink-0 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  };

  const selected = typeStyles[type];

  return (
    <div
      className={`mb-4 p-3.5 border rounded-xl text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in duration-200 ${selected.container} ${className}`}
      role="alert"
    >
      {selected.icon}
      <span className="leading-relaxed font-medium flex-1">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          type="button"
          aria-label="Close"
          className="text-current opacity-60 hover:opacity-100 transition-opacity ml-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
