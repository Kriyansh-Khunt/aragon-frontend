import React from "react";
import { CheckCircle2 } from "lucide-react";
import { PhotoCard } from "./PhotoCard.js";
import { EmptyState } from "./common/EmptyState.js";
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
    return (
      <EmptyState
        icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
        title="No approved portraits yet"
        description="Select individual or batch portraits on the left. Passed images will appear here."
        className="mb-6"
      />
    );
  }

  return (
    <div className="w-full bg-white border border-neutral-200 rounded-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <h2 className="text-sm font-semibold text-neutral-900">
            Approved Photos ({images.length})
          </h2>
        </div>
        <span className="text-xs text-neutral-500">
          Verified for model generation
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
