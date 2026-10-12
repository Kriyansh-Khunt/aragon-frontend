import React from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = "md",
  className = "",
}) => {
  let dimension = "w-5 h-5";
  if (size === "sm") {
    dimension = "w-4 h-4";
  } else if (size === "lg") {
    dimension = "w-7 h-7";
  }

  return (
    <div
      className={`inline-block animate-spin rounded-full border-2 border-neutral-700 border-t-emerald-400 ${dimension} ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
};
