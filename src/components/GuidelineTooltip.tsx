import React, { useState } from "react";
import { AlertCircle } from "lucide-react";

interface GuidelineTooltipProps {
  label: string;
  description: string;
}

export const GuidelineTooltip: React.FC<GuidelineTooltipProps> = ({
  label,
  description,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
    >
      <span className="cursor-pointer border-b border-dotted border-neutral-400 text-[11px] sm:text-xs text-neutral-700 hover:text-neutral-900 transition-colors truncate max-w-37.5 inline-block">
        {label}
      </span>

      {isOpen && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 max-w-[80vw] p-3 bg-neutral-900 border border-neutral-800 rounded-md text-white z-50">
          <div className="flex items-center gap-1.5 mb-1.5 text-red-400 font-medium text-xs">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Quality Notice</span>
          </div>
          <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed">
            {description}
          </p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-2 h-2 bg-neutral-900 border-r border-b border-neutral-800 rotate-45" />
        </div>
      )}
    </div>
  );
};
