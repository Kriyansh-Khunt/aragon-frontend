import React from "react";
import { AlertTriangle } from "lucide-react";
import { PhotoCard } from "./PhotoCard.js";
import type { UploadedImage } from "../types/index.js";

interface RejectedSectionProps {
  images: UploadedImage[];
  acceptedCount: number;
  onDelete: (id: string) => void;
  onCropSave: (id: string, blob: Blob) => void;
}

export const RejectedSection: React.FC<RejectedSectionProps> = ({
  images,
  acceptedCount,
  onDelete,
  onCropSave,
}) => {
  if (images.length === 0) {
    return null;
  }

  let subtext = "You need at least 6 good photos to train your headshot AI.";
  if (acceptedCount >= 6) {
    subtext = `You can move to the next step as you've uploaded ${acceptedCount} good photos. Replacing these is optional.`;
  }

  return (
    <div className="w-full bg-neutral-900/60 border border-neutral-800 rounded-md p-6 mb-6">
      <div className="mb-4 pb-3 border-b border-neutral-800">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-5 h-5 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center border border-red-500/20">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-base font-semibold text-white">
            Some Photos Didn't Meet Our Guidelines
          </h2>
        </div>
        <p className="text-xs text-neutral-400 ml-7 leading-relaxed">
          {subtext}
        </p>
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
