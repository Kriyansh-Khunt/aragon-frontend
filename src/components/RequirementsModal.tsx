import React, { useEffect } from "react";
import { X, Check, AlertTriangle } from "lucide-react";
import { Button } from "./common/Button.js";

interface RequirementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RequirementsModal: React.FC<RequirementsModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const guidelines = [
    {
      title: "Good Lighting & Focus",
      desc: "Face a soft or natural light source. Ensure facial features are crisp and in sharp focus.",
      isDo: true,
    },
    {
      title: "Portrait Framing",
      desc: "Center your face and upper shoulders in the frame for optimal likeness.",
      isDo: true,
    },
    {
      title: "Diverse Expressions & Angles",
      desc: "Provide varied angles and neutral/smiling expressions to avoid model overfitting.",
      isDo: true,
    },
    {
      title: "Single Person Only",
      desc: "Only one face can be present per photo. Group portraits will be rejected.",
      isDo: false,
    },
    {
      title: "No Blurry or Low-Resolution Images",
      desc: "Images below 512x512 pixels or with low sharpness cannot train the AI model.",
      isDo: false,
    },
    {
      title: "No Duplicate Shots",
      desc: "Multiple identical selfies from the same burst angle will be flagged as duplicates.",
      isDo: false,
    },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white border border-neutral-200 rounded-md overflow-hidden text-neutral-900 cursor-default"
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-100 bg-neutral-50/50">
          <h3 className="text-sm font-semibold text-neutral-900">
            Portrait Guidelines
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-700 rounded-md hover:bg-neutral-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-2.5 max-h-[70vh] overflow-y-auto">
          {guidelines.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-neutral-50/70 border border-neutral-200 rounded-md"
            >
              {item.isDo ? (
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="text-xs font-semibold text-neutral-900">
                  {item.title}
                </h4>
                <p className="text-[11px] text-neutral-500 mt-0.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end px-5 py-3 border-t border-neutral-100 bg-neutral-50/50">
          <Button variant="primary" onClick={onClose}>
            Understood
          </Button>
        </div>
      </div>
    </div>
  );
};
