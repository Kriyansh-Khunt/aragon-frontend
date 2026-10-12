import React from "react";
import { CheckCircle2 } from "lucide-react";
import { PhotoCard } from "./PhotoCard.js";
import type { UploadedImage } from "../types/index.js";

interface AcceptedSectionProps {
  images: UploadedImage[];
  onDelete: (id: string) => void;
  onCropSave: (id: string, blob: Blob) => void;
}

export const AcceptedSection: React.FC<AcceptedSectionProps> = ({
  images,
  onDelete,
  onCropSave,
}) => {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-neutral-900/60 border border-neutral-800 rounded-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-base font-semibold text-white">
            Accepted Photos ({images.length})
          </h2>
        </div>
        <span className="text-xs text-neutral-400">
          Ready for AI model training
        </span>
      </div>

      <div className="flex flex-wrap gap-4">
        {images.map((img) => (
          <PhotoCard
            key={img.id}
            image={img}
            onDelete={onDelete}
            onCropSave={onCropSave}
          />
        ))}
      </div>
    </div>
  );
};
