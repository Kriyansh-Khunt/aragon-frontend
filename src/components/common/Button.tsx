import React from "react";
import { Loader } from "./Loader.js";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md";
  isLoading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "secondary",
  size = "md",
  isLoading = false,
  icon,
  children,
  className = "",
  disabled,
  ...props
}) => {
  let variantStyles =
    "bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border border-neutral-200";
  if (variant === "primary") {
    variantStyles =
      "bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-600";
  } else if (variant === "outline") {
    variantStyles =
      "bg-transparent hover:bg-neutral-100 text-neutral-700 border border-neutral-300";
  } else if (variant === "ghost") {
    variantStyles =
      "bg-transparent hover:bg-neutral-100 text-neutral-600 border-transparent";
  }

  let sizeStyles = "px-3 py-1.5 text-xs";
  if (size === "sm") {
    sizeStyles = "px-2.5 py-1 text-xs";
  }

  const isDisabled = disabled || isLoading;

  return (
    <button
      disabled={isDisabled}
      className={`inline-flex items-center justify-center gap-1.5 font-medium rounded-md transition-colors select-none ${variantStyles} ${sizeStyles} ${
        isDisabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
      {...props}
    >
      {isLoading ? <Loader size="sm" /> : icon}
      <span>{children}</span>
    </button>
  );
};
