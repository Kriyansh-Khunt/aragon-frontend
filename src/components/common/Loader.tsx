import React from "react";
import { Loader2 } from "lucide-react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = "md",
  className = "",
}) => {
  let dimension = "w-4 h-4";
  if (size === "sm") {
    dimension = "w-3.5 h-3.5";
  } else if (size === "lg") {
    dimension = "w-6 h-6";
  }

  return (
    <Loader2
      className={`animate-spin text-neutral-600 ${dimension} ${className}`}
      aria-label="Loading"
    />
  );
};
