import React from "react";
import { X, Check, AlertTriangle } from "lucide-react";

interface RequirementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RequirementsModal: React.FC<RequirementsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) {
    return null;
  }

  const guidelines = [
    {
      title: "Good Lighting & Focus",
      desc: "Face a window or soft light source. Ensure photo is crisp and not blurry.",
      isDo: true,
    },
    {
      title: "Chest-Up Framing",
      desc: "Keep your face and shoulders centered and visible in the frame.",
      isDo: true,
    },
    {
      title: "Variety in Expressions",
      desc: "Upload photos taken across different days, lighting, and expressions.",
      isDo: true,
    },
    {
      title: "No Group Photos",
      desc: "Only one face can be present. Group shots will be rejected.",
      isDo: false,
    },
    {
      title: "No Blurry or Low-Res Photos",
      desc: "Photos smaller than 512x512 or out of focus cannot train the AI model.",
      isDo: false,
    },
    {
      title: "No Duplicate Selfies",
      desc: "Multiple identical photos from the same burst angle will be rejected.",
      isDo: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-md overflow-hidden text-neutral-100">
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800">
          <h3 className="text-sm font-semibold text-white">
            Photo Requirements & Guidelines
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white rounded-md hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-3 max-h-[75vh] overflow-y-auto">
          {guidelines.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-neutral-950/60 border border-neutral-800/80 rounded-md"
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  item.isDo
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                }`}
              >
                {item.isDo ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5" />
                )}
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end px-4 py-3 border-t border-neutral-800 bg-neutral-950">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-500 rounded-md transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
