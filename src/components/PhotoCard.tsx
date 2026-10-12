import React, { useState } from "react";
import { Trash2, Crop, CheckCircle, Loader2 } from "lucide-react";
import { GuidelineTooltip } from "./GuidelineTooltip.js";
import { CropModal } from "./CropModal.js";
import type { UploadedImage } from "../types/index.js";

interface PhotoCardProps {
  image: UploadedImage;
  onDelete: (id: string) => void;
  onCropSave: (id: string, blob: Blob) => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  image,
  onDelete,
  onCropSave,
}) => {
  const [isCropOpen, setIsCropOpen] = useState(false);
  const primaryReason = image.rejectionReasons[0] || "Did not meet guidelines";
  const displaySrc = image.localPreviewUrl || image.storageUrl;
  const isFar = primaryReason.toLowerCase().includes("far");

  return (
    <>
      <div className="flex flex-col items-center group w-44">
        <div className="relative w-44 h-52 bg-neutral-900 border border-neutral-800 rounded-md overflow-hidden flex items-center justify-center">
          {displaySrc ? (
            <img
              src={displaySrc}
              alt={image.originalName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-neutral-500 text-xs">
              <Loader2 className="w-6 h-6 animate-spin text-neutral-400 mb-2" />
              <span>Loading...</span>
            </div>
          )}

          <button
            onClick={() => onDelete(image.id)}
            className="absolute top-2 right-2 w-7 h-7 bg-white/90 hover:bg-white text-neutral-800 rounded-full flex items-center justify-center transition-colors border border-neutral-300"
            title="Delete photo"
          >
            <Trash2 className="w-3.5 h-3.5 text-neutral-800" />
          </button>

          {image.status === "REJECTED" && isFar && (
            <div className="absolute bottom-2 left-2 right-2 flex justify-center">
              <button
                onClick={() => setIsCropOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-white/95 hover:bg-white text-neutral-900 text-xs font-medium rounded-md border border-neutral-300 transition-colors"
              >
                <Crop className="w-3.5 h-3.5" />
                <span>Crop</span>
              </button>
            </div>
          )}

          {image.status === "PROCESSING" && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-1.5 text-white text-xs">
              <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
              <span>Analyzing...</span>
            </div>
          )}
        </div>

        <div className="mt-2 text-center h-7 flex items-center justify-center">
          {image.status === "ACCEPTED" && (
            <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Approved</span>
            </div>
          )}

          {image.status === "REJECTED" && (
            <GuidelineTooltip reason={primaryReason}>
              {primaryReason}
            </GuidelineTooltip>
          )}

          {image.status === "PROCESSING" && (
            <span className="text-xs text-neutral-500">Checking...</span>
          )}
        </div>
      </div>

      <CropModal
        isOpen={isCropOpen}
        imageUrl={displaySrc}
        onClose={() => setIsCropOpen(false)}
        onSave={(blob) => onCropSave(image.id, blob)}
      />
    </>
  );
};
