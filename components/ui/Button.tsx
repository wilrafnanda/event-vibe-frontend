import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export default function Button({
  children,
  isLoading = false,
  loadingText,
  disabled = false,
  variant = "primary",
  size = "md",
  fullWidth = true,
  icon,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const isButtonDisabled = disabled || isLoading;

  const baseStyles =
    "rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2 select-none";

  const sizeStyles = {
    sm: "py-2 px-3 text-xs",
    md: "py-2.5 sm:py-3 px-4 text-xs sm:text-sm",
    lg: "py-3 sm:py-4 px-6 text-sm sm:text-base",
  };

  const variantStyles = {
    primary:
      "bg-primary hover:bg-[#a333ff] text-paper shadow-lg shadow-primary/20",
    secondary: "bg-ink hover:bg-neutral-800 text-paper shadow-md",
    outline:
      "border-2 border-primary text-primary hover:bg-primary hover:text-paper",
    ghost: "bg-transparent hover:bg-ghost text-ink",
  };

  const interactiveStyles = isButtonDisabled
    ? "opacity-70 cursor-not-allowed transform-none shadow-none pointer-events-none"
    : "cursor-pointer transform hover:scale-[1.01] active:scale-95";

  const widthStyle = fullWidth ? "w-full" : "w-auto";

  return (
    <button
      type={type}
      disabled={isButtonDisabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${interactiveStyles} ${widthStyle} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <span>{loadingText || "Please wait..."}</span>
        </>
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
