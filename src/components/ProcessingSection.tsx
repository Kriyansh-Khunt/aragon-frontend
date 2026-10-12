import React from "react";
import { Sparkles } from "lucide-react";
import { PhotoCard } from "./PhotoCard.js";
import { Loader } from "./common/Loader.js";
import type { UploadedImage } from "../types/index.js";

interface ProcessingSectionProps {
  images: UploadedImage[];
  onDelete: (id: string) => void;
  onCropSave: (id: string, blob: Blob) => void;
}

export const ProcessingSection: React.FC<ProcessingSectionProps> = ({
  images,
  onDelete,
  onCropSave,
}) => {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-white border border-neutral-200 rounded-md p-4 sm:p-6 mb-6">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <Loader size="sm" className="text-neutral-900" />
          <h2 className="text-sm font-semibold text-neutral-900">
            Analyzing Photos ({images.length})
          </h2>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
          <Sparkles className="w-3.5 h-3.5 text-neutral-700" />
          <span className="hidden sm:inline">
            Evaluating face framing, blur, and similarity
          </span>
        </div>
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
