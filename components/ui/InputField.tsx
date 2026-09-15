import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string | React.ReactNode;
  error?: string;
  rightAction?: React.ReactNode;
  containerClassName?: string;
}

export default function InputField({
  label,
  icon,
  error,
  rightAction,
  containerClassName = "",
  className = "",
  disabled = false,
  id,
  name,
  ...props
}: InputFieldProps) {
  const inputId = id || name;

  return (
    <div className={`space-y-1.5 ${containerClassName}`}>
      {(label || rightAction) && (
        <div className="flex items-center justify-between">
          {label && (
            <label
              htmlFor={inputId}
              className="block text-[11px] font-bold uppercase tracking-widest text-muted"
            >
              {label}
            </label>
          )}
          {rightAction}
        </div>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted text-xs sm:text-sm flex items-center pointer-events-none">
            {typeof icon === "string" ? (
              <i className={icon} aria-hidden="true" />
            ) : (
              icon
            )}
          </div>
        )}

        <input
          id={inputId}
          name={name}
          disabled={disabled}
          className={`w-full bg-ghost border rounded-xl py-2.5 text-xs sm:text-sm outline-none transition-colors text-ink placeholder:text-muted/60 disabled:opacity-60 disabled:cursor-not-allowed ${
            icon ? "pl-10 pr-4" : "px-4"
          } ${
            error
              ? "border-red-500 focus:border-red-500 bg-red-50/20"
              : "border-border focus:border-primary focus:bg-surface"
          } ${className}`}
          {...props}
        />
      </div>

      {error && (
        <p className="text-[11px] text-red-500 pl-1 font-medium animate-in fade-in duration-150">
          {error}
        </p>
      )}
    </div>
  );
}
