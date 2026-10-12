import React, { useState } from "react";
import { AlertCircle } from "lucide-react";

interface GuidelineTooltipProps {
  reason: string;
  children: React.ReactNode;
}

export const GuidelineTooltip: React.FC<GuidelineTooltipProps> = ({
  reason,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getExplanation = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes("blur")) {
      return "We detected a blurry face. Please ensure the face is in focus.";
    }
    if (lower.includes("far")) {
      return "Face is too far from the camera. Please ensure the face is at an appropriate distance.";
    }
    if (lower.includes("similar") || lower.includes("duplicate")) {
      return "You've already uploaded images similar to this photo. Our AI suggests uploading a diversity of photos with different backgrounds, lighting, and clothing.";
    }
    if (lower.includes("multiple")) {
      return "Multiple people detected. Aragon models require photos with only you in the frame.";
    }
    if (lower.includes("no face")) {
      return "No face detected in photo. Please ensure your face is clearly visible.";
    }
    if (lower.includes("resolution") || lower.includes("size")) {
      return "Resolution too low. Please upload photos that are at least 512x512 pixels.";
    }
    return "This photo does not meet our headshot training guidelines. Please upload a clear portrait.";
  };

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
    >
      <span className="cursor-pointer border-b border-dotted border-neutral-400 text-xs text-neutral-300 hover:text-white transition-colors">
        {children}
      </span>

      {isOpen && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-neutral-900 border border-neutral-800 rounded-md text-white z-50">
          <div className="flex items-center gap-1.5 mb-1.5 text-red-400 font-medium text-xs">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Try again</span>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            {getExplanation(reason)}
          </p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-2 h-2 bg-neutral-900 border-r border-b border-neutral-800 rotate-45" />
        </div>
      )}
    </div>
  );
};
