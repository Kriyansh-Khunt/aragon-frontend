import React from "react";
import { AlertCircle } from "lucide-react";
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

  let notice = `You currently have ${acceptedCount} approved photo. At least 6 are recommended for optimal model likeness.`;
  if (acceptedCount >= 6) {
    notice = `You have reached the recommended ${acceptedCount} approved photos. Replacing flagged photos is optional.`;
  }

  return (
    <div className="w-full bg-white border border-neutral-200 rounded-md p-4 sm:p-6 mb-6">
      <div className="mb-4 pb-3 border-b border-neutral-100">
        <div className="flex items-center gap-2 mb-1">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <h2 className="text-sm font-semibold text-neutral-900">
            Photos Requiring Attention ({images.length})
          </h2>
        </div>
        <p className="text-xs text-neutral-500 ml-6 leading-relaxed">
          {notice}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
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
